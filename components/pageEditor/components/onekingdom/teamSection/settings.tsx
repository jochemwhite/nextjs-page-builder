import { EditorElement } from "@/types/pageEditor";
import React from "react";
import { useEditor } from "@/providers/editor/editor-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { TeamSectionContent } from ".";

type Props = {
  element: EditorElement<TeamSectionContent>;
};

export default function settings({ element }: Props) {
  const { dispatch } = useEditor();


  const updateContent = () => {
    const updatedContent = {
      ...element.content,
      devider: !element.content.devider 
    };


    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...element,
          content: updatedContent,
        },
      },
    });
  };

  return (
    
      <div className="flex gap-1.5 leading-none">
        <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Show Devider
        </label>
        <Checkbox checked={element.content.devider} onClick={updateContent} />
      </div>
  );
}
