import { ElementSidebar, TypeTextP } from "@/types/pageEditor";
import { TypeIcon } from "lucide-react";
import { v4 } from "uuid";
import TextComponent from "./text";

export interface TextContent {
  innerText: string;
  typeText?: TypeTextP;
}

const text: ElementSidebar<TextContent> = {
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
  component: TextComponent,
};

export default text;
