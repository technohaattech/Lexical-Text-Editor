import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes } from "lexical";
import { $createImageNode } from "../nodes/ImageNode";
import { useRef, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import RawDialog from "../components/common/Dialog";
import { LuUpload } from "react-icons/lu";

export default function ImagePlugin() {
  const [editor] = useLexicalComposerContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [url, setURL] = useState("");
  const [altText, setAltText] = useState("");
  const [file, setFile] = useState<File>();

  const addImage = () => {
    let src = url;
    if (file) src = URL.createObjectURL(file);

    editor.update(() => {
      const node = $createImageNode({ src, altText });
      $insertNodes([node]);
    });

    setFile(undefined);
    setAltText("");
    setURL("");
    setIsOpen(false);
  };

  return (
    <div className="lexical-text-editor-dialog">
      {/* hidden file input */}
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        className="lte-hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) setFile(f);
          e.target.value = "";
        }}
      />

      {/* Open dialog button */}
      <button type="button"
        className={`size-8 lexical-btn ${isOpen ? "toolbarActive" : "toolbar"} icon`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <IoImageOutline size={18} />
      </button>



      {/* Dialog */}
      <RawDialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="lte-dialog-header">Add Image</div>

        <div className="lte-dialog-body">
          <input
            className="lte-input"
            placeholder="Alt text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />

          <input
            className="lte-input"
            placeholder="Add image by URL"
            value={url}
            onChange={(e) => setURL(e.target.value)}
          />

          <div className="lte-divider">
            <span>or</span>
          </div>

          {/* <button type="button" 
            className="lte-outline-btn"
            onClick={() => inputRef.current?.click()}
          >
            
            Upload Image
          </button> */}

          <button type="button"
            className={`lexical-btn heading-trigger toolbar-active`}
            onClick={() => inputRef.current?.click()}
            style={{
              width: 'fit-content',
              margin: '0 auto'
            }}
          >
            <LuUpload size={20} />
            <span>Upload Image</span>
          </button>

          {file && (
            <div className="lte-file-name">{file.name}</div>
          )}
        </div>

        <div className="lte-dialog-footer">
          <button type="button"
            className="lte-primary-btn"
            disabled={!url && !file}
            onClick={addImage}
          >
            Add Image
          </button>
        </div>
      </RawDialog>
    </div>
  );
}
