import { Button } from "./ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import { HEADINGS } from "../constants/index";
import { type HeadingTagType } from '@lexical/rich-text'

import { useState } from "react"
import { HiChevronDown } from "react-icons/hi2";

interface Props {
  updateHeading: (heading: HeadingTagType | "normal") => void,
  headingSelectionMap: {
    [id: string]: boolean;
  }
}
export function HeadingSelectionList({ updateHeading, headingSelectionMap }: Props) {
  const activeHeading = HEADINGS.find(h => headingSelectionMap[h.id])
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Popover open={isOpen} onOpenChange={(s) => setIsOpen(s)}>
      <PopoverTrigger asChild>
        <Button variant={isOpen ? "toolbarActive" : "toolbar"}
          onClick={() => setIsOpen(!isOpen)} size="icon" className="size-8 w-fit p-2 select-none min-w-[130px] border-[1px] border-gray-100"
        >
          {activeHeading?.icon}<span>{activeHeading?.label}</span> <HiChevronDown className={` transition-normal duration-100 ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-2 w-fit flex flex-col items-start gap-1">
        {
          HEADINGS.map(({ id, label, icon }) => (
            <Button variant={headingSelectionMap[id] ? "toolbarActive" : "toolbar"} key={id}
              onClick={() => updateHeading(id as HeadingTagType | 'normal')}
              size="icon" className="size-8 w-full flex justify-start py-2 px-3 select-none"
            >
              {icon} <span className="ml-2">{label}</span>
            </Button>
          ))
        }
      </PopoverContent>
    </Popover>
  )
}
