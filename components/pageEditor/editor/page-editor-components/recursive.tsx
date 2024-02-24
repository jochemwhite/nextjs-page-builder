
import { EditorElement } from "@/types/pageEditor";
import { elements } from "../../components";

type Props = {
  element: EditorElement;
};

export default function Recursive({ element }: Props) {
    const Component = elements.find((el) => el.type === element.type)?.component;

    if (!Component) {
        // toast.error("Element not found");
        return 
    }

    return <Component element={element} />;

}
