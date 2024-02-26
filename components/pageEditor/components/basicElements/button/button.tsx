import { EditorElement } from "@/types/pageEditor";
import Link from "next/link";
import React, { useState } from "react";
import button, { ButtonContent } from ".";
import SocialIcon from "@/components/ui/social-icon";
import { cn } from "@/lib/utils";
import { useEditor } from "@/providers/editor/editor-provider";

type Props = {
  element: EditorElement<ButtonContent>;
};

export default function ButtonElement({ element }: Props) {
  const { innerText, openNewTab, href, icon } = element.content;
  const { state, dispatch } = useEditor();
  const [isHover, setIsHover] = useState(false);

  const toggleHover = (value: boolean) => () => {
    setIsHover(value);
  };

  const handleTextChange = (e: React.FocusEvent<HTMLSpanElement, Element>) => {
    const spanElemtn = e.target;
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...element,
          content: {
            ...element.content,
            innerText: spanElemtn.innerText,
          },
        },
      },
    });
  };

  if (!state.editor.liveMode) {
    return (
      <span
        className={cn(
          "flex items-center transition justify-between w-fit max-w-full no-underline text-base uppercase border-2 rounded-md leading-[46px] px-5 relative text-center tracking-wide *:mx-2",
          {
            "border-[#78F701] text-primary  hover:text-white": isHover,
          }
        )}
        onMouseEnter={toggleHover(true)}
        onMouseLeave={toggleHover(false)}
        rel="noreferrer"
      >
        {icon && (
          <span className="flex items-center">
            <SocialIcon value={icon} size={25} />
            <span
              className={cn("block relative  w-[2px] h-8 ml-5 bg-white", {
                "after:bg-[#78F701] after-w-[2px] after:h-8 after:block after:animate-lineFromTopToBottom ": isHover,
                "after:bg-[#78F701] after-w-[2px] after:h-8 after:hidden after:animate-lineFrombottomToBottomEnd": !isHover,
              })}
            />
          </span>
        )}
        <span className="text" contentEditable={!state.editor.liveMode} onBlur={handleTextChange}>
          {innerText}
        </span>
      </span>
    );
  }

  return (
    <Link
      href={""}
      target={openNewTab ? "_blank" : ""}
      className={cn(
        "flex items-center transition justify-between w-fit max-w-full no-underline text-base uppercase border-2 rounded-md leading-[46px] px-5 relative text-center tracking-wide *:mx-2",
        {
          "border-[#78F701] text-primary  hover:text-white": isHover,
        }
      )}
      onMouseEnter={toggleHover(true)}
      onMouseLeave={toggleHover(false)}
      rel="noreferrer"
    >
      {icon && (
        <span className="flex items-center">
          <SocialIcon value={icon} size={25} />
          <span
            className={cn("block relative  w-[2px] h-8 ml-5 bg-[#082057]", {
              "after:bg-[#78F701] after-w-[2px] after:h-8 after:block after:animate-lineFromTopToBottom ": isHover,
              "after:bg-[#78F701] after-w-[2px] after:h-8 after:hidden after:animate-lineFrombottomToBottomEnd": !isHover,
            })}
          />
        </span>
      )}
      <span className="text" contentEditable={!state.editor.liveMode} onBlur={handleTextChange}>
        {innerText}
      </span>
    </Link>
  );
}
