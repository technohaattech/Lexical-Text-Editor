# @innoviatech/lexical-text-editor v2.0

A powerful, customizable rich text editor component built with Lexical and React. Features a modern toolbar, image support, video embedding, and comprehensive text formatting options.

## What's New in v2.0

- **No Tailwind CSS Required** - Now uses raw CSS for styling 
- **Reduced Dependencies** - Fewer peer dependencies to install
- **Simpler Setup** - Import CSS and start using immediately  
- **Lightweight** - Smaller bundle size
- **Better Compatibility** - Works with any React project setup 




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



## Installation

```bash
npm install @innoviatech/lexical-text-editor
```

### No Peer Dependencies Required! 🎉

Version 2.0 eliminates the need for Tailwind CSS and multiple UI libraries. Just install the package and start using it!


## Quick Start

```tsx
import React, { useState } from 'react';
import { LexicalTextEditor } from '@innoviatech/lexical-text-editor';
import '@innoviatech/lexical-text-editor/style.css';

function App() {
  const [content, setContent] = useState('');

  return (
    <>
      <LexicalTextEditor
        name="my-editor"
        value={content}
        onChange={setContent}
        placeholder="Start typing your content here..."
      />
    </>
  );
}

export default App;
```



## Props

| Prop        | Type                                | Required | Default       | Description                                 |
|-------------|-------------------------------------|----------|---------------|---------------------------------------------|
| `name`      | `string`                            | Yes      | —             | Unique identifier for the editor instance   |
| `value`     | `string`                            | Yes      | —             | Current editor content (HTML string)        |
| `onChange`  | `(value: string) => void`           | Yes      | —             | Callback fired when content changes         |
| `placeholder`| `string`                           | No       | `"Some Text"` | Placeholder text when editor is empty       |
| `maxWidth`     | `string`                            | No      | "1090px"       | Adjust the maximum width accoding to the need ('80%' or '800px')       |
| `height`     | `string`                            | No      | "500px"       | Adjust the height accoding to the need ('50vh' or '500px')       |



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
    <form onSubmit={handleSave}>
      <LexicalTextEditor
        name="content-editor"
        value={content}
        onChange={setContent}
        placeholder="Write your content..."
        maxWidth="600px"
        height="400px"
      />
      <button type="submit">Save Content</button>
    </form>
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


## Browser Support

- Chrome 90+  
- Firefox 88+  
- Safari 14+  
- Edge 90+


## Troubleshooting


- **CSS not loading:** `import '@innoviatech/lexical-text-editor/style.css'`  
- **Editor not rendering:** Check that React 18+ or next.js 14+ is installed 
- **TypeScript errors:** Update to TypeScript 5.0+
- **Missing styles:** Verify the CSS import path is correct



## Version Compatibility

- React 18+  
- Next.js 14+  
- Lexical 0.36.0+  
- TypeScript 5.0+


## License

MIT © Innoviatech

## Support & Community

### Get Help

We're here to help you succeed with our editor! Here are the best ways to get support:

### Report an Issue
Found a bug or experiencing problems?  
👉 [Open a GitHub Issue](https://github.com/technohaattech/Lexical-Text-Editor/issues)

**Please include:**
- 📱 **Environment** (Browser, OS, React/Next.js version)
- 🔍 **Steps to reproduce**
- 🎯 **Expected vs Actual behavior**
- 📋 **Relevant code snippets**
- 🖼️ **Screenshots** (if applicable)

### Request a Feature
Have an idea to make the editor even better?  
✨ [Submit a Feature Request](https://github.com/technohaattech/Lexical-Text-Editor/issues/new?template=feature_request.md)



### Documentation
[Getting Started Guide](https://github.com/technohaattech/Lexical-Text-Editor)

### Video Tutorials
- [Installation & Setup](https://youtube.com/playlist?list=...) *(Coming Soon!)*
- [Advanced Features](https://youtube.com/playlist?list=...) *(Coming Soon!)*
- [Integration Examples](https://youtube.com/playlist?list=...) *(Coming Soon!)*

### Community
Join our growing community of developers:

| Platform | Link | Best For |
|----------|------|----------|
| **GitHub Discussions** | [Join Discussion](https://github.com/technohaattech/Lexical-Text-Editor/discussions) | Questions & ideas |


### Contribute

Love our editor? Here's how you can contribute:

### Ways to Contribute
- 📝 **Improve Documentation** – Help others learn
- 🔧 **Fix Bugs** – Submit pull requests
- ✨ **Add Features** – Extend functionality
- 🧪 **Write Tests** – Improve reliability
- 🌍 **Translate** – Help with localization
- 📣 **Spread the Word** – Star the repo, share with others


###  About Innoviatech


**Our Mission**

At Innoviatech, we believe that creating great digital experiences should be accessible to every developer. We build tools that empower teams to focus on what matters most.


**Built with Passion**

> "Great tools shouldn't get in the way of great ideas. That's why we build editors that feel like an extension of your creativity."



**Star Us on GitHub!**

If you find this project helpful, please consider giving it a star on GitHub. It helps us reach more developers like you!

[![Star on GitHub](https://img.shields.io/github/stars/technohaattech/Lexical-Text-Editor?style=social)](https://github.com/technohaattech/Lexical-Text-Editor)

---

*Made with ❤️ by the Innoviatech team*
