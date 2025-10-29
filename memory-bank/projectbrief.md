# Project Brief

## Project Name
md2confluence - Markdown to Confluence Converter

## Core Purpose
Convert markdown files containing Mermaid diagrams into Confluence-compatible format with embedded draw.io diagrams.

## Primary Goals
1. **Parse markdown files** with GitHub-flavored markdown support
2. **Extract Mermaid diagrams** from code blocks
3. **Convert diagrams** to draw.io XML format for native Confluence editing
4. **Generate Confluence Storage Format** (XHTML) output
5. **Provide downloadable files** for easy Confluence import

## Key Requirements

### Functional Requirements
- Accept markdown file upload via browser
- Parse and render markdown to HTML preview
- Extract all Mermaid diagram code blocks
- Convert Mermaid diagrams to draw.io XML format
- Generate Confluence Storage Format (XHTML) with embedded draw.io macros
- Convert code blocks to Confluence code macro with midnight theme
- Provide file downloads (.drawio files and -confluence.xml)
- Copy Confluence XML to clipboard
- Display live preview with styled output

### Technical Requirements
- Client-side only (no server needed)
- Use Marked.js for markdown parsing
- Use Mermaid.js for diagram rendering (preview)
- Generate draw.io XML with embedded Mermaid code
- Output Confluence Storage Format with ac:structured-macro elements
- Support all standard markdown features (headings, lists, tables, code blocks, etc.)

### User Experience Requirements
- Simple, intuitive interface
- File drag-and-drop or click to select
- Real-time preview
- One-click copy to clipboard
- Bulk download option
- Clear status notifications

## Target Users
- Documentation teams using Confluence
- Technical writers
- Developers documenting with markdown and Mermaid
- Teams migrating documentation to Confluence

## Success Criteria
- Markdown files with Mermaid diagrams convert successfully
- Draw.io diagrams are editable in Confluence
- Code blocks display with proper syntax highlighting in Confluence
- Users can import generated XML directly into Confluence
- Zero-installation, browser-based solution

## Repository
https://github.com/jheiberg/md2confluence

## Project Status
Active - Core functionality complete, ready for testing with actual Confluence import.
