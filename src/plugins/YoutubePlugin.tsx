"use client";

import { useState } from "react";
import { Youtube } from "lucide-react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes } from "lexical";
import { $createYoutubeNode } from "../nodes/YoutubeNode";
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

export default function YoutubePlugin() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setURL] = useState("");

  const [editor] = useLexicalComposerContext();

  const onEmbed = () => {
    if (!url) return;
    const match =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);
    const id = match && match?.[2]?.length === 11 ? match?.[2] : null;
    if (!id) return;

    editor.update(() => {
      const node = $createYoutubeNode({ id });
      $insertNodes([node]);
    });

    setURL("");
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-md text-gray-700 hover:bg-gray-200"
          >
            <Youtube className="h-4 w-4 text-red-600" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="!text-xl">
              Embed YouTube Video

            </DialogTitle>
          </DialogHeader>

          <div className="py-2">
            <Input
              value={url}
              onChange={(e) => setURL(e.target.value)}
              placeholder="Add YouTube URL"
            />
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
