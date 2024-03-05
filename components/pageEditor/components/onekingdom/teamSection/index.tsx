import { ElementSidebar } from "@/types/pageEditor";
import { TypeIcon } from "lucide-react";
import { v4 } from "uuid";
import teamSeactionComponent from "./teamSeactionComponent";
import settings from "./settings";


export interface TeamSectionContent {
  title: string;
  devider: boolean;
}




const title: ElementSidebar<TeamSectionContent> = {
  icon: TypeIcon,
  group: "onekingdom",
  id: v4(),
  label: "Team Section",
  name: "Team Section",
  type: "teamsection",
  defaultPayload: {
    content: {
      title: "Je Moeder",
      devider: true,
    },
    id: v4(),
    name: "Team Section",
    styles: {},
    type: "teamsection",
  },
  component: teamSeactionComponent,
  // settings: settings,
};

export default title;
