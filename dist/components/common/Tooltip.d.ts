import React, { ReactNode } from "react";
import '../../styles/lexical-editor.css';
interface TooltipProps {
    content: ReactNode;
    direction?: "top" | "right" | "bottom" | "left";
    delay?: number;
    children: ReactNode;
}
declare const TooltipX: React.FC<TooltipProps>;
export default TooltipX;
