import React, { MouseEventHandler, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { EditorElement } from "@/types/pageEditor";
import { ButtonContent } from ".";
import { useEditor } from "@/providers/editor/editor-provider";
import { z } from "zod";
import ButtonForm from "@/components/forms/button-form";
import { ButtonSchema } from "@/schema/button";

type Props = {
  element: EditorElement<ButtonContent>;
};

export default function settings({ element }: Props) {
  const { state, dispatch } = useEditor();
  const {
    content: { href, openNewTab, icon },
  } = element;

  const updateContent = (X: ButtonSchema) => {
    const updatedContent = {
      ...element.content,
      href: X.link,
      openNewTab: X.openNewTab,
      icon: X.showIcon ? X.icon : undefined,
      
    }

    console.log(updatedContent);



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
    <div className="flex flex-col">
      <ButtonForm
        devaultValues={{
          link: href,
          openNewTab: openNewTab,
          showIcon: !!icon,
          icon: icon,
        }}
        updateContent={updateContent}
      />
    </div>
  );
}
