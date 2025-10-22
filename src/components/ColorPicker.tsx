
import { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";
import { Button } from "./ui/button";
import { createPortal } from "react-dom";
interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  icon: React.ReactElement;
}

export default function ColorPicker({ color, onChange, icon }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent popover from stealing text selection focus
  const preventFocus = (e: React.MouseEvent) => e.preventDefault();

  return (
    <div className="relative inline-block">
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        className="rounded-md text-gray-700 hover:bg-gray-200"
        aria-label="Change Color"
        onClick={() => setOpen((prev) => !prev)}
      >
        {icon}
      </Button>

      {open &&
        createPortal(
          <div
            ref={popoverRef}
            className={`
                absolute z-50 p-2 bg-transparent rounded-md select-none
                transition-all duration-200
                origin-top-left w-fit
                ${open ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            style={{
              top: triggerRef.current?.getBoundingClientRect().bottom,
              left: triggerRef.current?.getBoundingClientRect().left,
              position: "absolute",
            }}
            onMouseDown={preventFocus}
          >
            <SketchPicker
              color={color}
              onChangeComplete={(c: any) => {
                onChange(c.hex);
                // setOpen(false);
              }}
            />
          </div>,
          document.body
        )
      }
    </div>
  );
}
