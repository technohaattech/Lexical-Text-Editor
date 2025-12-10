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

export const $createImageNode = (payload: {
  altText: string;
  height?: number;
  maxWidth?: number;
  src: string;
  width?: number;
}) => {
  return $applyNodeReplacement(new ImageNode(payload));
};

// const convertImageElement = (domNode: Node): DOMConversionOutput | null => {
//   if (domNode instanceof HTMLImageElement) {
//     const { src, alt } = domNode;
//     const node = $createImageNode({ src, altText: alt });
//     return { node };
//   }
//   return null;
// };

const convertImageElement = (domNode: Node): DOMConversionOutput | null => {
  if (!(domNode instanceof HTMLImageElement)) return null;

  const { src, alt } = domNode;

  // Try reading width/height from attributes
  let width: number | "inherit" | undefined = undefined;
  let height: number | "inherit" | undefined = undefined;

  if (domNode.width) width = domNode.width;
  if (domNode.height) height = domNode.height;

  // Also check inline styles if attributes are missing
  const style = domNode.style;
  if ((!width || width === 0) && style.width) {
    const parsed = parseInt(style.width);
    if (!isNaN(parsed)) width = parsed;
  }
  if ((!height || height === 0) && style.height) {
    const parsed = parseInt(style.height);
    if (!isNaN(parsed)) height = parsed;
  }

  const node = $createImageNode({
    src,
    altText: alt,
    width,
    height,
  });

  return { node };
};

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __height?: "inherit" | number;
  __width?: "inherit" | number;
  __maxWidth: number;

  constructor({
    src = "",
    altText = "",
    maxWidth = 1080,
    width,
    height,
    key,
  }: {
    src?: string;
    altText?: string;
    maxWidth?: number;
    width?: "inherit" | number;
    height?: "inherit" | number;
    key?: NodeKey;
  } = {}) {
    super(key);
    this.__altText = altText;
    this.__src = src;
    this.__maxWidth = maxWidth;
    this.__height = height;
    this.__width = width;
  }

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode({
      altText: node.__altText,
      src: node.__src,
      height: node.__height,
      width: node.__width,
      maxWidth: node.__maxWidth,
      key: node.getKey(),
    });
  }

  createDOM(): HTMLElement {
    return document.createElement("span");
  }

  exportDOM(): DOMExportOutput {
    const image = document.createElement("img");
    image.setAttribute("src", this.__src);
    image.setAttribute("alt", this.__altText);

    if (this.__width && this.__width !== "inherit") {
      image.setAttribute("width", String(this.__width));
    }
    if (this.__height && this.__height !== "inherit") {
      image.setAttribute("height", String(this.__height));
    }



    return { element: image };
  }






  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({ conversion: convertImageElement, priority: 1 }),
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
  updateDOM(prevNode: ImageNode): boolean {
    return (
      prevNode.__width !== this.__width ||
      prevNode.__height !== this.__height
    );
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


