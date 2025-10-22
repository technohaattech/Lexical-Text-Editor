# @innoviatech/lexical-text-editor

A powerful, customizable rich text editor component built with Lexical, React, and Tailwind CSS. Features a modern toolbar, image support, video embedding, and comprehensive text formatting options.

## Features

- 🎨 **Rich Text Editing** — Bold, italic, underline, strikethrough, code blocks  
- 📝 **Text Formatting** — Headers, paragraphs, lists (bulleted & numbered), quotes  
- 🔗 **Link Support** — Insert and edit hyperlinks  
- 🖼️ **Media Embedding** — Images and YouTube videos with resizing  
- 🎯 **Customizable Toolbar** — Modern, intuitive interface  
- 🎨 **Color Picker** — Text and background color options  
- 📱 **Responsive Design** — Works on desktop and mobile  
- 🎪 **Radix UI Components** — Accessible, well-designed UI elements  
- ⚡ **TypeScript Support** — Fully typed for better development experience

---

## Installation

```bash
npm install @innoviatech/lexical-text-editor
```

### Peer Dependencies

This package requires several peer dependencies. Make sure to install them in your project:

```bash
# UI dependencies (required for full functionality)
npm install react-icons lucide-react @radix-ui/react-slot @radix-ui/react-tooltip @radix-ui/react-popover @radix-ui/react-dialog clsx tailwind-merge class-variance-authority react-color
```





## Quick Start

```tsx
import React, { useState } from 'react';
import { LexicalTextEditor } from '@innoviatech/lexical-text-editor';
import '@innoviatech/lexical-text-editor/style.css';

function App() {
  const [content, setContent] = useState('');

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <LexicalTextEditor
        name="my-editor"
        value={content}
        onChange={setContent}
        placeholder="Start typing your content here..."
      />
    </div>
  );
}

export default App;
```

---

## Props

| Prop        | Type                                | Required | Default       | Description                                 |
|-------------|-------------------------------------|----------|---------------|---------------------------------------------|
| `name`      | `string`                            | Yes      | —             | Unique identifier for the editor instance   |
| `value`     | `string`                            | Yes      | —             | Current editor content (HTML string)        |
| `onChange`  | `(value: string) => void`           | Yes      | —             | Callback fired when content changes         |
| `placeholder`| `string`                           | No       | `"Some Text"` | Placeholder text when editor is empty       |

---

## Advanced Usage

### With Initial Content

```tsx
import React, { useState } from 'react';
import { LexicalTextEditor } from '@innoviatech/lexical-text-editor';
import '@innoviatech/lexical-text-editor/style.css';

function App() {
  const [content, setContent] = useState('<p>Welcome to the editor!</p><ul><li>Feature 1</li><li>Feature 2</li></ul>');

  const handleSave = () => {
    console.log('Current content:', content);
  };

  return (
    <div>
      <LexicalTextEditor
        name="content-editor"
        value={content}
        onChange={setContent}
        placeholder="Write your content..."
      />
      <button onClick={handleSave}>Save Content</button>
    </div>
  );
}

export default App;
```


## Toolbar Features

- Text Formatting: Bold, Italic, Underline, Strikethrough  
- Headings: H1–H6  
- Lists: Bulleted and Numbered  
- Alignment: Left, Center, Right, Justify  
- Text Case: Uppercase, Lowercase, Capitalize  
- Colors: Text & background color picker  
- Media: Image upload, YouTube embedding, video node  
- Links: Insert and edit hyperlinks  
- Code: Inline code & code blocks  
- Quotes: Blockquote formatting  
- Undo/Redo, Clear formatting, Remove link

---

## Browser Support

- Chrome 90+  
- Firefox 88+  
- Safari 14+  
- Edge 90+

---

## Troubleshooting

- **Missing peer dependencies:** install required packages  
- **CSS not loading:** `import '@innoviatech/lexical-text-editor/style.css'`  
- **Icons not showing:** verify `react-icons` and `lucide-react`  
- **Toolbar not working:** ensure Radix UI peer deps installed

---

## Version Compatibility

- React 18+  
- Lexical 0.36.0+  
- TypeScript 5.0+

---

## License

MIT © Innoviatech

---

## Support

For issues and feature requests, open an issue on GitHub.

Built with ❤️ by Innoviatech
