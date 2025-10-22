
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes } from "lexical";
import { $createImageNode } from "../nodes/ImageNode";
import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { IoImageOutline } from "react-icons/io5";

export default function ImagePlugin() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setURL] = useState("");
  const [altText, setAltText] = useState("");
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [editor] = useLexicalComposerContext();

  const onAddImage = () => {
    let src = "";
    if (url) src = url;
    if (file) src = URL.createObjectURL(file);

    editor.update(() => {
      const node = $createImageNode({ src, altText });
      $insertNodes([node]);
    });

    setFile(undefined);
    setAltText("")
    setURL("");
    setIsOpen(false);
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setFile(file);
          e.target.value = ""; // reset input
        }}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-md text-gray-700 hover:bg-gray-200"
          >
            <IoImageOutline />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="!text-lg text-gray-800">
              Add Image
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col items-center gap-4">
              <Input
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Alt text"
              />
              <Input
                value={url}
                onChange={(e) => setURL(e.target.value)}
                placeholder="Add Image by URL"
              />

              {/* Stylish OR divider */}
              <div className="flex items-center w-full text-gray-500 text-sm">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="flex flex-col gap-2 w-fit">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100"
                  onClick={() => inputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" /> Upload Image
                </Button>
                {file && <span className="text-sm text-gray-600">{file.name}</span>}
              </div>
            </div>

          </div>

          <DialogFooter>
            <Button
              onClick={onAddImage}
              disabled={!url && !file}
              className="!bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Add Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
