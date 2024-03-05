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
  element: EditorElement<EditorElement[]>;
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
            ? Element.defaultPayload.content.map((element: EditorElement) => ({
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
  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: state.editor.selectedElement,
      },
    });
  };
  return (
    <div
      style={styles}
      className={cn("relative  transition-all group", {
        'max-w-full w-full': type === 'container' || type === '2Col',
        'h-fit': type === 'container',
        'h-full': id === '__body',
        'overflow-scroll ': type === '__body',
        'flex flex-col md:!flex-row': type === '2Col',
        '!border-blue-500':
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type !== '__body',
        '!border-yellow-400 !border-4':
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type === '__body',
        '!border-solid':
          state.editor.selectedElement.id === id && !state.editor.liveMode,
        'border-dashed border-[1px] border-slate-300 p-4': !state.editor.liveMode,
      })}
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      onClick={handleOnCLickBody}
    >
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">{state.editor.selectedElement.name}</Badge>
      )}
      {Array.isArray(content) && content.map((childElement) => <Recursive element={childElement} key={childElement.id} />)}
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
          <Trash className="cursor-pointer" size={16} onClick={() =>{handleDeleteElement()}} />
        </div>
      )}
    </div>
  );
}
