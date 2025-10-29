// Application state
let currentMarkdown = '';
let currentFileName = '';
let renderedHtml = '';
let confluenceStorageFormat = '';
let generatedFiles = [];

// DOM elements
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');
const processBtn = document.getElementById('processBtn');
const downloadAllBtn = document.getElementById('downloadAllBtn');
const copyBtn = document.getElementById('copyBtn');
const preview = document.getElementById('preview');
const rawHtmlSection = document.getElementById('rawHtml');
const rawHtmlContent = document.getElementById('rawHtmlContent');
const showRawHtmlCheckbox = document.getElementById('showRawHtml');
const notification = document.getElementById('notification');
const filesList = document.getElementById('filesList');
const filesContent = document.getElementById('filesContent');

// Configure marked
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
});

// Wait for mermaid to be ready
let mermaidReady = false;
globalThis.addEventListener('load', () => {
    setTimeout(() => {
        if (globalThis.mermaid) {
            mermaidReady = true;
            console.log('Mermaid is ready');
        } else {
            console.error('Mermaid failed to load');
        }
    }, 100);
});

// Event listeners
fileInput.addEventListener('change', handleFileSelect);
processBtn.addEventListener('click', processMarkdownAndSaveFiles);
downloadAllBtn.addEventListener('click', downloadAllFiles);
copyBtn.addEventListener('click', copyForConfluence);
showRawHtmlCheckbox.addEventListener('change', toggleRawHtml);

// Handle file selection
async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    currentFileName = file.name.replace(/\.[^/.]+$/, '');
    fileName.textContent = `Selected: ${file.name}`;
    
    try {
        currentMarkdown = await file.text();
        processBtn.disabled = false;
        copyBtn.disabled = true;
        downloadAllBtn.disabled = true;
        generatedFiles = [];
        filesList.style.display = 'none';
        showNotification('File loaded successfully!', 'success');
    } catch (error) {
        showNotification('Error reading file', 'error');
        console.error('File read error:', error);
    }
}

// Main processing function
async function processMarkdownAndSaveFiles() {
    if (!currentMarkdown || !globalThis.mermaid) {
        showNotification('Please wait for the app to fully load', 'error');
        return;
    }

    try {
        preview.innerHTML = '<div class="placeholder"><p>🔄 Processing...</p></div>';
        console.log('Starting processing...');
        
        generatedFiles = [];
        
        // Extract mermaid blocks
        const mermaidBlocks = [];
        const processedMarkdown = extractMermaidBlocks(currentMarkdown, mermaidBlocks);

        console.log(`Found ${mermaidBlocks.length} mermaid diagrams`);

        // Convert mermaid to draw.io XML
        const drawioXmls = [];
        const previewSvgs = [];
        
        for (let i = 0; i < mermaidBlocks.length; i++) {
            const mermaidCode = mermaidBlocks[i];
            
            try {
                console.log(`Converting diagram ${i} to draw.io...`);
                
                // Render SVG for preview
                const diagramId = `mermaid-${i}-${Date.now()}`;
                const { svg } = await globalThis.mermaid.render(diagramId, mermaidCode);
                previewSvgs.push(svg);
                
                // Convert mermaid to draw.io XML
                const drawioXml = await mermaidToDrawio(mermaidCode, i);
                drawioXmls.push(drawioXml);
                
                // Save draw.io XML file
                const xmlBlob = new Blob([drawioXml], { type: 'application/xml' });
                generatedFiles.push({
                    name: `diagram-${i + 1}.drawio`,
                    blob: xmlBlob,
                    type: 'drawio',
                    size: xmlBlob.size
                });
                
                console.log(`✓ Diagram ${i} converted to draw.io`);
            } catch (error) {
                console.error(`Error converting diagram ${i}:`, error);
                drawioXmls.push(null);
                previewSvgs.push(null);
            }
        }

        // Convert markdown to Confluence Storage Format
        confluenceStorageFormat = await markdownToConfluenceStorage(processedMarkdown, drawioXmls);
        
        // Create preview HTML with SVGs
        let previewHtml = marked.parse(processedMarkdown);
        for (let i = 0; i < previewSvgs.length; i++) {
            const placeholder = `<!-- MERMAID_DIAGRAM_${i} -->`;
            if (previewSvgs[i]) {
                previewHtml = previewHtml.replace(placeholder, `<div class="mermaid-container">${previewSvgs[i]}</div>`);
            }
        }
        
        // Apply styles and display preview
        renderedHtml = applyConfluenceStyles(previewHtml);
        preview.innerHTML = renderedHtml;
        rawHtmlContent.textContent = confluenceStorageFormat;
        
        // Save Confluence Storage Format file
        const confluenceBlob = new Blob([confluenceStorageFormat], { type: 'application/xml' });
        generatedFiles.push({
            name: `${currentFileName}-confluence.xml`,
            blob: confluenceBlob,
            type: 'confluence',
            size: confluenceBlob.size
        });
        
        // Display files list
        displayFiles();
        
        // Enable buttons
        copyBtn.disabled = false;
        downloadAllBtn.disabled = false;
        
        showNotification(`✓ Generated ${generatedFiles.length} files!`, 'success');
        console.log('Processing complete!');
    } catch (error) {
        console.error('Processing error:', error);
        preview.innerHTML = `<div class="placeholder" style="color: red;"><p>❌ Error: ${escapeHtml(error.message)}</p></div>`;
        showNotification('Error processing markdown', 'error');
    }
}

