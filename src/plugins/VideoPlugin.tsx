import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes } from "lexical";
import { $createVideoNode } from "../nodes/VideoNode";
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

export default function VideoPlugin() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [url, setURL] = useState("");
  const [editor] = useLexicalComposerContext();

  const onEmbed = () => {
    if (!url) return;


    let provider: "youtube" | "drive" | null = null;
    let id: string | null = null;

    // Detect YouTube
    const ytMatch =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);
    if (ytMatch && ytMatch[2]?.length === 11) {
      provider = "youtube";
      id = ytMatch[2];
    }

    // Detect Google Drive
    const driveMatch = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\//.exec(url);
    if (driveMatch && driveMatch[1]) {
      provider = "drive";
      id = driveMatch[1];
    }

    if (!id || !provider) {
      setShowMessage(true)
      return;
    }

    editor.update(() => {
      const node = $createVideoNode({ id, provider });
      $insertNodes([node]);
    });

    setURL("");
    setShowMessage(false)
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setURL("");
      setShowMessage(false)
    }
  }, [isOpen]);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-md text-gray-700 hover:bg-gray-200"
          >
            <FaYoutube />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="!text-lg text-gray-800">Embed Video</DialogTitle>
          </DialogHeader>

          <div className="py-2">
            <Input
              value={url}
              onChange={(e) => setURL(e.target.value)}
              placeholder="Add YouTube or Google Drive URL"
            />
            {showMessage && <p className="mt-1.5 text-red-800/80 text-[0.8rem]">It's not a valid youtube or google drive URL</p>}
          </div>



          <DialogFooter>
            <Button
              onClick={onEmbed}
              disabled={!url}
              className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Embed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

