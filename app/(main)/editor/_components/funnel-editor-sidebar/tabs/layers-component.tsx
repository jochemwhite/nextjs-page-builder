"use client";
import {
  useEditor,
} from "@/components/providers/editor/editor-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { EditorElement } from "@/types/pageEditor";
import { BoxSelect } from "lucide-react";
import React from "react";

export default function LayersComponent() {
  const { state, dispatch } = useEditor();
  const onClickElemnt = (e: React.MouseEvent, element: EditorElement) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };
  return (
    <>
      <Accordion type="multiple" className="w-full ml-1">
        {state.editor.elements.map((element, i) => (
          <ElementRec
            idSelct={state.editor.selectedElement.id}
            selected={state.editor.selectedElement.id === element.id}
            onClickElemnt={onClickElemnt}
            key={element.id}
            element={element}
            index={i}
          ></ElementRec>
        ))}
      </Accordion>
    </>
  );
}
type Props = {
  element: EditorElement;
  index: number;
  onClickElemnt: (e: React.MouseEvent, el: EditorElement) => void;
  selected: boolean;
  idSelct: string;
};
const ElementRec = ({
  element,
  index,
  onClickElemnt,
  selected,
  idSelct,
}: Props) => {
  return (
    <AccordionItem
      onClick={(e) => onClickElemnt(e, element)}
      value={element.id}
      className="border-b"
      style={{ marginLeft: `${index + 5}px` }}
    >
      <AccordionTrigger
        className={cn("w-full hover:bg-muted/80", selected && "bg-muted")}
      >
        <div className="w-full flex space-x-2 ">
          <BoxSelect size={20} />
          <p> {element.name}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {Array.isArray(element.content) &&
          element.content.map((el, i) => (
            <ElementRec
              idSelct={idSelct}
              selected={idSelct == el.id}
              onClickElemnt={onClickElemnt}
              key={el.id}
              element={el}
              index={i}
            ></ElementRec>
          ))}
        {!Array.isArray(element.content) && (
          <div className="flex items-center space-x-2 ml-2">
            <p>{element.name}</p>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