// Convert mermaid code to draw.io XML
async function mermaidToDrawio(mermaidCode, index) {
    // Create a basic draw.io XML structure with embedded mermaid
    // Draw.io can render mermaid diagrams natively
    const diagramName = `Diagram ${index + 1}`;
    
    // Encode mermaid code for XML
    const encodedMermaid = escapeXml(mermaidCode);
    
    // Create draw.io XML with mermaid plugin
    const drawioXml = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="md2confluence" version="21.0.0" type="device">
  <diagram name="${diagramName}" id="diagram-${index}">
    <mxGraphModel dx="1434" dy="780" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="mermaid-${index}" value="${encodedMermaid}" style="shape=mxgraph.mermaid;html=1;whiteSpace=wrap;fillColor=#ffffff;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="770" height="600" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

    return drawioXml;
}

// Extract mermaid blocks from markdown
function extractMermaidBlocks(markdown, mermaidBlocks) {
    return markdown.replaceAll(/```mermaid\s*\r?\n([\s\S]*?)```/g, (match, code) => {
        const index = mermaidBlocks.length;
        mermaidBlocks.push(code.trim());
        console.log(`Found mermaid block ${index}`);
        return `\n\n<!-- MERMAID_DIAGRAM_${index} -->\n\n`;
    });
}

// Process diagram placeholders
function processDiagramPlaceholder(line, drawioXmls) {
    const diagramMatch = line.match(/<!-- MERMAID_DIAGRAM_(\d+) -->/);
    if (!diagramMatch) return null;
    
    const diagramIndex = Number.parseInt(diagramMatch[1], 10);
    if (!drawioXmls[diagramIndex]) return '';
    
    return `<ac:structured-macro ac:name="drawio" ac:schema-version="1">
  <ac:parameter ac:name="diagramName">Diagram ${diagramIndex + 1}</ac:parameter>
  <ac:parameter ac:name="simpleViewer">false</ac:parameter>
  <ac:parameter ac:name="width"></ac:parameter>
  <ac:parameter ac:name="diagramWidth">800</ac:parameter>
  <ac:parameter ac:name="revision">1</ac:parameter>
  <ac:plain-text-body><![CDATA[${drawioXmls[diagramIndex]}]]></ac:plain-text-body>
</ac:structured-macro>\n`;
}

