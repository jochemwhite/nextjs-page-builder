"use client";

import { useEditor } from "@/providers/editor/editor-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EyeOff } from "lucide-react";
import { useEffect } from "react";
import Recursive from "./page-editor-components/recursive";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { EditorElement, PageDetails } from "@/types/pageEditor";
import MainContainer from "../components/layout/mainContainer";

type Props = {
  liveMode?: boolean;
  pageDetails: PageDetails | undefined;
};

export default function PageEditor({ pageDetails, liveMode }: Props) {
  const { state, dispatch } = useEditor();

  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: "TOGGLE_LIVE_MODE",
        payload: {
          value: true,
        },
      });
    }
  }, [liveMode]);
  useEffect(() => {
    const fetchData = async () => {
      if (!pageDetails) return;

      dispatch({
        type: "LOAD_DATA",
        payload: {
          elements: pageDetails.content ? JSON.parse(pageDetails?.content) : null,
          withLive: !!liveMode,
        },
      });
    };
    fetchData();
  }, [pageDetails]);

  const handleClick = () => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {},
    });
  };

  const hanldeUnpreview = () => {
    dispatch({
      type: "TOGGLE_PREVIEW_MODE",
    });
    dispatch({
      type: "TOGGLE_LIVE_MODE",
    });
  };
  // a little function to help us with reordering the result
  const reorder = (list: Array<EditorElement>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(state.editor.elements[0].content as Array<EditorElement>, result.source.index, result.destination.index);
    let prev: Array<EditorElement> = [...state.editor.elements];
    prev[0].content = items;
    dispatch({
      type: "LOAD_DATA",
      payload: {
        elements: prev,
        withLive: false,
      },
    });
  };



  return (
    <div
      onClick={handleClick}
      className={cn("use-automation-zoom-in h-full  mr-[385px] bg-background transition-all rounded-md relative", {
        "!p-0 !mr-0": state.editor.previewMode === true,
        "!w-[850px]": state.editor.device === "Tablet",
        "!w-[450px]": state.editor.device === "Mobile",
        "w-full": state.editor.device === "Desktop",
      })}
    >
      {state.editor.previewMode && state.editor.liveMode && (
        <Button variant="ghost" size="icon" className="size-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]" onClick={hanldeUnpreview}>
          <EyeOff />
        </Button>
      )}
      {Array.isArray(state.editor.elements) && (
        <div className="w-full h-full absolute">
          <MainContainer
            element={{
              ...state.editor.elements[0],
              content: [],
            }}
          />
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" isDropDisabled={state.editor.liveMode} isCombineEnabled={state.editor.liveMode}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {Array.isArray(state.editor.elements) &&
                (state.editor.elements[0].content as Array<EditorElement>).map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={state.editor.liveMode}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} suppressContentEditableWarning={true}>
                        <Recursive element={item} />
                      </div>
                    )}
                  </Draggable>
                ))}
              {/* {provided.placeholder} */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
