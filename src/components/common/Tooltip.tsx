import React, { useState, useRef, ReactNode } from "react";
import '../../styles/lexical-editor.css'
interface TooltipProps {
  content: ReactNode;
  direction?: "top" | "right" | "bottom" | "left";
  delay?: number;
  children: ReactNode;
}

const TooltipX: React.FC<TooltipProps> = ({ content, direction = "top", delay = 400, children }) => {
  const [active, setActive] = useState(false);
  const timeout = useRef<number | null>(null); // <-- browser setTimeout returns number

  const showTip = () => {
    timeout.current = window.setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setActive(false);
  };

  return (
    <div
      className="Lexical-Tooltip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className={`Lexical-Tooltip-Tip ${direction}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default TooltipX;
