# Technical Context

## Technology Stack

### Core Technologies
- **HTML5**: Modern semantic markup
- **CSS3**: Flexbox, animations, responsive design
- **JavaScript (ES6+)**: Async/await, arrow functions, template literals, destructuring

### External Libraries

#### Marked.js v11.1.1
- **Purpose**: Markdown parsing and rendering
- **CDN**: `https://cdn.jsdelivr.net/npm/marked@11.1.1/marked.min.js`
- **License**: MIT
- **Configuration**:
  ```javascript
  marked.setOptions({
      breaks: true,        // GitHub-style line breaks
      gfm: true,          // GitHub Flavored Markdown
      headerIds: true,    // Generate IDs for headings
      mangle: false       // Don't mangle email addresses
  });
  ```

#### Mermaid.js v10
- **Purpose**: Diagram rendering (preview only)
- **CDN**: `https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs`
- **Module Type**: ESM
- **License**: MIT
- **Configuration**:
  ```javascript
  mermaid.initialize({ 
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose'
  });
  ```
- **Usage**: Only for SVG preview, not for final output

#### DOMPurify v3.0.6
- **Purpose**: HTML sanitization (XSS prevention)
- **CDN**: `https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js`
- **License**: Apache 2.0 / MPL 2.0
- **Usage**: Loaded but not currently in critical path (future-proofing)

## File Structure

```
md2confluence/
├── index.html              # Main application UI
├── app.js                  # Application logic (~600 lines)
├── styles.css              # Styling and layout
├── .gitignore             # Git ignore rules
├── README.md              # Project documentation
├── PROJECT_SUMMARY.md     # Technical overview
├── QUICK_START.md         # User guide
├── VISUAL_GUIDE.md        # Visual walkthrough
├── WHY_PNG.md             # PNG approach rationale (obsolete)
├── example.md             # Sample markdown file
├── test.md                # Test markdown file
└── memory-bank/           # Memory bank documentation
    ├── projectbrief.md
    ├── productContext.md
    ├── systemPatterns.md
    ├── techContext.md
    ├── activeContext.md
    ├── progress.md
    ├── instructions.md
    └── tasks/
        └── _index.md
```

## Browser APIs Used

### FileReader API
- **Purpose**: Read uploaded markdown files
- **Methods**: `readAsText()`
- **Events**: `onload`, `onerror`
- **Browser Support**: All modern browsers

### Blob API
- **Purpose**: Create downloadable files
- **Types Used**: 
  - `application/xml` for .drawio and .xml files
  - `text/html` for HTML output (legacy)
- **Browser Support**: All modern browsers

### URL API
- **Purpose**: Create object URLs for downloads
- **Methods**: `createObjectURL()`, `revokeObjectURL()`
- **Browser Support**: All modern browsers

### Clipboard API
- **Purpose**: Copy Confluence XML to clipboard
- **Methods**: `navigator.clipboard.writeText()`
- **Fallback**: None (shows error notification)
- **Browser Support**: Modern browsers (requires HTTPS or localhost)

## Development Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Git for version control

### Local Development
```powershell
# Clone repository
git clone https://github.com/jheiberg/md2confluence.git
cd md2confluence

# Open in browser
# Just open index.html - no build step needed!
```

### No Build Process
- Pure HTML/CSS/JavaScript
- All dependencies via CDN
- Zero configuration
- Works offline (after first load of CDN resources)

## Technical Constraints

### Browser Requirements
- **Minimum**: ES6 support (Chrome 51+, Firefox 54+, Safari 10+, Edge 15+)
- **Recommended**: Latest versions for best performance
- **Not Supported**: Internet Explorer 11 and below

### File Size Limits
- Theoretical: Unlimited (browser memory dependent)
- Practical: ~10MB markdown files tested successfully
- Consideration: Large files with many diagrams may slow browser

### Security Constraints
- **Same-Origin Policy**: All processing client-side
- **No CORS Issues**: No external requests during processing
- **Clipboard Access**: Requires HTTPS or localhost
- **File Access**: User must explicitly select files

## Output Formats

### Draw.io XML Structure
```xml
<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="[ISO timestamp]" agent="md2confluence" version="21.0.0" type="device">
  <diagram name="[Diagram N]" id="diagram-[N]">
    <mxGraphModel dx="1434" dy="780" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="mermaid-[N]" value="[Escaped Mermaid Code]" style="shape=mxgraph.mermaid;html=1;whiteSpace=wrap;fillColor=#ffffff;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="770" height="600" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

### Confluence Storage Format (XHTML)
- Standard XHTML elements: `<h1>`, `<p>`, `<ul>`, `<table>`, etc.
- Confluence macros: `<ac:structured-macro>`
- Inline formatting: `<strong>`, `<em>`, `<code>`, `<a>`
- Special characters: XML-escaped using `&lt;`, `&gt;`, `&amp;`, `&quot;`, `&apos;`

### Confluence Code Macro
```xml
<ac:structured-macro ac:name="code" ac:schema-version="1">
  <ac:parameter ac:name="language">[language]</ac:parameter>
  <ac:parameter ac:name="theme">midnight</ac:parameter>
  <ac:parameter ac:name="linenumbers">true</ac:parameter>
  <ac:plain-text-body><![CDATA[...code...]]></ac:plain-text-body>
</ac:structured-macro>
```

## Performance Considerations

### Processing Speed
- **Small files (<100KB)**: Instant (~100ms)
- **Medium files (100KB-1MB)**: Fast (~500ms)
- **Large files (1MB-10MB)**: Acceptable (~2-5s)
- **Bottleneck**: Mermaid SVG rendering for preview

### Memory Usage
- Each diagram generates:
  - SVG string (preview)
  - Draw.io XML string
  - Blob objects
- Garbage collection handles cleanup
- No memory leaks detected in testing

### Optimization Strategies
1. Process diagrams sequentially (not parallel) to avoid browser slowdown
2. Use `await` for Mermaid rendering to prevent race conditions
3. Clean up object URLs after download
4. Minimal DOM manipulation during processing

## Error Handling

### Common Error Scenarios
1. **Invalid Mermaid Syntax**: Continue processing, null diagram
2. **File Read Error**: Show notification, halt processing
3. **Clipboard API Failure**: Show fallback notification
4. **Missing Libraries**: Check on load, show error

### Error Recovery
- Graceful degradation: Continue processing other diagrams if one fails
- User notifications: Clear error messages
- Console logging: Detailed error information for debugging

## Browser Compatibility Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| FileReader | ✅ | ✅ | ✅ | ✅ |
| Blob/URL | ✅ | ✅ | ✅ | ✅ |
| Clipboard API | ✅ | ✅ | ✅ | ✅ |
| ES6 Syntax | ✅ | ✅ | ✅ | ✅ |
| Async/Await | ✅ | ✅ | ✅ | ✅ |
| CSS Flexbox | ✅ | ✅ | ✅ | ✅ |

## Dependencies Version Strategy
- Use specific versions via CDN (not `@latest`)
- Marked: v11.x (stable)
- Mermaid: v10.x (ESM module)
- DOMPurify: v3.x (current major)

## Known Technical Issues
1. **Clipboard API**: Requires HTTPS or localhost (browser security)
2. **Large Diagrams**: May render slowly in preview
3. **Complex Mermaid**: Some edge cases may not render perfectly
4. **Browser Cache**: CDN resources cached by browser (good for performance)

## Future Technical Considerations
- Service Worker for offline support
- IndexedDB for storing processed files
- Web Workers for background processing
- Direct Confluence API integration
- Support for additional diagram formats (PlantUML, GraphViz)
