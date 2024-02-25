import { defaultStyles } from "@/lib/constants";
import { ElementSidebar } from "@/types/pageEditor";
import { Container } from "lucide-react";
import { white } from "tailwindcss/colors";
import { v4 } from "uuid";
import ContainerComponent from "../container";
import MainContainer from "../mainContainer";

const container: ElementSidebar = {
  icon: Container,
  group: "layout",
  id: "container",
  label: "Container",
  name: "Container",
  type: "container",
  defaultPayload: {
    content: [],
    id: v4(),
    name: "Container",
    styles: {
      ...defaultStyles,
    },
    type: "container",
  },
  component: MainContainer,
};

export default container;
