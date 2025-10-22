import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey, type NodeKey } from "lexical";
import { useRef, useState } from "react";

type ImageComponentProps = {
  src: string;
  altText: string;
  nodeKey: NodeKey;
  width?: number | "inherit";
  height?: number | "inherit";
  maxWidth: number;
};

export const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  altText,
  nodeKey,
  width,
  height,
  maxWidth,
}) => {
  const [editor] = useLexicalComposerContext();
  const [currentSize, setCurrentSize] = useState({
    width: typeof width === "number" ? width : maxWidth,
    height: typeof height === "number" ? height : "auto",
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const startPos = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: currentSize.width as number,
      height: wrapperRef.current?.offsetHeight ?? 0,
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!startPos.current) return;
    const deltaX = e.clientX - startPos.current.x;
    const newWidth = Math.min(maxWidth, Math.max(50, startPos.current.width + deltaX));
    const newHeight =
      (newWidth / startPos.current.width) * startPos.current.height || "auto";
    setCurrentSize({ width: newWidth, height: newHeight });
  };

  const onMouseUp = () => {
    if (!startPos.current) return;

    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      // Use the node directly without importing ImageNode
      if (node && typeof (node as any).updateDimensions === 'function') {
        (node as any).updateDimensions(currentSize.width as number, currentSize.height as number);
      }
    });

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        display: "inline-block",
        position: "relative",
        maxWidth,
      }}
    >
      <img
        src={src}
        alt={altText}
        style={{
          width: currentSize.width,
          height: currentSize.height,
          maxWidth: "100%",
          display: "block",
        }}
      />
      <div
        onMouseDown={onMouseDown}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 14,
          height: 14,
          background: "white",
          border: "1px solid #999",
          cursor: "nwse-resize",
          borderRadius: 2,
        }}
      />
    </div>
  );
};