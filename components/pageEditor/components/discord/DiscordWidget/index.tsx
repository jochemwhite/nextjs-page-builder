import { ElementSidebar, TypeTextP } from "@/types/pageEditor";
import { TypeIcon } from "lucide-react";
import { v4 } from "uuid";
import DiscordWidgetComponent from "./DiscordWidget";

export interface DiscordWidgetContent {
 
}

const DiscordWidget: ElementSidebar<DiscordWidgetContent> = {
  icon: TypeIcon,
  group: "discord",
  id: v4(),
  label: "Discord Widget",
  name: "Discord Widget",
  type: "discord-widget",
  defaultPayload: {
    content: {
      innerText: "Text",
    },
    id: v4(),
    name: "Discord Widget",
    styles: {
      width: "fit-content",
    },
    type: "discord-widget",
  },
  component: DiscordWidgetComponent,
};

export default DiscordWidget;
