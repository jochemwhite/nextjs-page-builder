"use client";
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

export default function ImageComponent({ element }: Props) {
  const { state, dispatch } = useEditor();
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type == null) return;
    e.dataTransfer.setData("componentType", type);
  };
  const handleOnCLickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };
  const styles = element.styles;
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
  console.log(canDrag);

  const content = !Array.isArray(element.content) ? element.content : null;
  return (
    <div
      style={styles}
      draggable={canDrag}
      onDragStart={(e) => handleDragStart(e, "link")}
      onClick={handleOnCLickBody}
      className={cn(" w-full  relative text-[16px] transition-all", {
        "!border-blue-500": isElementSelected,
        "!border-solid": isElementSelected,
        "border-dashed border-[1px] border-slate-300": !liveMode,
      })}
    >
      {isElementSelected && !liveMode && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
          {state.editor.selectedElement.name}
        </Badge>
      )}

      <picture>
        <img
          src={content?.src}
          alt="image"
          width={styles.width}
          height={styles.height}
          style={{
            ...styles,
          }}
        />
      </picture>

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
