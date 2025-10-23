interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    icon: React.ReactElement;
}
export default function ColorPicker({ color, onChange, icon }: ColorPickerProps): import("react/jsx-runtime").JSX.Element;
export {};
