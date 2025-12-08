import React, { useEffect, useRef, cloneElement } from "react";

interface PopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Popover({ open, onOpenChange, children }: PopoverProps) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (triggerRef.current?.contains(e.target as Node)) {
        alert("clicked in trigger button")
      }
      else {
        alert("no click in trigger button")
      }
      // if (
      //   !triggerRef.current?.contains(e.target as Node) &&
      //   !contentRef.current?.contains(e.target as Node)
      // ) {
      //   onOpenChange(false);
      // }
      // if (
      //   !triggerRef.current?.contains(e.target as Node) &&
      //   !contentRef.current?.contains(e.target as Node)
      // ) {
      //   onOpenChange(false);
      // }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onOpenChange]);

  return (
    <div className="popover-root">
      {/*
        Pass refs to trigger/content via props
        so child components can attach them
      */}
      {React.Children.map(children, (child) => {
        if (!child || typeof child !== "object") return child;

        if ((child as any).type?.name === "PopoverTrigger") {
          return cloneElement(child as any, { triggerRef });
        }

        if ((child as any).type?.name === "PopoverContent") {
          return cloneElement(child as any, { contentRef });
        }

        return child;
      })}
    </div>
  );
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

export function PopoverTrigger({ children, triggerRef }: PopoverTriggerProps) {
  return (
    <div className="popover-trigger" ref={triggerRef}>
      {children}
    </div>
  );
}

interface PopoverContentProps {
  open: boolean;
  align?: "start" | "center" | "end";
  onClose: () => void;
  children: React.ReactNode;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

export function PopoverContent({
  open,
  align = "start",
  onClose,
  children,
  contentRef,
}: PopoverContentProps) {
  if (!open) return null;

  return (
    <div
      ref={contentRef}
      className={`popover-content align-${align}`}
    >
      {children}
    </div>
  );
}
