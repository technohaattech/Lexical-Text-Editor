
import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../components/ui/tooltip";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { BsListOl, BsListUl } from "react-icons/bs";

interface ListPluginProps {
  blockType: string;
}

export default function ListPlugin({ blockType }: ListPluginProps) {
  const [editor] = useLexicalComposerContext();

  const handleOrderedList = () => {
    if (blockType === "ol") {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  const handleUnorderedList = () => {
    if (blockType === "ul") {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  };

  return (
    <>
      <Tooltip delayDuration={700}>
        <TooltipTrigger asChild>
          <Button
            variant={blockType === "ol" ? "toolbarActive" : "toolbar"}
            size="icon"
            className="size-8"
            aria-label="Add ordered list"
            onClick={handleOrderedList}
          >
            <BsListOl />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Ordered list
        </TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={700}>
        <TooltipTrigger asChild>
          <Button
            variant={blockType === "ul" ? "toolbarActive" : "toolbar"}
            size="icon"
            className="size-8"
            aria-label="Add unordered list"
            onClick={handleUnorderedList}
          >
            <BsListUl />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Unordered list
        </TooltipContent>
      </Tooltip>
    </>
  );
}
