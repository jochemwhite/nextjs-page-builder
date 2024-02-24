"use client";

import {

  useEditor,
} from "@/providers/editor/editor-provider";
import { Badge } from "@/components/ui/badge";
import { EditorBtns } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { EditorElement } from "@/types/pageEditor";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
};

export default function VideoComponent({ element }: Props) {
  const { dispatch, state } = useEditor();
  const styles = element.styles;
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };
  const isSelectedElement = state.editor.selectedElement.id === element.id;
  const handleDeleteElement = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };
  const liveMode = state.editor.liveMode;
  const isPreview = state.editor.previewMode;
  const canDrag = !liveMode || !isPreview;
  return (
    <div
      style={styles}
      draggable={canDrag}
      onDragStart={(e) => handleDragStart(e, "video")}
      onClick={handleOnClick}
      className={cn(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center",
        {
          "!border-blue-500 !border-solid ": isSelectedElement,
          "border-dashed boder-[1px] border-slate-300": !state.editor.liveMode,
        }
      )}
    >
      {isSelectedElement && !state.editor.liveMode && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
          {state.editor.selectedElement.name}
        </Badge>
      )}

      {!Array.isArray(element.content) && (
        <iframe
          width={element.styles.width || "560"}
          height={element.styles.height || "315"}
          src={element.content.src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      )}
      {isSelectedElement && !state.editor.liveMode && (
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
