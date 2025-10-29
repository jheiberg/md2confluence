# Quick Start Guide

## How to Use the Markdown to Confluence Converter

### Step 1: Open the Application
1. Open `index.html` in your web browser (Chrome, Firefox, Edge, or Safari)

### Step 2: Select Your Markdown File
1. Click the "📁 Choose Markdown File" button
2. Select your `.md` file (try `test.md` or `example.md` to start)
3. You'll see "File loaded successfully!"

### Step 3: Process the File
1. Click "🔄 Process & Save Files"
2. Wait a few seconds while diagrams are processed
3. You'll see a preview of your document with rendered diagrams

### Step 4: Download Generated Files
The application creates several files for you:

- **diagram-1.png, diagram-2.png, etc.** - Individual PNG files for each Mermaid diagram
- **yourfile-with-images.md** - Modified markdown with image references
- **yourfile-confluence.html** - Standalone HTML file ready for Confluence

Click "💾 Download" next to each file, or click "📦 Download All Files"

### Step 5: Use in Confluence

#### Option A: Copy and Paste (Easiest)
1. Click "📋 Copy for Confluence"
2. Go to your Confluence page
3. Paste with Ctrl+V (or Cmd+V on Mac)
4. SVG diagrams will be embedded inline

#### Option B: Use Generated HTML File (Best Results)
1. Download the `-confluence.html` file
2. Open it in your browser
3. Select all content (Ctrl+A or Cmd+A)
4. Copy (Ctrl+C or Cmd+C)
5. Paste into Confluence
6. The formatting and diagrams will be preserved

#### Option C: Upload PNG Files as Attachments
1. Download all PNG files
2. In Confluence, upload the PNG files as attachments
3. Use the modified markdown file to reference them
4. Insert images in Confluence pointing to the uploaded PNGs

### Tips for Best Results

✅ **DO:**
- Test with the `test.md` file first to understand the workflow
- Keep mermaid diagrams reasonably sized (large diagrams may be slow)
- Use descriptive names for your markdown files
- Download all files before closing the browser

❌ **DON'T:**
- Close the browser before downloading files (they're not saved anywhere else)
- Use very complex mermaid diagrams (they may fail to render)
- Expect the "Copy for Confluence" to work perfectly in all browsers (use the HTML file method if it doesn't)

### Troubleshooting

**Q: Diagrams aren't rendering**
A: Make sure your mermaid syntax is correct. Check the browser console (F12) for errors.

**Q: Copy to Confluence doesn't work**
A: Try downloading the HTML file and copying from there, or use Confluence's "Insert > Markup" feature.

**Q: Some diagrams are missing**
A: Complex diagrams may fail to render. Simplify them or check the mermaid syntax.

**Q: Files aren't downloading**
A: Check your browser's download settings and popup blocker.

### Example Workflow

1. Open `index.html`
2. Select `example.md`
3. Click "Process & Save Files"
4. Download all files
5. Open `example-confluence.html` in browser
6. Copy content and paste into Confluence
7. Done! 🎉

---

**Need Help?** Check the README.md file for more detailed information.
