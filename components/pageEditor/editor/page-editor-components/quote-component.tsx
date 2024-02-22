import {
  useEditor,
} from "@/providers/editor/editor-provider";
import { Badge } from "@/components/ui/badge";
import { EditorBtns } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { EditorElement } from "@/types/pageEditor";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
};

export default function QuoteComponent({ element }: Props) {
  const { dispatch, state } = useEditor();
  const styles = element.styles;
  const handleOnCLickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    e.stopPropagation();
  };
  const handleDeleteElement = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };
  const isElementSelected = state.editor.selectedElement.id === element.id;
  const liveMode = state.editor.liveMode;
  const isPreview = state.editor.previewMode;
  const canDrag = !liveMode || !isPreview;
  const content = !Array.isArray(element.content) ? element.content : null;
  if (content == null) return null;
  return (
    <div
      onClick={handleOnCLickBody}
      style={styles}
      draggable={canDrag}
      onDragStart={(e) => handleDragStart(e, "quote")}
      className={cn(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
        {
          "!border-blue-500": isElementSelected,
          "!border-solid": isElementSelected,
          "border-dashed border-[1px] border-slate-300": !liveMode,
        }
      )}
    >
      {isElementSelected && !liveMode && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
          {state.editor.selectedElement.name}
        </Badge>
      )}

      <div style={content?.quoteStyles?.styles} className="cursor-pointer">
        <span
          contentEditable={!state.editor.liveMode}
          onBlur={(e) => {
            const spanElemtn = e.target;
            dispatch({
              type: "UPDATE_ELEMENT",
              payload: {
                elementDetails: {
                  ...element,
                  content: {
                    ...content,
                    innerText: spanElemtn.innerText,
                  },
                },
              },
            });
          }}
        >
          {content?.innerText}
        </span>
      </div>

      {isElementSelected && !liveMode && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={handleDeleteElement}
          />
        </div>
      )}
    </div>
  );
}