// Process code blocks
function processCodeBlock(line, state) {
    if (!line.startsWith('```')) return null;
    
    if (state.inCodeBlock) {
        const result = `<ac:structured-macro ac:name="code" ac:schema-version="1">
  <ac:parameter ac:name="language">${state.codeLanguage || 'text'}</ac:parameter>
  <ac:parameter ac:name="theme">midnight</ac:parameter>
  <ac:parameter ac:name="linenumbers">true</ac:parameter>
  <ac:plain-text-body><![CDATA[${state.codeContent.trim()}]]></ac:plain-text-body>
</ac:structured-macro>\n`;
        state.inCodeBlock = false;
        state.codeContent = '';
        state.codeLanguage = '';
        return result;
    }
    
    state.inCodeBlock = true;
    state.codeLanguage = line.substring(3).trim() || 'text';
    return '';
}

// Process headings
function processHeading(line, state) {
    if (!line.startsWith('#')) return null;
    
    if (state.inList) {
        state.storage += `</${state.listType}>\n`;
        state.inList = false;
    }
    const level = line.match(/^#+/)[0].length;
    const text = line.substring(level).trim();
    return `<h${level}>${convertInlineMarkdown(text)}</h${level}>\n`;
}

// Process lists
function processList(line, state) {
    const unorderedMatch = line.match(/^\s*[-*+]\s/);
    const orderedMatch = line.match(/^\s*\d+\.\s/);
    
    if (unorderedMatch) {
        const text = line.replace(/^\s*[-*+]\s/, '').trim();
        return processListItem(text, 'ul', state);
    }
    
    if (orderedMatch) {
        const text = line.replace(/^\s*\d+\.\s/, '').trim();
        return processListItem(text, 'ol', state);
    }
    
    // Check if we should close the list
    if (state.inList && line.trim() !== '' && !line.match(/^\s*[-*+\d]/)) {
        const result = `</${state.listType}>\n`;
        state.inList = false;
        state.listType = '';
        return result;
    }
    
    return null;
}

// Process list item
function processListItem(text, listType, state) {
    let result = '';
    
    if (!state.inList || state.listType !== listType) {
        if (state.inList) result += `</${state.listType}>\n`;
        result += `<${listType}>\n`;
        state.inList = true;
        state.listType = listType;
    }
    
    result += `<li>${convertInlineMarkdown(text)}</li>\n`;
    return result;
}

// Process tables
function processTable(line, lines, i, state) {
    if (!line.includes('|') || !line.trim().startsWith('|')) return null;
    
    const cells = line.split('|').filter(c => c.trim() !== '');
    
    if (line.includes('---')) return '';
    
    let result = '';
    if (!state.storage.endsWith('<table><tbody>\n') && 
        (!state.storage.includes('<table>') || 
         state.storage.lastIndexOf('</table>') > state.storage.lastIndexOf('<table>'))) {
        result += '<table><tbody>\n';
    }
    
    result += '<tr>\n';
    for (const cell of cells) {
        result += `<td>${convertInlineMarkdown(cell.trim())}</td>\n`;
    }
    result += '</tr>\n';
    
    const nextLine = lines[i + 1];
    if (!nextLine?.includes('|') || !nextLine.trim().startsWith('|')) {
        result += '</tbody></table>\n';
    }
    
    return result;
}

// Process blockquote
function processBlockquote(line) {
    if (!line.startsWith('>')) return null;
    const text = line.substring(1).trim();
    return `<blockquote><p>${convertInlineMarkdown(text)}</p></blockquote>\n`;
}

// Process horizontal rule
function processHorizontalRule(line) {
    if (!line.match(/^[-*_]{3,}$/)) return null;
    return '<hr/>\n';
}

// Process paragraph
function processParagraph(line) {
    if (line.trim() === '') return null;
    return `<p>${convertInlineMarkdown(line)}</p>\n`;
}

// Process a single line in markdown conversion
function processMarkdownLine(line, lines, i, state, drawioXmls) {
    // Check for diagram placeholder
    const diagramResult = processDiagramPlaceholder(line, drawioXmls);
    if (diagramResult !== null) {
        state.storage += diagramResult;
        return;
    }
    
    // Handle code blocks
    const codeResult = processCodeBlock(line, state);
    if (codeResult !== null) {
        state.storage += codeResult;
        return;
    }
    
    if (state.inCodeBlock) {
        state.codeContent += line + '\n';
        return;
    }
    
    // Handle headings
    const headingResult = processHeading(line, state);
    if (headingResult) {
        state.storage += headingResult;
        return;
    }
    
    // Handle lists
    const listResult = processList(line, state);
    if (listResult !== null) {
        state.storage += listResult;
        return;
    }
    
    // Handle blockquotes
    const blockquoteResult = processBlockquote(line);
    if (blockquoteResult) {
        state.storage += blockquoteResult;
        return;
    }
    
    // Handle horizontal rules
    const hrResult = processHorizontalRule(line);
    if (hrResult) {
        state.storage += hrResult;
        return;
    }
    
    // Handle tables
    const tableResult = processTable(line, lines, i, state);
    if (tableResult !== null) {
        state.storage += tableResult;
        return;
    }
    
    // Handle paragraphs
    const paragraphResult = processParagraph(line);
    if (paragraphResult) {
        state.storage += paragraphResult;
    }
}

// Convert markdown to Confluence Storage Format
async function markdownToConfluenceStorage(markdown, drawioXmls) {
    const state = {
        storage: '',
        inCodeBlock: false,
        codeLanguage: '',
        codeContent: '',
        inList: false,
        listType: ''
    };
    
    const lines = markdown.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
        processMarkdownLine(lines[i], lines, i, state, drawioXmls);
    }
    
    // Close any open lists
    if (state.inList) {
        state.storage += `</${state.listType}>\n`;
    }
    
    return state.storage;
}

