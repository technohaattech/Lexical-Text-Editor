import {
  DecoratorNode,
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
  type NodeKey,
  type SerializedLexicalNode,
} from "lexical";
import type { JSX } from "react";

export interface SerializedVideoNode extends SerializedLexicalNode {
  id: string;
  provider: "youtube" | "drive";
  type: "video";
  version: 1;
}

export const $createVideoNode = ({
  id,
  provider,
}: {
  id: string;
  provider: "youtube" | "drive";
}) => {
  return new VideoNode({ id, provider });
};

const ID_ATTR = "data-lexical-video";
const PROVIDER_ATTR = "data-provider";
const HEIGHT = "315px";
const WIDTH = "560px";

const getEmbedLink = (id: string, provider: "youtube" | "drive") => {
  if (provider === "drive") {
    return `https://drive.google.com/file/d/${id}/preview`;
  }
  return `https://www.youtube-nocookie.com/embed/${id}`;
};

const convertVideoElement = (domNode: HTMLElement): DOMConversionOutput | null => {
  const id = domNode?.getAttribute(ID_ATTR);
  const provider = (domNode?.getAttribute(PROVIDER_ATTR) as
    | "youtube"
    | "drive") ?? "youtube";
  if (!id) return null;
  const node = $createVideoNode({ id, provider });
  return { node };
};

export class VideoNode extends DecoratorNode<JSX.Element> {
  __id: string;
  __provider: "youtube" | "drive";

  constructor({
    id,
    provider,
    key,
  }: {
    id: string;
    provider: "youtube" | "drive";
    key?: NodeKey;
  }) {
    super(key);
    this.__id = id;
    this.__provider = provider;
  }

  static getType(): string {
    return "video";
  }

  static clone(node: VideoNode): VideoNode {
    return new VideoNode({
      id: node.__id,
      provider: node.__provider,
      key: node.getKey(),
    });
  }

  static importJSON(serializedNode: SerializedVideoNode): VideoNode {
    return $createVideoNode({
      id: serializedNode.id,
      provider: serializedNode.provider,
    });
  }

  exportJSON(): SerializedVideoNode {
    return {
      id: this.__id,
      provider: this.__provider,
      type: "video",
      version: 1,
    };
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <iframe
        height={HEIGHT}
        width={WIDTH}
        src={getEmbedLink(this.__id, this.__provider)}
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
    iframe.setAttribute(PROVIDER_ATTR, this.__provider);
    iframe.setAttribute("height", HEIGHT);
    iframe.setAttribute("width", WIDTH);
    iframe.setAttribute("src", getEmbedLink(this.__id, this.__provider));
    return { element: iframe };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      iframe: () => ({
        conversion: convertVideoElement,
        priority: 0,
      }),
    };
  }
}
