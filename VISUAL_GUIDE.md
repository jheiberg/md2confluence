# 🎨 Visual Guide

## Application Interface

When you open `index.html`, you'll see:

```
┌─────────────────────────────────────────────────────────┐
│  📄 Markdown to Confluence Converter                    │
│  Convert markdown files with Mermaid diagrams to        │
│  Confluence-ready format                                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│         ┌──────────────────────────┐                    │
│         │  📁 Choose Markdown File │                    │
│         └──────────────────────────┘                    │
│         Selected: (no file chosen)                       │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [ 🔄 Process & Save Files ]  [ 📦 Download All Files ] │
│  [ 📋 Copy for Confluence  ]                            │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  Preview                                                 │
│  ┌───────────────────────────────────────────────────┐  │
│  │                                                   │  │
│  │  👆 Select a markdown file to get started        │  │
│  │                                                   │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## After Processing

After clicking "Process & Save Files":

```
┌─────────────────────────────────────────────────────────┐
│  📁 Generated Files                                      │
├─────────────────────────────────────────────────────────┤
│  🖼️  diagram-1.png  (125.7 KB)      [💾 Download]      │
│  🖼️  diagram-2.png  (89.3 KB)       [💾 Download]      │
│  📝  test-with-images.md  (2.1 KB)  [💾 Download]      │
│  📄  test-confluence.html  (98.4 KB) [💾 Download]      │
└─────────────────────────────────────────────────────────┘

Preview
┌─────────────────────────────────────────────────────────┐
│  # Test Document                                         │
│                                                          │
│  ## Simple Flowchart                                     │
│                                                          │
│  ┌─────────────────────────────────┐                   │
│  │     [Rendered SVG Diagram]      │                   │
│  │  ┌───────┐    ┌─────────┐      │                   │
│  │  │ Start │───▶│ Process │───▶   │                   │
│  │  └───────┘    └─────────┘      │                   │
│  └─────────────────────────────────┘                   │
│                                                          │
│  ## Text Content                                         │
│  - Item 1                                                │
│  - Item 2                                                │
└─────────────────────────────────────────────────────────┘
```

## File Output Structure

When you download all files:

```
Downloads/
├── diagram-1.png          ← PNG file for first Mermaid diagram
├── diagram-2.png          ← PNG file for second Mermaid diagram
├── test-with-images.md    ← Markdown with image references
└── test-confluence.html   ← Standalone HTML file
```

## Markdown Transformation

### Before (Original):
```markdown
## Diagram

\```mermaid
graph LR
    A[Start] --> B[End]
\```
```

### After (Generated Markdown):
```markdown
## Diagram

![Diagram 1](diagram-1.png)
```

### Generated PNG File (diagram-1.png):
```
High-quality PNG image file
- Converted from SVG for Confluence compatibility
- 2x resolution for crisp display
- White background
- Optimized for web display
```

### Generated HTML File:
```html
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
    <style>/* Confluence-friendly styles */</style>
</head>
<body>
    <h2>Diagram</h2>
    <div class="mermaid-container">
        <img src="..." alt="Diagram 1" />
    </div>
</body>
</html>
```

## Workflow Diagram

```
User Actions                 Application                   Output
─────────────               ────────────                ──────────

1. Select File    ──────▶   Load markdown
                            into memory

2. Click Process  ──────▶   Parse markdown    ──────▶   
                            Extract mermaid           │
                            blocks                    │
                                                      ↓
                            Render each         ──────▶  diagram-1.png
                            diagram to PNG            │  diagram-2.png
                                                      │  diagram-3.png
                                                      │
                            Create modified     ──────▶  file-with-images.md
                            markdown                  │
                                                      │
                            Generate HTML       ──────▶  file-confluence.html
                            file                      │
                                                      ↓
3. Download       ◀────────  Display files     ──────▶  All files ready
                            list                          to download

4. Copy Content   ──────▶   Copy to clipboard ──────▶  Paste into
                                                        Confluence
```

## Confluence Integration Options

### Option 1: Direct Paste
```
Application ──[Copy]──▶ Clipboard ──[Paste]──▶ Confluence Editor
            (with SVGs embedded inline)
```

### Option 2: HTML File
```
Download HTML ──[Open in Browser]──▶ Select All ──[Copy]──▶ Paste in Confluence
```

### Option 3: Separate PNG Files
```
Download PNGs ──[Upload to Confluence]──▶ Attach to page
                                           ↓
                                    Reference in markdown
```

## Tips for Success

✅ **Test First**
- Always test with `test.md` before processing important files

✅ **Keep Diagrams Simple**
- Complex diagrams may take longer to render
- Very large diagrams may fail

✅ **Download Before Closing**
- Files exist only in browser memory until downloaded
- Close browser = lose files

✅ **Check Console for Errors**
- Press F12 to open browser developer tools
- Check for any error messages

✅ **Use Generated HTML**
- The HTML file is the most reliable way to get content into Confluence
- Open it, select all, copy, paste!

---

**Ready to start?** Open `index.html` and try it with `test.md`! 🚀
