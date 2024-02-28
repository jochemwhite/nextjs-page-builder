import { ElementSidebar, TypeTextP } from "@/types/pageEditor";
import { TypeIcon } from "lucide-react";
import { v4 } from "uuid";
import ButtonElement from "./button";
import settings from "./settings";

export interface ButtonContent {
  innerText: string;
  icon?: string;
  href: string;
  openNewTab: boolean;
}

const button: ElementSidebar<ButtonContent> = {
  icon: TypeIcon,
  group: "elements",
  id: v4(),
  label: "Button",
  name: "Button",
  type: "button",
  defaultPayload: {
    content: {
      innerText: "Text",
      openNewTab: false,
      href: "/",
      // icon: "",
    },
    id: v4(),
    name: "Button",
    styles: {},
    type: "button",
  },
  component: ButtonElement,
  settings: settings,
};

export default button;
