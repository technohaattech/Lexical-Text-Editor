
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { BsListOl, BsListUl } from "react-icons/bs";
import TooltipX from "../components/common/Tooltip";

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
      <TooltipX content="Ordered list" direction="bottom">
        <button type="button"
          className={`size-8 lexical-btn ${blockType === "ol" ? "toolbarActive" : "toolbar"
            } icon`}
          onClick={handleOrderedList}
        >
          <BsListOl />
        </button>
      </TooltipX>

      <TooltipX content="Unordered list" direction="bottom">
        <button type="button"
          className={`size-8 lexical-btn ${blockType === "ul" ? "toolbarActive" : "toolbar"
            } icon`}
          onClick={handleUnorderedList}
        >
          <BsListUl />
        </button>
      </TooltipX>

    </>
  );
}
