import React from "react";
interface PopoverProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}
export declare function Popover({ open, onOpenChange, children }: PopoverProps): import("react/jsx-runtime").JSX.Element;
interface PopoverTriggerProps {
    children: React.ReactNode;
    triggerRef: React.RefObject<HTMLDivElement | null>;
}
export declare function PopoverTrigger({ children, triggerRef }: PopoverTriggerProps): React.FunctionComponentElement<{
    ref: React.RefObject<HTMLDivElement>;
}>;
interface PopoverContentProps {
    open: boolean;
    align?: "start" | "center" | "end";
    onClose: () => void;
    children: React.ReactNode;
    contentRef: React.RefObject<HTMLDivElement | null>;
}
export declare function PopoverContent({ open, align, onClose, children, contentRef, }: PopoverContentProps): import("react/jsx-runtime").JSX.Element;
export {};
