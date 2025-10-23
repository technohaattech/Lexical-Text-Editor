import { RichTextAction } from "../constants/index";
interface Props {
    onAction: (id: RichTextAction) => void;
    selectionMap: {
        [id: string]: boolean;
    };
}
export declare function DropdownList({ onAction, selectionMap }: Props): import("react/jsx-runtime").JSX.Element;
export {};
