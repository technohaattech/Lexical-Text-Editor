import { ImageComponent } from "../components/ImageComponent";
import {
  DecoratorNode,
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
  type NodeKey,
  $applyNodeReplacement,
} from "lexical";
import type { JSX } from "react";


export interface SerializedImageNode {
  type: "image";
  version: 1;
  src: string;
  altText: string;
  maxWidth: number;
  width?: number | "inherit";
  height?: number | "inherit";
}

export type ImageNodePayload = {
  src: string;
  altText: string;
  maxWidth?: number;
  width?: number | "inherit";
  height?: number | "inherit";
};


export const $createImageNode = (payload: ImageNodePayload) => {
  return $applyNodeReplacement(new ImageNode(payload));
};


const convertImageElement = (domNode: Node): DOMConversionOutput | null => {
  if (!(domNode instanceof HTMLImageElement)) return null;

  const { src, alt } = domNode;

  let width: number | "inherit" | undefined;
  let height: number | "inherit" | undefined;

  // Attributes
  if (domNode.width) width = domNode.width;
  if (domNode.height) height = domNode.height;

  // Inline styles fallback
  const style = domNode.style;

  if ((!width || width === 0) && style.width) {
    const parsed = parseInt(style.width, 10);
    if (!Number.isNaN(parsed)) width = parsed;
  }

  if ((!height || height === 0) && style.height) {
    const parsed = parseInt(style.height, 10);
    if (!Number.isNaN(parsed)) height = parsed;
  }

  const node = $createImageNode({
    src,
    altText: alt,
    width: width ?? "inherit",
    height: height ?? "inherit",
  });

  return { node };
};


export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width?: number | "inherit";
  __height?: number | "inherit";
  __maxWidth: number;

  constructor(
    {
      src = "",
      altText = "",
      maxWidth = 1080,
      width = "inherit",
      height = "inherit",
      key,
    }: ImageNodePayload & { key?: NodeKey } = {
        src: "",
        altText: "",
      }
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__width = width;
    this.__height = height;
  }

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode({
      src: node.__src,
      altText: node.__altText,
      width: node.__width,
      height: node.__height,
      maxWidth: node.__maxWidth,
      key: node.getKey(),
    });
  }

  createDOM(): HTMLElement {
    return document.createElement("span");
  }

  updateDOM(prevNode: ImageNode): boolean {
    return (
      prevNode.__width !== this.__width ||
      prevNode.__height !== this.__height
    );
  }


  exportDOM(): DOMExportOutput {
    const img = document.createElement("img");

    img.src = this.__src;
    img.alt = this.__altText;

    if (this.__width !== "inherit") {
      img.width = this.__width ?? 0;
    }

    if (this.__height !== "inherit") {
      img.height = this.__height ?? 0;
    }

    return { element: img };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: convertImageElement,
        priority: 1,
      }),
    };
  }

  exportJSON(): SerializedImageNode {
    return {
      type: "image",
      version: 1,
      src: this.__src,
      altText: this.__altText,
      maxWidth: this.__maxWidth,
      width: this.__width,
      height: this.__height,
    };
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    return new ImageNode({
      src: serializedNode.src,
      altText: serializedNode.altText,
      maxWidth: serializedNode.maxWidth,
      width: serializedNode.width,
      height: serializedNode.height,
    });
  }

  updateDimensions(width: number, height: number) {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }


  decorate(): JSX.Element {
    return (
      <ImageComponent
        src={this.__src}
        altText={this.__altText}
        nodeKey={this.getKey()}
        width={this.__width}
        height={this.__height}
        maxWidth={this.__maxWidth}
      />
    );
  }
}
