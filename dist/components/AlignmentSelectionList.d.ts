import { RichTextAction } from "../constants/index";
interface Props {
    onAction: (id: RichTextAction) => void;
    alignmentSelectionMap: {
        [id: string]: boolean;
    };
}
export declare function AlignmentSelectionList({ onAction, alignmentSelectionMap }: Props): import("react/jsx-runtime").JSX.Element;
export {};
