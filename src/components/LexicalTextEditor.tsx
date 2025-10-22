import { LexicalComposer } from "@lexical/react/LexicalComposer"
import React, { useMemo } from "react"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import type { EditorThemeClasses } from "lexical"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { ListItemNode, ListNode } from "@lexical/list"
import { ToolbarPlugin } from "../plugins/ToolbarPlugin"
import { LinkNode } from "@lexical/link"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import CustomOnChangePlugin from "../plugins/CustomOnChangePlugin"
import { ImageNode } from "../nodes/ImageNode"
import { YoutubeNode } from "../nodes/YoutubeNode"
import { VideoNode } from "../nodes/VideoNode"
import "../styles/lexical-editor.css"

export interface LexiTexProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  name: string
}

// ✅ Theme config stays same
const theme: EditorThemeClasses = {
  text: {
    bold: "font-bold",
    underline: "underline",
    italic: "italic",
    strikethrough: "line-through",
    underlineStrikethrough: "underline line-through",
    uppercase: "uppercase",
    lowercase: "lowercase",
    capitalize: "capitalize",
    code: "bg-gray-100 border border-gray-300 px-1 rounded text-sm font-mono text-black",
  },
  paragraph: "mb-2",
  list: {
    ul: "list-disc list-inside pl-6",
    ol: "list-decimal list-inside pl-6",
    listitem: "mb-1",
  },
  quote: "border-l-4 border-gray-400 pl-4 italic text-gray-800 bg-gray-50 py-2 rounded-r",
  link: "text-blue-600 underline hover:text-blue-800",
}
// ... your imports

export const LexicalTextEditor: React.FC<LexiTexProps> = React.memo(
  function LexicalTextEditor({ name, value, onChange, placeholder }) {

    const initialConfig = useMemo(
      () => ({
        namespace: name,
        theme: theme,
        onError: (error: Error) => {
          console.error("Lexical error:", error);
        },
        nodes: [
          HeadingNode,
          CodeHighlightNode,
          CodeNode,
          ListNode,
          ListItemNode,
          QuoteNode,
          LinkNode,
          ImageNode,
          YoutubeNode,
          VideoNode
        ],
      }) as any,
      [name]
    );

    return (
      <div className="lexical-text-editor border-[1px] rounded-lg w-full max-w-[900px] pb-2 scrollbar-thin">
        <LexicalComposer initialConfig={initialConfig}>
          <div className="px-2">
            <ToolbarPlugin value={value} />
          </div>
          <div className="relative">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="h-[400px] text-start w-full text-[14px] p-[8px] overflow-auto outline-0" />
              }
              placeholder={
                <div className="absolute text-[#999] top-[8px] left-[10px] text-[14px]">
                  {placeholder || "Some Text"}
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <CustomOnChangePlugin value={value} onChange={onChange} />
        </LexicalComposer>
      </div>
    )
  }
)