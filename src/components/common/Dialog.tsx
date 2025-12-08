import { ReactNode, useEffect, useRef } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  forPreview?: boolean;
}

export default function RawDialog({ open, onClose, forPreview = false, children }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="lexical-text-editor-dialog lte-dialog-overlay">
      <div ref={dialogRef} className={`lte-dialog ${forPreview ? 'preview' : ''}`}>
        <button className="lte-dialog-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
