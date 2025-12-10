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
}
export declare const $createImageNode: (payload: {
    altText: string;
    height?: number;
    maxWidth?: number;
    src: string;
    width?: number;
}) => ImageNode;
export declare class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __altText: string;
    __height?: "inherit" | number;
    __width?: "inherit" | number;
    __maxWidth: number;
    constructor({ src, altText, maxWidth, width, height, key, }?: {
        src?: string;
        altText?: string;
        maxWidth?: number;
        width?: "inherit" | number;
        height?: "inherit" | number;
        key?: NodeKey;
    });
    static getType(): string;
    static clone(node: ImageNode): ImageNode;
    createDOM(): HTMLElement;
    exportDOM(): DOMExportOutput;
    static importDOM(): DOMConversionMap | null;
    exportJSON(): SerializedImageNode;
    static importJSON(serializedNode: SerializedImageNode): ImageNode;
    updateDimensions(width: number, height: number): void;
    updateDOM(prevNode: ImageNode): boolean;
    decorate(): JSX.Element;
}
