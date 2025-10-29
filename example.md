# Project Architecture

This is a comprehensive markdown document with various Mermaid diagrams to demonstrate the converter's capabilities.

## System Overview

```mermaid
graph TB
    User[User] --> UI[Web Interface]
    UI --> Parser[Markdown Parser]
    Parser --> Mermaid[Mermaid Renderer]
    Parser --> HTML[HTML Generator]
    Mermaid --> SVG[SVG Output]
    HTML --> Confluence[Confluence Format]
    SVG --> Confluence
    Confluence --> Clipboard[Clipboard API]
```

## Application Flow

The application follows a simple but effective workflow:

```mermaid
sequenceDiagram
    participant U as User
    participant F as File Input
    participant P as Parser
    participant M as Mermaid
    participant C as Clipboard
    
    U->>F: Select markdown file
    F->>P: Load content
    P->>P: Extract mermaid blocks
    P->>M: Render diagrams
    M-->>P: Return SVGs
    P->>P: Insert SVGs into HTML
    P->>U: Display preview
    U->>C: Copy for Confluence
    C-->>U: Ready to paste
```

## Component Architecture

```mermaid
classDiagram
    class Application {
        +currentMarkdown: string
        +renderedHtml: string
        +confluenceHtml: string
        +handleFileSelect()
        +renderMarkdown()
        +copyForConfluence()
    }
    
    class MarkdownParser {
        +parse(markdown: string)
        +extractMermaid()
        +replacePlaceholders()
    }
    
    class MermaidRenderer {
        +render(code: string)
        +convertToSVG()
    }
    
    class ClipboardManager {
        +copyHTML()
        +copyText()
        +createClipboardItem()
    }
    
    Application --> MarkdownParser
    Application --> MermaidRenderer
    Application --> ClipboardManager
```

## State Machine

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> FileSelected: Select File
    FileSelected --> Rendering: Click Render
    Rendering --> Rendered: Success
    Rendering --> Error: Failure
    Error --> FileSelected: Try Again
    Rendered --> Copying: Copy for Confluence
    Copying --> Rendered: Complete
    Rendered --> FileSelected: Select New File
```

## Deployment Diagram

```mermaid
graph LR
    subgraph Browser
        A[index.html]
        B[app.js]
        C[styles.css]
    end
    
    subgraph CDN
        D[Marked.js]
        E[Mermaid.js]
        F[DOMPurify.js]
    end
    
    subgraph User
        G[Markdown Files]
    end
    
    G --> A
    A --> B
    A --> C
    B --> D
    B --> E
    B --> F
```

## Entity Relationship

```mermaid
erDiagram
    MARKDOWN-FILE ||--o{ MERMAID-BLOCK : contains
    MARKDOWN-FILE ||--|| RENDERED-HTML : generates
    MERMAID-BLOCK ||--|| SVG-IMAGE : converts-to
    RENDERED-HTML ||--o{ SVG-IMAGE : includes
    RENDERED-HTML ||--|| CONFLUENCE-HTML : transforms-to
    
    MARKDOWN-FILE {
        string name
        string content
        date lastModified
    }
    
    MERMAID-BLOCK {
        int index
        string code
        string type
    }
    
    SVG-IMAGE {
        string id
        string svg
        int width
        int height
    }
```

## Timeline

```mermaid
gantt
    title Project Development Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1
    Setup Project           :a1, 2025-10-01, 1d
    Create UI              :a2, after a1, 2d
    section Phase 2
    Implement Parser       :a3, after a2, 2d
    Add Mermaid Support    :a4, after a3, 3d
    section Phase 3
    Confluence Integration :a5, after a4, 2d
    Testing & Docs        :a6, after a5, 2d
```

## User Journey

```mermaid
journey
    title User Experience Journey
    section Discover
      Open Application: 5: User
      See Interface: 4: User
    section Use
      Select File: 5: User
      Click Render: 5: User
      View Preview: 5: User
    section Export
      Copy for Confluence: 5: User
      Paste in Confluence: 5: User
      Celebrate: 5: User
```

## Key Features

1. **Simple Interface**: Clean, modern design
2. **Fast Rendering**: Efficient parsing and conversion
3. **Confluence Ready**: One-click copy functionality
4. **SVG Quality**: High-quality diagram output
5. **No Installation**: Works directly in browser

## Technical Stack

| Component | Technology |
|-----------|-----------|
| Parser    | Marked.js |
| Diagrams  | Mermaid.js |
| Security  | DOMPurify |
| Frontend  | Vanilla JS |
| Styling   | CSS3 |

## Conclusion

This application provides a seamless way to convert markdown documents with Mermaid diagrams into Confluence-ready content. The SVG conversion ensures high-quality diagrams that look great in Confluence pages.
