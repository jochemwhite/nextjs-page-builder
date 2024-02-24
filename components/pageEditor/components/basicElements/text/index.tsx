import { ElementSidebar } from "@/types/pageEditor";
import { TypeIcon } from "lucide-react";
import { v4 } from "uuid";
import TextComponent from "./text";

const text: ElementSidebar = {
  icon: TypeIcon,
  group: "elements",
  id: v4(),
  label: "Text",
  name: "Text",
  type: "text",
  defaultPayload: {
    content: {
      innerText: "Text",
    },
    id: v4(),
    name: "Text",
    styles: {},
    type: "text",
  },
  component: TextComponent
};

export default text;
