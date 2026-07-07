import { DecoratorNode, type DOMConversionMap, type DOMExportOutput, type NodeKey } from "lexical";
import type { JSX } from "react";
export interface SerializedImageNode {
    type: "image";
    version: 1;
    src: string;
    altText: string;
    maxWidth: number;
    width?: number | "inherit";
    height?: number | "inherit";
    caption?: string;
}
export type ImageNodePayload = {
    src: string;
    altText: string;
    maxWidth?: number;
    width?: number | "inherit";
    height?: number | "inherit";
    caption?: string;
};
export declare const $createImageNode: (payload: ImageNodePayload) => ImageNode;
export declare class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __altText: string;
    __width?: number | "inherit";
    __height?: number | "inherit";
    __maxWidth: number;
    __caption: string;
    constructor({ src, altText, maxWidth, width, height, caption, key, }?: ImageNodePayload & {
        key?: NodeKey;
    });
    static getType(): string;
    static clone(node: ImageNode): ImageNode;
    createDOM(): HTMLElement;
    updateDOM(prevNode: ImageNode): boolean;
    exportDOM(): DOMExportOutput;
    static importDOM(): DOMConversionMap | null;
    exportJSON(): SerializedImageNode;
    static importJSON(serializedNode: SerializedImageNode): ImageNode;
    updateDimensions(width: number, height: number): void;
    setCaption(caption: string): void;
    decorate(): JSX.Element;
}
