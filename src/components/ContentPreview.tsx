
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { VscPreview } from "react-icons/vsc";

type HtmlPreviewProps = {
  value: string;
};

export function HtmlPreview({ value }: HtmlPreviewProps) {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}

type ContentPreviewDialogProps = {
  value: string;
  triggerLabel?: string;
};

export default function ContentPreviewDialog({ value, triggerLabel = "Preview" }: ContentPreviewDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={isOpen ? "toolbarActive" : "toolbar"}
          size="icon" className="size-8 w-fit p-2 select-none border-[1px] border-gray-100"
        >{<VscPreview />} {triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] md:w-[80vw] lg:w-[70vw] max-w-4xl max-h-[90vh] sm:max-w-[1000px] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="!text-xl">Content Preview</DialogTitle>
        </DialogHeader>
        <div className=" p-[2vw] rounded-lg border min-h-[400px] w-full text-start bg-white">
          <div className="py-1 border-b-2 mb-4 font-medium">CONTENT</div>
          <HtmlPreview value={value} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