// Convert inline markdown (bold, italic, code, links)
function convertInlineMarkdown(text) {
    // Escape XML first
    let result = escapeXml(text);
    
    // Bold
    result = result.replaceAll(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    result = result.replaceAll(/__(.+?)__/g, '<strong>$1</strong>');
    
    // Italic  
    result = result.replaceAll(/\*(.+?)\*/g, '<em>$1</em>');
    result = result.replaceAll(/_(.+?)_/g, '<em>$1</em>');
    
    // Inline code
    result = result.replaceAll(/`(.+?)`/g, '<code>$1</code>');
    
    // Links
    result = result.replaceAll(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    
    return result;
}

// Apply Confluence-friendly inline styles
function applyConfluenceStyles(htmlContent) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Style code blocks (pre > code)
    for (const pre of tempDiv.querySelectorAll('pre')) {
        pre.style.backgroundColor = '#1e1e1e';
        pre.style.color = '#d4d4d4';
        pre.style.padding = '16px';
        pre.style.borderRadius = '6px';
        pre.style.border = '2px solid #404040';
        pre.style.overflow = 'auto';
        pre.style.marginBottom = '16px';
        pre.style.fontFamily = "'Consolas', 'Monaco', 'Courier New', monospace";
        pre.style.fontSize = '14px';
        pre.style.lineHeight = '1.5';
        
        const codeElement = pre.querySelector('code');
        if (codeElement) {
            codeElement.style.backgroundColor = 'transparent';
            codeElement.style.color = '#d4d4d4';
            codeElement.style.padding = '0';
        }
    }
    
    // Style inline code (not in pre)
    for (const code of tempDiv.querySelectorAll('code')) {
        if (!code.closest('pre')) {
            code.style.backgroundColor = '#f4f4f4';
            code.style.color = '#e01e5a';
            code.style.padding = '2px 6px';
            code.style.borderRadius = '3px';
            code.style.fontFamily = "'Consolas', 'Monaco', 'Courier New', monospace";
            code.style.fontSize = '90%';
            code.style.border = '1px solid #e0e0e0';
        }
    }
    
    // Style headings
    for (const heading of tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
        heading.style.marginTop = '24px';
        heading.style.marginBottom = '16px';
        heading.style.fontWeight = '600';
        heading.style.color = '#172B4D';
    }
    
    for (const h1 of tempDiv.querySelectorAll('h1')) {
        h1.style.fontSize = '2em';
        h1.style.borderBottom = '2px solid #ddd';
        h1.style.paddingBottom = '8px';
    }
    
    // Style paragraphs
    for (const p of tempDiv.querySelectorAll('p')) {
        p.style.marginBottom = '16px';
        p.style.lineHeight = '1.6';
    }
    
    // Style lists
    for (const list of tempDiv.querySelectorAll('ul, ol')) {
        list.style.marginBottom = '16px';
        list.style.paddingLeft = '30px';
    }
    
    for (const li of tempDiv.querySelectorAll('li')) {
        li.style.marginBottom = '8px';
    }
    
    // Style tables
    for (const table of tempDiv.querySelectorAll('table')) {
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.marginBottom = '20px';
        table.style.border = '1px solid #ddd';
    }
    
    for (const cell of tempDiv.querySelectorAll('th, td')) {
        cell.style.border = '1px solid #ddd';
        cell.style.padding = '12px';
        cell.style.textAlign = 'left';
    }
    
    for (const th of tempDiv.querySelectorAll('th')) {
        th.style.backgroundColor = '#f0f0f0';
        th.style.fontWeight = 'bold';
    }
    
    // Style blockquotes
    for (const bq of tempDiv.querySelectorAll('blockquote')) {
        bq.style.borderLeft = '4px solid #0052CC';
        bq.style.paddingLeft = '16px';
        bq.style.margin = '16px 0';
        bq.style.color = '#666';
        bq.style.fontStyle = 'italic';
    }
    
    return tempDiv.innerHTML;
}

// Get file icon based on type
function getFileIcon(fileType) {
    if (fileType === 'drawio') return '📊';
    if (fileType === 'confluence') return '📄';
    return '📝';
}

// Display files list
function displayFiles() {
    filesContent.innerHTML = '';
    for (const file of generatedFiles) {
        const item = document.createElement('div');
        item.className = 'file-item';
        
        const icon = getFileIcon(file.type);
        const size = (file.size / 1024).toFixed(2);
        
        item.innerHTML = `
            <div class="file-item-info">
                <span>${icon}</span>
                <span class="file-item-name">${file.name}</span>
                <span class="file-item-size">(${size} KB)</span>
            </div>
            <div class="file-item-actions">
                <button class="btn-small" onclick="downloadFile('${file.name}')">💾 Download</button>
            </div>
        `;
        filesContent.appendChild(item);
    }
    filesList.style.display = 'block';
}

// Download individual file
function downloadFile(filename) {
    const file = generatedFiles.find(f => f.name === filename);
    if (!file) return;
    
    const url = URL.createObjectURL(file.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
    showNotification(`✓ Downloaded ${file.name}`, 'success');
}

// Download all files
async function downloadAllFiles() {
    showNotification('Downloading all files...', 'success');
    for (const file of generatedFiles) {
        await new Promise(r => setTimeout(r, 200));
        downloadFile(file.name);
    }
}

// Copy for Confluence
async function copyForConfluence() {
    if (!confluenceStorageFormat) return;
    
    try {
        await navigator.clipboard.writeText(confluenceStorageFormat);
        showNotification('✓ Copied Confluence Storage Format! Paste into Confluence editor.', 'success');
    } catch (error) {
        console.error('Copy error:', error);
        showNotification('❌ Failed to copy. Try downloading the XML file instead.', 'error');
    }
}

// Toggle raw HTML display
function toggleRawHtml() {
    rawHtmlSection.style.display = showRawHtmlCheckbox.checked ? 'block' : 'none';
}

// Show notification
function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    setTimeout(() => notification.classList.remove('show'), 3000);
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeXml(text) {
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');
}

function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

// Initialize
console.log('Markdown to Confluence Converter initialized');