import * as basicElements from "./basicElements";
import * as Layout from "./layout";
import * as Hero from "./Hero";
import * as Discord from "./discord";
import { EditorElement, EditorState, ElementSidebar } from "@/types/pageEditor";

const allElements = {
  ...basicElements,
  ...Layout,
  ...Hero,
  ...Discord,
};

const elements: ElementSidebar<any>[] = Object.values(allElements).map((element) => {
  return element;
});

export { elements };
