"use client";
import { Badge } from "@/components/ui/badge";
import { EditorBtns } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useEditor } from "@/providers/editor/editor-provider";
import { EditorElement } from "@/types/pageEditor";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "@/components/ui/use-toast";
import { elements } from "..";
import { v4 } from "uuid";
import Recursive from "../../editor/recursive";
type Props = {
  element: EditorElement;
};

export default function MainContainer({ element }: Props) {
  const { id, content, name, styles, type } = element;
  const { dispatch, state } = useEditor();
  const selectItemAndNotLiveMode = state.editor.selectedElement.id === id && !state.editor.liveMode;
  const isLiveMode = state.editor.liveMode;
  const canDrag = !isLiveMode;

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    if (!canDrag) return;

    const componentType = e.dataTransfer.getData("componentType") as EditorBtns;
    if (componentType === "__body") return;

    const Element = elements.find((element) => element.id === componentType);

    if (!Element) {
      console.log("Element not found");
      return;
    }

    console.log("Element found", Element.defaultPayload.content);

    dispatch({
      type: "ADD_ELEMENT",
      payload: {
        elementDetails: {
          ...Element.defaultPayload,
          content: Array.isArray(Element.defaultPayload.content)
            ? Element.defaultPayload.content.map((element) => ({
                ...element,
                id: v4(),
              }))
            : Element.defaultPayload.content,
          id: v4(),
        },
        containerId: id,
      },
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "__body") return;
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

  const handleDeleteElement = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  return (
    <div
     
      className={cn("relative  transition-all group", {
        "max-w-full w-full": type === "container" || type === "2Col",
        "h-full": type === "container" ||  type === "__body",
        "overflow-auto": type === "__body",
        "flex flex-col md:!flex-row": type === "2Col",
        "p-4": !state.editor.liveMode
      })}
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      draggable={type !== "__body" && canDrag}
      onDragStart={(e) => handleDragStart(e, "container")}
      onClick={handleOnCLickBody}
    >
      {Array.isArray(content) && content.map((childElement) => <Recursive element={childElement} key={childElement.id} />)}
    </div>
  );
}
