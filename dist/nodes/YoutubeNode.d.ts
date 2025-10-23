import { DecoratorNode, type DOMConversionMap, type DOMExportOutput, type NodeKey, type SerializedLexicalNode } from "lexical";
import type { JSX } from "react";
export interface SerializedYoutubeNode extends SerializedLexicalNode {
    id: string;
    type: "youtube";
    version: 1;
}
export declare const $createYoutubeNode: ({ id }: {
    id: string;
}) => YoutubeNode;
export declare class YoutubeNode extends DecoratorNode<JSX.Element> {
    __id: string;
    constructor({ id, key }: {
        id: string;
        key?: NodeKey;
    });
    static getType(): string;
    static clone(node: YoutubeNode): YoutubeNode;
    static importJSON(serializedNode: SerializedYoutubeNode): YoutubeNode;
    exportJSON(): SerializedYoutubeNode;
    decorate(): JSX.Element;
    createDOM(): HTMLElement;
    exportDOM(): DOMExportOutput;
    static importDOM(): DOMConversionMap | null;
}
