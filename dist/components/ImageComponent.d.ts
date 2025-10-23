import { type NodeKey } from "lexical";
type ImageComponentProps = {
    src: string;
    altText: string;
    nodeKey: NodeKey;
    width?: number | "inherit";
    height?: number | "inherit";
    maxWidth: number;
};
export declare const ImageComponent: React.FC<ImageComponentProps>;
export {};
