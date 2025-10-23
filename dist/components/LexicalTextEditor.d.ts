import React from "react";
import "../styles/lexical-editor.css";
export interface LexiTexProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    name: string;
}
export declare const LexicalTextEditor: React.FC<LexiTexProps>;
