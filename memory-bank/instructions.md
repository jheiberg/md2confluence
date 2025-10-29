# Project Instructions

## Critical Implementation Paths

### Mermaid Block Extraction Pattern
When working with Mermaid diagram extraction, ALWAYS use this regex pattern:
```javascript
/```mermaid\s*\r?\n([\s\S]*?)```/g
```
This pattern:
- Handles both `\r\n` (Windows) and `\n` (Unix) line endings
- Uses non-greedy matching to get individual code blocks
- Captures the diagram code in group 1

### Confluence Storage Format Rules
1. **Always use XHTML elements**, not HTML5 (e.g., `<br/>` not `<br>`)
2. **Use Confluence macros** for special content:
   - Draw.io: `<ac:structured-macro ac:name="drawio">`
   - Code: `<ac:structured-macro ac:name="code">`
3. **Escape XML special characters** in content:
   - Use `escapeXml()` before inserting text
   - Use `<![CDATA[...]]>` for macro bodies
4. **Preserve whitespace** in code blocks (don't trim)

### Draw.io XML Structure
The draw.io XML must follow this structure:
```xml
<mxfile host="app.diagrams.net" modified="[ISO]" agent="md2confluence" version="21.0.0" type="device">
  <diagram name="[Name]" id="diagram-[N]">
    <mxGraphModel dx="1434" dy="780" grid="1" ...>
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="mermaid-[N]" value="[ESCAPED_MERMAID]" 
                style="shape=mxgraph.mermaid;html=1;whiteSpace=wrap;..." 
                vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="770" height="600" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```
Key points:
- Use `shape=mxgraph.mermaid` for Mermaid support
- Embed Mermaid code as escaped XML in `value` attribute
- Use standard geometry (770x600)

## User Preferences

### Communication Style
- **Concise and direct**: User prefers short, clear answers
- **Technical accuracy**: User is technical, provide accurate details
- **Working code**: Prefer functioning solutions over theoretical
- **Trade-off transparency**: Explain why decisions were made

### Code Style
- **Vanilla JavaScript**: No frameworks (React, Vue, etc.)
- **Modern ES6+**: Use arrow functions, async/await, template literals
- **Clear naming**: Descriptive variable and function names
- **Comments for complex logic**: Explain the "why" not the "what"
- **Functional approach**: Small, focused functions

### UI Preferences
- **Simple and clean**: No flashy animations or complex interactions
- **Obvious workflow**: Clear buttons and labels
- **Status feedback**: Show notifications for actions
- **Preview before action**: Let user see results before committing

## Project-Specific Patterns

### Error Handling Strategy
```javascript
try {
    // Main processing
} catch (error) {
    console.error('Detailed error:', error);
    showNotification('User-friendly message', 'error');
    // Continue gracefully if possible
}
```
Pattern:
1. Log detailed error to console (for debugging)
2. Show friendly message to user
3. Gracefully degrade if possible (don't crash)

### File Generation Pattern
```javascript
const blob = new Blob([content], { type: 'mime/type' });
generatedFiles.push({
    name: 'filename.ext',
    blob: blob,
    type: 'category',
    size: blob.size
});
```
Always:
- Create Blob with appropriate MIME type
- Store in `generatedFiles` array
- Include metadata (name, type, size)

### Async Processing Pattern
Use `async/await` for sequential operations:
```javascript
for (let i = 0; i < items.length; i++) {
    const result = await processItem(items[i]);
    // Use result immediately
}
```
Don't use parallel processing for diagrams (causes browser slowdown).

## Known Challenges

### Challenge: Confluence Compatibility
- **Problem**: Confluence has specific requirements for content format
- **Solution**: Use Confluence Storage Format (XHTML) with official macros
- **Lesson**: Native integration beats workarounds

### Challenge: Diagram Editability
- **Problem**: PNG/SVG diagrams aren't editable after import
- **Solution**: Use draw.io XML with embedded Mermaid code
- **Lesson**: Preserve source format when possible

### Challenge: Code Block Styling
- **Problem**: Default code blocks in Confluence are light-themed
- **Solution**: Use midnight theme parameter in code macro
- **Lesson**: Use platform features rather than custom styling

### Challenge: Large Files
- **Problem**: Processing many diagrams can slow browser
- **Solution**: Sequential processing with status updates
- **Lesson**: User feedback during long operations is important

## Evolution of Decisions

### Decision: Output Format
1. **First attempt**: HTML with inline SVG
   - Outcome: Confluence blocked SVG for security
2. **Second attempt**: HTML with PNG images
   - Outcome: Worked but not editable, had quality issues
3. **Current solution**: Confluence Storage Format with draw.io XML
   - Outcome: Native integration, fully editable

### Decision: Processing Location
- **Choice**: Client-side only (no server)
- **Rationale**: 
  - User privacy (no data sent anywhere)
  - Simplicity (no deployment needed)
  - Speed (instant processing)
- **Trade-off**: Limited by browser resources

### Decision: Library Choices
- **Marked.js**: Industry standard, lightweight, good GFM support
- **Mermaid.js**: Official Mermaid renderer, used only for preview
- **DOMPurify**: Security best practice (loaded but not critical path)

## Tool Usage Patterns

### Git Workflow
```powershell
git add .
git commit -m "Clear, descriptive message"
git push origin master
```
- Commit frequently with clear messages
- Push to GitHub regularly
- Use `.gitignore` for temporary files

### File Editing
- Use multi-file edits when making related changes
- Include context (3-5 lines) in replacements
- Test after significant changes

### Testing
- Test in browser after code changes
- Check console for errors
- Verify downloads work
- Test with example markdown files

## Documentation Philosophy

### README
- Should be first point of contact
- Include "What", "Why", "How"
- Show examples
- Keep updated with code

### Code Comments
- Explain complex logic
- Document function parameters and return values
- Note any workarounds or edge cases
- Don't state the obvious

### Memory Bank
- Update after significant changes
- Record decisions and rationale
- Note patterns and preferences
- Keep activeContext.md current

## Future Development Notes

### If Adding Features
1. Maintain client-side only architecture
2. Keep UI simple and obvious
3. Test with real Confluence
4. Update documentation immediately
5. Consider browser compatibility

### If Refactoring
1. Keep functions focused and small
2. Maintain backward compatibility in outputs
3. Test generated files work in Confluence
4. Update memory bank with new patterns

### If Fixing Bugs
1. Understand root cause before fixing
2. Add console logging for debugging
3. Test fix with multiple scenarios
4. Update error handling if needed
5. Document the fix in progress.md

## Critical Reminders

1. **Always test in browser** after code changes
2. **Confluence Storage Format is XHTML** - self-closing tags, proper nesting
3. **Draw.io XML must be valid** - test with draw.io if uncertain
4. **Escape XML in text content** - use `escapeXml()` consistently
5. **User privacy matters** - never add server-side processing
6. **Documentation drift is real** - update docs with code changes
7. **SVG is for preview only** - draw.io XML is for export
8. **Sequential diagram processing** - don't parallelize Mermaid rendering
