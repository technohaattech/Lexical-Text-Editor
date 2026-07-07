import React from 'react';

interface LexiTexProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    name: string;
    height?: string | null | undefined;
    maxWidth?: string | null | undefined;
    onImageUpload?: (file: File) => Promise<string>;
}
declare const LexicalTextEditor: React.FC<LexiTexProps>;

export { LexicalTextEditor };
export type { LexiTexProps as LexicalTextEditorProps };
