import React from "react";
import "../styles/lexical-editor.css";
export interface LexiTexProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    name: string;
    height?: string | null | undefined;
    width?: string | null | undefined;
}
export declare const LexicalTextEditor: React.FC<LexiTexProps>;
