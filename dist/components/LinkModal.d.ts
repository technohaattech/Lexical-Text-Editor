interface LinkEditorProps {
    linkUrl: string;
    setLinkUrl: React.Dispatch<React.SetStateAction<string>>;
    onConfirm: (url: string) => void;
    onCancel: () => void;
    removeLink: () => void;
}
export default function LinkModal({ linkUrl, setLinkUrl, onConfirm, onCancel, removeLink, }: LinkEditorProps): import("react/jsx-runtime").JSX.Element;
export {};
