# 📄 Markdown to Confluence Converter

A web-based appli4. **Download Files**
   - Click "💾 Download" next to each file to download individually
   - Click "📦 Download All Files" to download all generated files
   - PNG files can be uploaded to Confluence as attachments or embedded inline
   - The HTML file can be opened and content copied to Confluencen that converts markdown files with Mermaid diagrams into PNG images and provides Confluence-ready output.

## 🎯 What It Does

This tool processes your markdown files and:
1. **Extracts** all Mermaid diagram code blocks
2. **Converts** each diagram to a high-quality PNG image file
3. **Creates** a modified markdown file with image references
4. **Generates** a standalone HTML file ready for Confluence
5. **Lets you download** all files individually or together

Perfect for documentation teams who use Confluence and want to include diagrams created with Mermaid!

## ✨ Features

- 📝 **Markdown Parsing**: Full support for GitHub-flavored markdown
- 🎨 **Mermaid Diagrams**: Automatically converts Mermaid diagrams to PNG images
- 👁️ **Live Preview**: See your rendered markdown in real-time
- 📋 **Confluence Copy**: One-click copy in Confluence-compatible format
- 🔍 **Raw HTML View**: Toggle to see the generated HTML code
- 🎯 **Clean Interface**: Modern, responsive design with intuitive controls
- 🖼️ **PNG Format**: Uses PNG instead of SVG for maximum Confluence compatibility (see WHY_PNG.md)

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No installation or build process required!

### Quick Start

See `QUICK_START.md` for a step-by-step guide, or:

1. Open `index.html` in your browser
2. Select a markdown file (try `test.md`)
3. Click "Process & Save Files"
4. Download the generated files
5. Use the HTML file or copy directly to Confluence

### Usage

1. **Open the Application**
   - Simply open `index.html` in your web browser

2. **Load a Markdown File**
   - Click the "Choose Markdown File" button
   - Select a `.md` or `.markdown` file from your computer

3. **Process and Generate Files**
   - Click "🔄 Process & Save Files" to convert your markdown
   - Mermaid diagrams will be extracted and saved as individual PNG files
   - The application generates:
     - Individual PNG files for each diagram (diagram-1.png, diagram-2.png, etc.)
     - A modified markdown file with image references instead of mermaid code
     - A standalone HTML file for Confluence

4. **Download Files**
   - Click "� Download" next to each file to download individually
   - Click "📦 Download All Files" to download all generated files
   - SVG files can be uploaded to Confluence as attachments
   - The HTML file can be opened and content copied to Confluence

5. **Copy for Confluence**
   - Click "� Copy for Confluence" to copy the rendered content
   - Paste directly into Confluence (use Ctrl+V or Cmd+V)
   - For best results, open the generated HTML file and copy from there

## 📖 Supported Markdown Features

- **Headers** (H1-H6)
- **Bold** and *italic* text
- Lists (ordered and unordered)
- Links and images
- Code blocks with syntax highlighting
- Tables
- Blockquotes
- **Mermaid diagrams** (flowcharts, sequence diagrams, class diagrams, etc.)

## 🎨 Mermaid Diagram Examples

The application supports all Mermaid diagram types:

### Flowchart
```markdown
\```mermaid
graph TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    B -->|No| D[End]
\```
```

### Sequence Diagram
```markdown
\```mermaid
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
\```
```

### Class Diagram
```markdown
\```mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
\```
```

## 🛠️ Technical Details

### Technologies Used

- **Marked.js**: Markdown parser and compiler
- **Mermaid.js**: Diagram rendering engine
- **DOMPurify**: HTML sanitization for security
- Pure HTML, CSS, and JavaScript (no build step required)

### How It Works

1. The application reads the selected markdown file
2. Extracts Mermaid code blocks and replaces them with placeholders
3. Parses the remaining markdown to HTML using Marked.js
4. Renders each Mermaid diagram to SVG using Mermaid.js
5. Replaces placeholders with the generated SVG images
6. Sanitizes the final HTML with DOMPurify
7. Prepares a Confluence-compatible version with embedded SVGs

### Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ❌ Not supported

## 📝 Example Markdown File

Create a test markdown file with this content:

```markdown
# Sample Document

This is a **sample** markdown document with a Mermaid diagram.

## Workflow Diagram

\```mermaid
graph LR
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[End Success]
    C -->|No| E[End Failure]
\```

## Features

- Easy to use
- Converts diagrams to SVG
- Ready for Confluence

### Code Example

\```javascript
function hello() {
    console.log("Hello, World!");
}
\```
```

## 🎯 Confluence Integration

### Pasting into Confluence

1. After clicking "Copy for Confluence", go to your Confluence page
2. Click in the editor where you want to paste
3. Press Ctrl+V (Windows/Linux) or Cmd+V (Mac)
4. The content with SVG diagrams will be pasted directly

### Troubleshooting

If the content doesn't paste correctly:
- Use the "Copy HTML" button instead
- In Confluence, click the "Insert" menu
- Select "Markup" or "HTML"
- Paste the HTML code
- Switch back to the visual editor

## 🔒 Security

- All HTML is sanitized using DOMPurify to prevent XSS attacks
- No data is sent to external servers
- All processing happens locally in your browser

## 🌟 Tips

- Use descriptive file names for your markdown files
- Test complex Mermaid diagrams before copying to Confluence
- Use the "Show Raw HTML" option to debug rendering issues
- Keep diagrams reasonably sized for better Confluence compatibility

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Future Enhancements

Potential features for future versions:
- Save rendered output as HTML file
- Batch processing of multiple files
- Custom theme support for diagrams
- Export to PDF
- Drag and drop file upload
- Markdown editor built-in

---

**Enjoy converting your markdown to Confluence!** 🎉
