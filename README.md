# 📄 Markdown to Confluence Converter

A web-based application that converts markdown files with Mermaid diagrams into Confluence-ready format and **pushes them directly to Confluence** via API.

## 🎯 What It Does

This tool processes your markdown files and:
1. **Extracts** all Mermaid diagram code blocks
2. **Converts** each diagram to draw.io format (compatible with Confluence)
3. **Converts** markdown to Confluence Storage Format
4. **Pushes directly** to Confluence via REST API (creates or updates pages)
5. **Uploads diagrams** as draw.io attachments automatically
6. **Alternative**: Download files for manual upload

Perfect for documentation teams who use Confluence and want to automate their documentation workflow!

## ✨ Features

- 📝 **Markdown Parsing**: Full support for GitHub-flavored markdown
- 🎨 **Mermaid Diagrams**: Automatically converts Mermaid diagrams to draw.io format
- 👁️ **Live Preview**: See your rendered markdown in real-time
- � **Direct Push to Confluence**: Upload content and diagrams directly to Confluence via API
- �📋 **Confluence Copy**: One-click copy in Confluence-compatible format
- 🔍 **Raw HTML View**: Toggle to see the generated HTML code
- 🎯 **Clean Interface**: Modern, responsive design with intuitive controls
- � **Save Configuration**: Store your Confluence settings for repeated use

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No installation or build process required!

### Quick Start

**For Direct Push to Confluence:**
1. See `CONFLUENCE_SETUP.md` for OAuth 2.0 setup (one-time setup)
2. Open `index.html` in your browser
3. Configure OAuth credentials and authorize
4. Select a markdown file (try `test.md`)
5. Click "Process & Save Files"
6. Click "Push to Confluence" - Done! ✅

**For Manual Upload:**
1. Open `index.html` in your browser
2. Select a markdown file (try `test.md`)
3. Click "Process & Save Files"
4. Download the generated files
5. Upload to Confluence manually

### Usage

1. **Open the Application**
   - Simply open `index.html` in your web browser

2. **Configure Confluence OAuth (First Time Only)**
   - Register an OAuth app in Atlassian Developer Console
   - Fill in the Confluence Configuration section:
     - Confluence URL (e.g., `https://your-domain.atlassian.net`)
     - OAuth Client ID and Secret
     - Space Key (e.g., `DEV`)
   - Click "💾 Save Config" to remember these settings
   - Click "🔐 Authorize with Confluence" to connect
   - See `CONFLUENCE_SETUP.md` for detailed setup instructions

3. **Load a Markdown File**
   - Click the "Choose Markdown File" button
   - Select a `.md` or `.markdown` file from your computer

4. **Process and Push**
   - Click "🔄 Process & Save Files" to convert your markdown
   - Mermaid diagrams will be converted to draw.io format
   - Click "🚀 Push to Confluence" to upload directly to Confluence
   - The app will create or update the page and upload all diagrams

5. **Alternative: Download Files**
   - Click "� Download All Files" to download generated files
   - Files include draw.io diagrams and Confluence XML
   - Upload manually to Confluence if needed

6. **Copy for Confluence**
   - Click "📋 Copy for Confluence" to copy the rendered content
   - Paste directly into Confluence (use Ctrl+V or Cmd+V)

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
