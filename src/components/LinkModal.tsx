// FloatingLinkEditor.tsx
import { useEffect, useRef, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Check, Pencil } from "lucide-react";
import { cn } from "../lib/utils";
import { TiDeleteOutline } from "react-icons/ti";

interface LinkEditorProps {
  linkUrl: string;
  setLinkUrl: React.Dispatch<React.SetStateAction<string>>;
  onConfirm: (url: string) => void;
  onCancel: () => void;
  removeLink: () => void;
}

export default function LinkModal({
  linkUrl,
  setLinkUrl,
  onConfirm,
  onCancel,
  removeLink,
}: LinkEditorProps) {
  const [isEditMode, setEditMode] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);


  useEffect(() => {
    if (linkUrl === "https://") setEditMode(true);
  }, [linkUrl]);

  useEffect(() => {
    if (isEditMode) inputRef.current?.focus();
  }, [isEditMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editorRef.current &&
        !editorRef.current.contains(event.target as Node)
      ) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div
      ref={editorRef}
      className={cn(
        "absolute z-[9999] bottom-[-50px] sm:bottom-[-60px] right-[20px]",
        "bg-white shadow-lg rounded-xl px-1.5 py-1 sm:px-3 sm:py-2 flex items-center space-x-2",
        "border border-gray-200"
      )}

    >
      <div className="flex-1 min-w-[200px]">
        {isEditMode ? (
          <Input
            ref={inputRef}
            className="h-8 text-sm"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onConfirm(linkUrl);
                setEditMode(false);
              } else if (e.key === "Escape") {
                e.preventDefault();
                setEditMode(false);
                onCancel();
              }
            }}
          />
        ) : (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm underline truncate block max-w-full text-start"
          >
            {linkUrl}
          </a>
        )}
      </div>

      <div>
        <Button
          variant="ghost"
          size="icon"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            if (isEditMode) {
              onConfirm(linkUrl);
              setEditMode(false);
            } else {
              setEditMode(true);
            }
          }}
          className="h-8 w-8"
        >
          {isEditMode ? (
            <Check className="h-4 w-4" />
          ) : (
            <Pencil className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onMouseDown={(e) => e.preventDefault()}
          onClick={removeLink}
          className="h-8 w-8"
        >
          <TiDeleteOutline className="h-4 w-4" />
        </Button>
      </div>

    </div>
  );
}

