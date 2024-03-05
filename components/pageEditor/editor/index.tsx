"use client";

import { useEditor } from "@/providers/editor/editor-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { EditorElement, PageDetails } from "@/types/pageEditor";
import MainContainer from "../components/layout/mainContainer";
import Recursive from "./recursive";
import clsx from "clsx";

type Props = {
  liveMode?: boolean;
  pageDetails: PageDetails | undefined;
};

export default function PageEditor({ pageDetails, liveMode }: Props) {
  const { state, dispatch } = useEditor();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight);
    }
  }, [state.editor]);

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



  return (
    <div
      className={clsx("use-automation-zoom-in h-full pb-16  overflow-scroll mr-[385px] bg-background transition-all rounded-md", {
        "!p-0 !mr-0": state.editor.previewMode === true || state.editor.liveMode === true,
        "!w-[850px]": state.editor.device === "Tablet",
        "!w-[420px]": state.editor.device === "Mobile",
        "w-full": state.editor.device === "Desktop",
      })}
      onClick={handleClick}
    >
      {state.editor.previewMode && state.editor.liveMode && (
        <Button variant={"ghost"} size={"icon"} className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]" onClick={hanldeUnpreview}>
          <EyeOff />
        </Button>
      )}
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => (
     
            <Recursive key={childElement.id} element={childElement} />
     
        ))}
    </div>
  );
}
