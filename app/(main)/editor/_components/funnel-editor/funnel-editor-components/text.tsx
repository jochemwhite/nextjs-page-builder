"use client";
import {
  useEditor,
} from "@/components/providers/editor/editor-provider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EditorElement } from "@/types/pageEditor";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
};

export default function TextComponent({ element }: Props) {
  const { dispatch, state } = useEditor();
  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const sytles = element.styles;

  const handleOnClikBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };
  ///WE ARE NOT ADDING DRAG DROP
  const content = !Array.isArray(element.content) ? element.content : null;
  return (
    <div
      style={sytles}
      onClick={handleOnClikBody}
      className={cn(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
        {
          "!border-blue-500": state.editor.selectedElement.id === element.id,
          "!border-solid": state.editor.selectedElement.id === element.id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      {(content?.typeText === "Parrafo" || content?.typeText == null) && (
        <span
          contentEditable={!state.editor.liveMode}
          onBlur={(e) => {
            const spanElemtn = e.target as HTMLSpanElement;
            dispatch({
              type: "UPDATE_ELEMENT",
              payload: {
                elementDetails: {
                  ...element,
                  content: {
                    innerText: spanElemtn.innerText,
                  },
                },
              },
            });
          }}
        >
          {content?.innerText}
        </span>
      )}
      {content?.typeText === "Title" && (
        <h1
          contentEditable={!state.editor.liveMode}
          onBlur={(e) => {
            const spanElemtn = e.target;
            dispatch({
              type: "UPDATE_ELEMENT",
              payload: {
                elementDetails: {
                  ...element,
                  content: {
                    innerText: spanElemtn.innerText,
                  },
                },
              },
            });
          }}
        >
          {content?.innerText}
        </h1>
      )}
      {content?.typeText === "SubTitle" && (
        <h2
          contentEditable={!state.editor.liveMode}
          onBlur={(e) => {
            const spanElemtn = e.target;
            dispatch({
              type: "UPDATE_ELEMENT",
              payload: {
                elementDetails: {
                  ...element,
                  content: {
                    innerText: spanElemtn.innerText,
                  },
                },
              },
            });
          }}
        >
          {content?.innerText}
        </h2>
      )}

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
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
