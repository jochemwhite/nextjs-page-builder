"use client";

import {
  EditorElement,
  useEditor,
} from "@/components/providers/editor/editor-provider";
import { Button } from "@/components/ui/button";
import { getFunnelPageDetails } from "@/lib/querys";
import { cn } from "@/lib/utils";
import { EyeOff } from "lucide-react";
import { useEffect } from "react";
import Recursive from "./funnel-editor-components/recursive";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Container from "./funnel-editor-components/container";

type Props = {
  liveMode?: boolean;
  funnelPageId: string;
};

export default function FunnelEditor({ funnelPageId, liveMode }: Props) {
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
  //CHALLENGER: make this more performant
  useEffect(() => {
    const fetchData = async () => {
      const response = await getFunnelPageDetails(funnelPageId);
      console.log(response);

      if (!response) return;
      dispatch({
        type: "LOAD_DATA",
        payload: {
          elements: response.content ? JSON.parse(response?.content) : "",
          withLive: !!liveMode,
        },
      });
    };
    fetchData();
  }, [funnelPageId]);

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
  const reorder = (
    list: Array<EditorElement>,
    startIndex: number,
    endIndex: number
  ) => {
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

    const items = reorder(
      state.editor.elements[0].content as Array<EditorElement>,
      result.source.index,
      result.destination.index
    );
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
      className={cn(
        "use-automation-zoom-in h-full overflow-scroll mr-[385px] bg-background transition-all rounded-md relative",
        {
          "!p-0 !mr-0":
            state.editor.previewMode === true || state.editor.liveMode === true,
          "!w-[850px]": state.editor.device === "Tablet",
          "!w-[450px]": state.editor.device === "Mobile",
          "w-full": state.editor.device === "Desktop",
        }
      )}
    >
      {state.editor.previewMode && state.editor.liveMode && (
        <Button
          variant="ghost"
          size="icon"
          className="size-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
          onClick={hanldeUnpreview}
        >
          <EyeOff />
        </Button>
      )}
      {Array.isArray(state.editor.elements) && (
        <div className="w-full h-full absolute">
          <Container
            element={{
              ...state.editor.elements[0],
              content: [],
            }}
          />
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {Array.isArray(state.editor.elements) &&
                (state.editor.elements[0].content as Array<EditorElement>).map(
                  (item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                      isDragDisabled={
                        state.editor.liveMode || state.editor.previewMode
                      }
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Recursive element={item} />
                        </div>
                      )}
                    </Draggable>
                  )
                )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
