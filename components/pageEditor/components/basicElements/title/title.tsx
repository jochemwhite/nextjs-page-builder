import { EditorElement } from "@/types/pageEditor";
import React from "react";
import { TitleContent } from ".";
import { useEditor } from "@/providers/editor/editor-provider";

type Props = {
  element: EditorElement<TitleContent>;
};

export default function TitleComponent({ element }: Props) {
  const { state, dispatch } = useEditor();
  const { title, devider } = element.content;

  return (
    <>
      <h3
        className="fn_title"
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => {
          const spanElemtn = e.target;
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              elementDetails: {
                ...element,
                content: {
                  title: spanElemtn.innerText,
                },
              },
            },
          });
        }}
      >
        {title}
      </h3>
      {devider && (
        <div className="line">
          <span />
        </div>
      )}
    </>
  );
}
