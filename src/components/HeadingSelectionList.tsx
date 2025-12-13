import { HEADINGS } from "../constants/index";
import { type HeadingTagType } from "@lexical/rich-text";
import { useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { Popover, PopoverContent, PopoverTrigger } from "./common/Popover";


interface Props {
  updateHeading: (heading: HeadingTagType | "normal") => void;
  headingSelectionMap: { [id: string]: boolean };
}



export function HeadingSelectionList({ updateHeading, headingSelectionMap }: Props) {
  const activeHeading = HEADINGS.find((h) => headingSelectionMap[h.id]);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger triggerRef={triggerRef}>
        <button type="button"
          className={`lexical-btn heading-trigger ${open ? "toolbar-active" : "toolbar"}`}
          onClick={() => setOpen((prev) => !prev)}
          style={{
            minWidth: 132
          }}
        >
          {activeHeading?.icon}
          <span>{activeHeading?.label}</span>
          <HiChevronDown className={`chevron ${open ? "rotated" : ""}`} />
        </button>
      </PopoverTrigger>

      <PopoverContent open={open} align="start" onClose={() => setOpen(false)} contentRef={contentRef}>
        <div
          style={{
            display: 'flex', flexDirection: 'column', gap: 5
          }}>
          {HEADINGS.map(({ id, label, icon }) => (
            <button type="button"
              key={id}
              className={`lexical-btn ${headingSelectionMap[id] ? "toolbar-active" : "toolbar"
                }`}
              onClick={() => {
                updateHeading(id as HeadingTagType | "normal");
                setOpen(false);
              }}
            >
              {icon}
              <span className="label">{label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>

  );
}
