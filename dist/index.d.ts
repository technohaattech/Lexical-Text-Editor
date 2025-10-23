import React from 'react';

interface LexiTexProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    name: string;
}
declare const LexicalTextEditor: React.FC<LexiTexProps>;

export { LexicalTextEditor };
export type { LexiTexProps as LexicalTextEditorProps };
