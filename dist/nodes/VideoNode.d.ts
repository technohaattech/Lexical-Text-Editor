import { DecoratorNode, type DOMConversionMap, type DOMExportOutput, type NodeKey, type SerializedLexicalNode } from "lexical";
import type { JSX } from "react";
export interface SerializedVideoNode extends SerializedLexicalNode {
    id: string;
    provider: "youtube" | "drive";
    type: "video";
    version: 1;
}
export declare const $createVideoNode: ({ id, provider, }: {
    id: string;
    provider: "youtube" | "drive";
}) => VideoNode;
export declare class VideoNode extends DecoratorNode<JSX.Element> {
    __id: string;
    __provider: "youtube" | "drive";
    constructor({ id, provider, key, }: {
        id: string;
        provider: "youtube" | "drive";
        key?: NodeKey;
    });
    static getType(): string;
    static clone(node: VideoNode): VideoNode;
    static importJSON(serializedNode: SerializedVideoNode): VideoNode;
    exportJSON(): SerializedVideoNode;
    updateDOM(): boolean;
    decorate(): JSX.Element;
    createDOM(): HTMLElement;
    exportDOM(): DOMExportOutput;
    static importDOM(): DOMConversionMap | null;
}
