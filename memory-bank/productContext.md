# Product Context

## Why This Exists

### The Problem
Documentation teams often write content in markdown with Mermaid diagrams for version control and collaboration. However, Confluence doesn't natively support:
- Markdown import with diagrams
- Mermaid diagram syntax
- Easy conversion of markdown documentation

Previous approaches (SVG, PNG) had issues:
- **SVG**: Confluence security restrictions blocked display
- **PNG**: Not editable after import, quality issues, scaling problems

### The Solution
This tool converts markdown to **Confluence Storage Format** (the native XHTML format Confluence uses internally) with Mermaid diagrams embedded as **draw.io XML**. This approach:
- Works natively in Confluence
- Allows diagrams to be edited after import
- Uses official Confluence macros (drawio, code)
- Maintains full fidelity of markdown content

## How It Should Work

### User Flow
1. **Select File**: User opens the web app and selects a markdown file
2. **Process**: Click "Process & Save Files" to convert
3. **Preview**: See rendered output in browser
4. **Download**: Get .drawio files (one per diagram) and .xml file (Confluence format)
5. **Import**: Upload XML to Confluence or copy/paste

### Key Features

#### Markdown Processing
- Parse all GitHub-flavored markdown syntax
- Convert headings (H1-H6) to Confluence XHTML
- Handle lists (ordered/unordered)
- Convert tables to Confluence table markup
- Process inline formatting (bold, italic, code, links)
- Handle blockquotes and horizontal rules

#### Diagram Handling
- Extract Mermaid code blocks from markdown
- Generate draw.io XML with embedded Mermaid code
- Render SVG preview in browser
- Embed diagrams using Confluence drawio macro
- Support all Mermaid diagram types (flowchart, sequence, class, etc.)

#### Code Block Handling
- Convert code blocks to Confluence code macro
- Apply midnight theme for consistent dark styling
- Enable line numbers
- Preserve language syntax highlighting

#### File Generation
- Individual .drawio files for each diagram
- Single -confluence.xml file with complete document
- Files ready for Confluence import without modification

## User Experience Goals

### Simplicity
- No installation required
- No build process
- Open HTML file in browser and start using
- Clear, obvious buttons and workflow

### Reliability
- All processing happens client-side (no server dependencies)
- No data leaves the user's browser
- Consistent output every time
- Error handling with clear messages

### Efficiency
- Fast processing (client-side JavaScript)
- Bulk download option
- Copy to clipboard for quick paste
- Preview before download

### Quality
- High-fidelity markdown rendering
- Proper Confluence macro formatting
- Styled preview that matches Confluence appearance
- Code blocks with dark theme and borders

## Integration with Confluence

### Import Process
1. User downloads the `-confluence.xml` file
2. In Confluence, user navigates to target page
3. Paste XML content or use Confluence import feature
4. Draw.io diagrams appear as editable macros
5. Code blocks appear with midnight theme
6. All markdown formatting preserved

### Editable Diagrams
- Draw.io is built into Confluence
- Diagrams can be clicked and edited
- Original Mermaid code preserved in draw.io XML
- Can be exported or modified post-import

## Evolution of Solution

### Phase 1: SVG Approach (Abandoned)
- Rendered Mermaid to SVG
- Confluence security blocked display
- Not a viable solution

### Phase 2: PNG Approach (Abandoned)
- Converted SVG to PNG via canvas
- Issues: CORS errors, distorted images, not editable
- Better than SVG but still limited

### Phase 3: Draw.io + Confluence Storage Format (Current)
- Native Confluence format
- Editable diagrams
- Professional code block styling
- Best integration with Confluence platform

## Future Considerations
- Batch processing multiple files
- Confluence import guide/tutorial
- Custom theme options for code blocks
- Direct Confluence API integration
- Support for other diagram formats
