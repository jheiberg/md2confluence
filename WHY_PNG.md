# Why PNG Instead of SVG or GIF?

## Confluence Compatibility

The application generates **PNG** image files instead of SVG or GIF for several important reasons:

## ✅ PNG Advantages

### 1. **Universal Confluence Support**
- ✅ PNG images work reliably in **all Confluence versions**
- ✅ Properly displayed in both Cloud and Server/Data Center editions
- ✅ No rendering issues or blocked content

### 2. **High Quality**
- ✅ Lossless compression (no quality loss)
- ✅ Supports transparency (if needed)
- ✅ Generated at **2x resolution** for crisp display
- ✅ Much better quality than GIF

### 3. **Easy Integration**
- ✅ Can be directly embedded in Confluence pages
- ✅ Works with copy/paste
- ✅ Can be uploaded as attachments
- ✅ Properly displayed in mobile apps

### 4. **File Size**
- ✅ Reasonable file sizes (typically 50-200 KB per diagram)
- ✅ Smaller than uncompressed formats
- ✅ Larger than SVG but ensures compatibility

## ❌ Why Not SVG?

SVG (Scalable Vector Graphics) has issues with Confluence:

- ❌ **Not displayed** in many Confluence versions
- ❌ Often shows as **broken image** or download link
- ❌ Confluence may **strip SVG content** for security reasons
- ❌ Requires special plugins or configurations
- ❌ Inconsistent behavior across Confluence versions

## ❌ Why Not GIF?

GIF format has limitations:

- ❌ **Limited to 256 colors** (poor quality for diagrams)
- ❌ **Lossy compression** for complex images
- ❌ Larger file sizes than PNG for same quality
- ❌ No transparency support in practice
- ❌ Not designed for static diagrams

## 🎯 PNG: The Best Choice

PNG offers the **perfect balance**:

| Feature | SVG | GIF | PNG |
|---------|-----|-----|-----|
| Confluence Support | ❌ Poor | ✅ OK | ✅ Excellent |
| Image Quality | ✅ Perfect | ❌ Poor | ✅ Excellent |
| File Size | ✅ Small | ⚠️ Medium | ⚠️ Medium |
| Transparency | ✅ Yes | ⚠️ Limited | ✅ Yes |
| Compatibility | ❌ Low | ✅ High | ✅ High |
| **Overall** | ❌ | ⚠️ | ✅ |

## Technical Details

### PNG Generation Process

1. **Mermaid renders** diagram to SVG
2. **SVG loaded** into HTML Image element
3. **Drawn to Canvas** at 2x resolution
4. **White background** added (Confluence friendly)
5. **Converted to PNG** with maximum quality
6. **Saved as blob** for download

### Quality Settings

- **Scale**: 2x (double resolution)
- **Format**: PNG
- **Quality**: 1.0 (maximum)
- **Background**: White (#FFFFFF)
- **Compression**: Standard PNG compression

### Example File Sizes

Typical PNG sizes for different diagram types:

- **Simple Flowchart**: 30-80 KB
- **Sequence Diagram**: 60-120 KB
- **Complex Class Diagram**: 100-200 KB
- **Large ER Diagram**: 150-300 KB

## Confluence Best Practices

### Uploading PNGs to Confluence

1. **Direct Paste**: Copy from HTML file, paste into Confluence
2. **Attachment**: Upload PNG files as page attachments
3. **Inline**: Drag and drop PNG into Confluence editor
4. **Gallery**: Use Confluence gallery macro for multiple images

### Image Display

PNG images in Confluence:
- ✅ Auto-resize to fit page width
- ✅ Click to view full size
- ✅ Work in all themes (light/dark)
- ✅ Export properly to PDF
- ✅ Display in mobile apps

## Summary

**PNG is the optimal format for Confluence documentation** because it combines:
- Excellent image quality
- Universal compatibility
- Reliable display across all Confluence versions
- Easy integration with Confluence features

While SVG would be ideal for scalability, Confluence's limitations make PNG the practical choice for real-world use.

---

**Bottom line**: PNG images work reliably in Confluence, look great, and integrate seamlessly! 🎉
