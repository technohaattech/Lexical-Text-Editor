import { ReactNode } from "react";
interface Props {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    forPreview?: boolean;
}
export default function RawDialog({ open, onClose, forPreview, children }: Props): import("react/jsx-runtime").JSX.Element;
export {};
