import { ElementSidebar } from "@/types/pageEditor";
import { TypeIcon } from "lucide-react";
import { v4 } from "uuid";
import EventTimeLine from "./EventTimeline";
import settings from "./settings";


export interface EventTimeLineContent {
  
}




const title: ElementSidebar<EventTimeLineContent> = {
  icon: TypeIcon,
  group: "onekingdom",
  id: v4(),
  label: "Event Timeline",
  name: "Event Timeline",
  type: "Event Timeline",
  defaultPayload: {
    content: {
      title: "Je Moeder",
      devider: true,
    },
    id: v4(),
    name: "Event Timeline",
    styles: {},
    type: "Event Timeline",
  },
  component: EventTimeLine,
  settings: settings,
};

export default title;
