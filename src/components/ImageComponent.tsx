import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey, type NodeKey } from "lexical";
import { useRef } from "react";

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

  const dragSizeRef = useRef<{ width: number; height: number, ratio: number } | null>(null);

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

    const img = wrapperRef.current?.querySelector("img");
    if (!img) return;

    const renderedWidth = img.getBoundingClientRect().width;
    const naturalRatio = img.naturalHeight / img.naturalWidth;
    const renderedHeight = renderedWidth * naturalRatio;

    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: renderedWidth,
      height: renderedHeight,
    };

    dragSizeRef.current = {
      width: renderedWidth,
      height: renderedHeight,
      ratio: naturalRatio,
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };



  const onMouseMove = (e: MouseEvent) => {
    if (!startPos.current || !dragSizeRef.current) return;

    const deltaX = e.clientX - startPos.current.x;
    const newWidth = Math.min(
      maxWidth,
      Math.max(50, startPos.current.width + deltaX)
    );

    const newHeight = newWidth * dragSizeRef.current.ratio;

    dragSizeRef.current.width = newWidth;
    dragSizeRef.current.height = newHeight;

    const img = wrapperRef.current?.querySelector("img");
    if (img) {
      img.style.width = newWidth + "px";
      img.style.height = newHeight + "px";
    }
  };


  const onMouseUp = () => {
    if (!dragSizeRef.current) return;

    const { width: finalWidth, height: finalHeight } = dragSizeRef.current;

    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (node && typeof (node as any).updateDimensions === "function") {
        (node as any).updateDimensions(finalWidth, finalHeight);
      }
    });

    dragSizeRef.current = null;
    startPos.current = null;

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
        width={width === "inherit" ? undefined : width}
        height={height === "inherit" ? undefined : height}
        style={{
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
