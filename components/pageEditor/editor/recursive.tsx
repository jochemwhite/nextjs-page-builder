import { EditorElement } from "@/types/pageEditor";
import { Badge } from "@/components/ui/badge";
import { useEditor } from "@/providers/editor/editor-provider";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { elements } from "../components";

type Props = {
  element: EditorElement;
};

export default function Recursive({ element }: Props) {
  const Component = elements.find((el) => el.type === element.type)?.component;
  const { state, dispatch } = useEditor();

  if (!Component) {
    console.log("Component not found");
    return;
  }

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };
  const handleOnClikBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  if (element.type === "container" || element.type === "2Col" ) {
    return <Component element={element} />;
  }

  return (
    <div
      style={element.styles}
      onClick={handleOnClikBody}
      className={cn("relative", {
        "!border-blue-500": state.editor.selectedElement.id === element.id && !state.editor.liveMode,
        "border-dashed border-[1px] border-slate-300 p-4": !state.editor.liveMode,
      })}
    >
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">{state.editor.selectedElement.name}</Badge>
      )}
      <Component element={element} />
      {state.editor.selectedElement.id === element.id && !state.editor.liveMode && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={() => {
              handleDeleteElement();
            }}
          />
        </div>
      )}
    </div>
  );
}
