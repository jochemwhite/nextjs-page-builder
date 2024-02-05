"use client";
import {
  EditorElement,
  useEditor,
} from "@/components/providers/editor/editor-provider";
import { Badge } from "@/components/ui/badge";
import { EditorBtns, defaultStyles } from "@/lib/constants";
import { cn } from "@/lib/utils";
import React from "react";
import { v4 } from "uuid";
import Recursive from "./recursive";
import { Trash } from "lucide-react";
type Props = {
  element: EditorElement;
};

export default function Container({ element }: Props) {
  const { id, content, name, styles, type } = element;
  const { dispatch, state } = useEditor();
  const selectItemAndNotLiveMode =
    state.editor.selectedElement.id === id && !state.editor.liveMode;
  const isLiveMode = state.editor.liveMode;
  const isPreview = state.editor.previewMode;
  const canDrag = !isLiveMode || !isPreview;
  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    if (!canDrag) return;
    const componentType = e.dataTransfer.getData("componentType") as EditorBtns;
    switch (componentType) {
      case "text":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: "Text Element", typeText: "Parrafo" },
              id: v4(),
              name: "Text",
              styles: {
                color: "black",
                ...defaultStyles,
              },
              type: "text",
            },
          },
        });
        break;

      case "container":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Container",
              styles: {
                ...defaultStyles,
              },
              type: "container",
            },
          },
        });
        break;
      case "video":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                src: "https://youtu.be/L3wKzyIN1yk?si=UmEtobmGhXQaH8hr",
              },
              id: v4(),
              name: "Video",
              styles: {},
              type: "video",
            },
          },
        });
        break;
      case "2Col":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
              ],
              id: v4(),
              name: "Two Columns",
              styles: { ...defaultStyles, display: "flex" },
              type: "2Col",
            },
          },
        });
        break;
      case "link":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                innerText: "Link Element",
                href: "#",
              },
              id: v4(),
              name: "Link",
              styles: {
                color: "black",
                ...defaultStyles,
              },
              type: "link",
            },
          },
        });
        break;
      case "contactForm":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Contact Form",
              type: "contactForm",
              styles: {},
            },
          },
        });
        break;
      case "paymentForm":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Contact Form",
              styles: {},
              type: "paymentForm",
            },
          },
        });
        break;
      case "image":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                src: "https://i.postimg.cc/TYq6Y8P9/istockphoto-1147544807-612x612.jpg",
              },
              id: v4(),
              name: "Image",
              type: "image",
              styles: {
                ...defaultStyles,
                width: "100%",
                height: "150px",
              },
            },
          },
        });
        break;
      case "quote":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                innerText: "Text here",
                quoteStyles: {
                  styles: {
                    borderLeftColor: "#b4b4b4",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "10px",
                    padding: "10px 10px",
                    fontStyle: "italic",
                  },
                },
              },
              id: v4(),
              name: "Quote",
              styles: { ...defaultStyles },
              type: "quote",
            },
          },
        });
        break;
      default:
        break;
    }
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
      style={styles}
      className={cn("relative p-4 transition-all group", {
        "max-w-full w-full": type === "container" || type === "2Col",
        "h-fit": type === "container",
        "h-full": type === "__body",
        "overflow-auto": type === "__body",
        "flex flex-col md:!flex-row": type === "2Col",
        "!border-blue-500":
          selectItemAndNotLiveMode &&
          state.editor.selectedElement.type !== "__body",
        "!border-yellow-400 !border-4":
          selectItemAndNotLiveMode &&
          state.editor.selectedElement.type === "__body",
        "!border-solid": selectItemAndNotLiveMode,
        "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
      })}
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      draggable={type !== "__body" && canDrag}
      onDragStart={(e) => handleDragStart(e, "container")}
      onClick={handleOnCLickBody}
    >
      <Badge
        className={cn(
          "absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden",
          {
            block: selectItemAndNotLiveMode,
          }
        )}
      >
        {name}
      </Badge>
      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive element={childElement} key={childElement.id} />
        ))}
      {selectItemAndNotLiveMode &&
        state.editor.selectedElement.type !== "__body" && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg">
            <Trash size={16} onClick={handleDeleteElement} />
          </div>
        )}
    </div>
  );
}
