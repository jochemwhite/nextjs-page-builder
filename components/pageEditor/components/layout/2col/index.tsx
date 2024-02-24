import { defaultStyles } from "@/lib/constants";
import { ElementSidebar } from "@/types/pageEditor";
import { Columns2 } from "lucide-react";
import { v4 } from "uuid";
import MainContainer from "../mainContainer";

const twocol: ElementSidebar = {
  icon: Columns2,
  group: "layout",
  id: "2col",
  label: "2col",
  name: "2col",
  type: "2Col",
  defaultPayload: {
    content: [
      {
        content: [],
        id: v4(),
        name: "Container",
        styles: { ...defaultStyles, width: "100%" },
        type: "container",
      },
      {
        content: [],
        id: v4(),
        name: "Container",
        styles: { ...defaultStyles, width: "100%" },
        type: "container",
      },
    ],
    id: v4(),
    name: "Two Columns",
    styles: { ...defaultStyles, display: "flex" },
    type: "2Col",
  },
  component: MainContainer,
};

export default twocol;
