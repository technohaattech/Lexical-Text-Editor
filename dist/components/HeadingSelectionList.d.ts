import { type HeadingTagType } from '@lexical/rich-text';
interface Props {
    updateHeading: (heading: HeadingTagType | "normal") => void;
    headingSelectionMap: {
        [id: string]: boolean;
    };
}
export declare function HeadingSelectionList({ updateHeading, headingSelectionMap }: Props): import("react/jsx-runtime").JSX.Element;
export {};
