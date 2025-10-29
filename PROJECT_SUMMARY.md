# Markdown to Confluence Converter - Summary

## What You Have

A complete web application that converts Markdown files with Mermaid diagrams into PNG images for Confluence-ready content.

## Files in This Project

- **index.html** - Main application interface
- **app.js** - Application logic and processing
- **styles.css** - Visual styling
- **README.md** - Complete documentation
- **QUICK_START.md** - Step-by-step usage guide
- **example.md** - Sample markdown with various Mermaid diagrams
- **test.md** - Simple test file to verify everything works

## How It Works

### The Process

1. **Load**: User selects a markdown file
2. **Parse**: Extract mermaid code blocks from the markdown
3. **Render**: Convert each mermaid block to PNG using Mermaid.js
4. **Save**: Create downloadable files:
   - Individual PNG files (diagram-1.png, diagram-2.png, etc.)
   - Modified markdown with image references
   - Standalone HTML file with embedded PNGs
5. **Export**: User downloads files or copies content to Confluence

### Key Features

✅ Extracts Mermaid diagrams and saves as separate PNG files
✅ Creates a modified markdown file with `![](diagram-X.png)` references
✅ Generates a standalone HTML file with embedded diagrams
✅ Live preview of rendered content
✅ One-click download of all generated files
✅ Direct copy-to-clipboard for Confluence
✅ No server required - runs entirely in the browser

## Usage Workflow

```
Markdown File (.md)
        ↓
  [Select File]
        ↓
 [Process & Save]
        ↓
    ┌───┴───┐
    ↓       ↓
  SVG     HTML
  Files   File
    ↓       ↓
[Download] [Copy]
    ↓       ↓
Confluence Page
```

## Technologies Used

- **Marked.js** - Markdown parser
- **Mermaid.js** - Diagram rendering
- **DOMPurify** - HTML sanitization
- **Vanilla JavaScript** - No framework needed
- **CSS3** - Modern styling

## Browser Support

✅ Chrome/Edge - Full support
✅ Firefox - Full support
✅ Safari - Full support
❌ IE11 - Not supported

## Advantages of This Approach

1. **Separate Files**: PNG files can be uploaded to Confluence as attachments
2. **Reusable**: PNG files can be used in other documents
3. **Confluence Compatible**: PNG format works reliably in Confluence (unlike SVG)
3. **Editable**: Generated markdown can be further edited
4. **Portable**: HTML file works standalone without the app
5. **Flexible**: Multiple ways to get content into Confluence

## Getting Started

1. Open `index.html` in your browser
2. Try it with `test.md` first
3. Read `QUICK_START.md` for detailed instructions
4. Use `example.md` to see complex diagrams

## Next Steps

To use this application:

1. **Test it**: Open index.html and process test.md
2. **Try your files**: Process your own markdown files
3. **Integrate**: Use the generated files in your Confluence documentation

## Support

For issues or questions:
- Check README.md for detailed documentation
- Review QUICK_START.md for usage steps
- Verify your Mermaid syntax is correct
- Check browser console (F12) for errors

---

**Enjoy converting your markdown to Confluence!** 🎉
