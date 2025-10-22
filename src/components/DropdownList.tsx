import { Button } from "./ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import { RICH_TEXT_FORMAT_OPTIONS, RichTextAction } from "../constants/index";
import { useState } from "react"
import { HiChevronDown } from "react-icons/hi2";

interface Props {
  onAction: (id: RichTextAction) => void,
  selectionMap: {
    [id: string]: boolean;
  }
}
export function DropdownList({ onAction, selectionMap }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Popover open={isOpen} onOpenChange={(s) => setIsOpen(s)}>
      <PopoverTrigger asChild>
        <Button variant={isOpen ? "toolbarActive" : "toolbar"}
          onClick={() => setIsOpen(!isOpen)} size="icon" className="size-8 w-fit p-2 select-none border-[1px] border-gray-100"
        >
          <span>Aa</span> <HiChevronDown className={` transition-normal duration-100 ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-fit flex flex-col items-start gap-1">
        {
          RICH_TEXT_FORMAT_OPTIONS.map(({ id, label, icon }) => (
            <Button variant={selectionMap[id] ? "toolbarActive" : "toolbar"} key={id}
              onClick={() => onAction(id)}
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
