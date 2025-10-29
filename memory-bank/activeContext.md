# Active Context

## Current Focus
Project initialization and memory bank creation. Core application functionality is complete and working.

## Recent Changes (October 29, 2025)

### Code Fixes
1. **Fixed file loading issue** (most recent)
   - Found corrupt code in `app.js` from previous edit
   - `displayFiles()` function was duplicated and malformed
   - `copyForConfluence()` had mixed legacy code
   - Fixed duplicate function declarations
   - Application now loads and functions correctly

2. **Repository Setup**
   - Initialized Git repository
   - Created `.gitignore` file
   - Committed all project files
   - Created GitHub repository: https://github.com/jheiberg/md2confluence
   - Pushed code to remote (switched from SSH to HTTPS due to timeout)

3. **Complete Rewrite to Confluence Storage Format** (earlier today)
   - Replaced entire PNG generation approach
   - Implemented draw.io XML generation via `mermaidToDrawio()`
   - Implemented Confluence XHTML generation via `markdownToConfluenceStorage()`
   - Added inline markdown conversion via `convertInlineMarkdown()`
   - Updated file type icons (drawio: 📊, confluence: 📄)
   - Changed copy function to copy Confluence XML instead of HTML

## Current State

### What's Working
✅ Application loads in browser  
✅ File selection and upload  
✅ Mermaid diagram extraction  
✅ Draw.io XML generation  
✅ Confluence Storage Format generation  
✅ SVG preview rendering  
✅ File download functionality  
✅ Clipboard copy  
✅ Code block styling (midnight theme)  
✅ Git repository initialized and pushed  

### What Needs Testing
⚠️ Actual Confluence import (not tested with real Confluence instance)  
⚠️ Draw.io diagram editability in Confluence  
⚠️ Complex markdown edge cases  
⚠️ Large files with many diagrams  

### Known Issues
- Documentation files (README, QUICK_START, etc.) still reference PNG approach
- Need to update docs to reflect draw.io + Confluence Storage Format approach
- `WHY_PNG.md` is now obsolete with current approach

## Next Steps

### Immediate Priorities
1. **Test with Confluence**: Verify XML import works correctly
2. **Update Documentation**: 
   - Revise README.md
   - Update QUICK_START.md
   - Update PROJECT_SUMMARY.md
   - Update VISUAL_GUIDE.md
   - Remove or revise WHY_PNG.md

3. **Create Import Guide**: Promised but not yet delivered
   - How to import XML into Confluence
   - How to verify draw.io diagrams work
   - Troubleshooting common issues

### Code Quality
- Address lint warnings (non-critical):
  - Cognitive complexity in `markdownToConfluenceStorage()` (60 vs threshold 15)
  - Use `replaceAll()` instead of `replace()` with global flag (already done in `escapeXml()`)
  - Unused variable `listLevel`
  - Replace `window` with `globalThis`

### Future Enhancements
- Batch file processing
- Custom theme options for code blocks
- Direct Confluence API integration
- Support for other diagram formats
- Drag-and-drop file upload

## Active Decisions

### Recent Architecture Decisions
1. **Use Confluence Storage Format** instead of HTML
   - Rationale: Native Confluence format, better compatibility
   - Impact: Full rewrite of conversion logic
   - Result: More maintainable, better integration

2. **Use draw.io XML** instead of PNG
   - Rationale: Editable diagrams, native Confluence support
   - Impact: Changed diagram generation completely
   - Result: Professional solution with editability

3. **Keep SVG for preview** in browser
   - Rationale: Fast, high quality, already working
   - Impact: Two rendering paths (SVG preview, draw.io export)
   - Result: Best user experience

### Technical Preferences
- Client-side only (no server)
- CDN for dependencies (no npm/build)
- Pure HTML/CSS/JavaScript
- Inline styles for preview (matches Confluence)
- Git for version control
- GitHub for repository hosting

## Context for Next Session

### What You Need to Know
1. **Core functionality is complete** - application converts markdown to Confluence format with draw.io diagrams
2. **Not tested with real Confluence** - need user feedback on actual import
3. **Documentation is outdated** - references old PNG approach
4. **Repository is live** - https://github.com/jheiberg/md2confluence
5. **Memory bank just created** - this is the first complete documentation set

### Key Files to Check
- `app.js` - Main application logic (just fixed)
- `index.html` - UI structure
- `styles.css` - Styling
- Documentation files - need updates

### User Expectations
User has been working through multiple iterations:
- Started with basic HTML preview
- Tried SVG (didn't work in Confluence)
- Tried PNG (worked but had issues)
- Now using draw.io + Confluence Storage Format

User is technical and understands the trade-offs. Likely next questions:
- Does this actually work in Confluence?
- How do I import the files?
- Can I customize the styling?

## Important Patterns

### Conversation Style
User communicates concisely, expects:
- Direct answers
- Technical accuracy
- Working code
- Clear explanations of trade-offs

### Work Style
- Iterative improvement
- Willing to try different approaches
- Values native integration over workarounds
- Prefers working solutions over perfect code

### Project Evolution
This project has gone through significant iterations based on real-world testing. Be prepared for further changes based on Confluence import testing results.
