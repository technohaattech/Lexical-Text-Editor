export default function ImagePlugin({ onImageUpload }: {
    onImageUpload?: (file: File) => Promise<string>;
}): import("react/jsx-runtime").JSX.Element;
