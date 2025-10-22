import {
  DecoratorNode,
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
  type NodeKey,
  type SerializedLexicalNode,
} from "lexical";
import type { JSX } from "react";

export interface SerializedYoutubeNode extends SerializedLexicalNode {
  id: string;
  type: "youtube";
  version: 1;
}

export const $createYoutubeNode = ({ id }: { id: string }) => {
  return new YoutubeNode({ id });
};

const ID_ATTR = "data-lexical-youtube";
const HEIGHT = "315px";
const WIDTH = "560px";
const getYoutubeLink = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}`;

const convertYoutubeElement = (
  domNode: HTMLElement
): DOMConversionOutput | null => {
  const id = domNode?.getAttribute(ID_ATTR);
  if (!id) return null;
  const node = $createYoutubeNode({ id });
  return { node };
};

export class YoutubeNode extends DecoratorNode<JSX.Element> {
  __id: string;

  constructor({ id, key }: { id: string; key?: NodeKey }) {
    super(key);
    this.__id = id;
  }

  static getType(): string {
    return "youtube";
  }

  static clone(node: YoutubeNode): YoutubeNode {
    return new YoutubeNode({
      id: node.__id,
      key: node.getKey(),
    });
  }

  // Correctly typed importJSON
  static importJSON(serializedNode: SerializedYoutubeNode): YoutubeNode {
    return $createYoutubeNode({ id: serializedNode.id });
  }

  exportJSON(): SerializedYoutubeNode {
    return {
      id: this.__id,
      type: "youtube",
      version: 1,
    };
  }

  decorate(): JSX.Element {
    return (
      <iframe
        height={HEIGHT}
        width={WIDTH}
        src={getYoutubeLink(this.__id)}
        frameBorder="0"
        allowFullScreen
      />
    );
  }

  createDOM(): HTMLElement {
    return document.createElement("div");
  }

  exportDOM(): DOMExportOutput {
    const iframe = document.createElement("iframe");
    iframe.setAttribute(ID_ATTR, this.__id);
    iframe.setAttribute("height", HEIGHT);
    iframe.setAttribute("width", WIDTH);
    iframe.setAttribute("src", getYoutubeLink(this.__id));
    return { element: iframe };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      iframe: () => ({
        conversion: convertYoutubeElement,
        priority: 0,
      }),
    };
  }
}
