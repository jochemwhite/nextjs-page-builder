import { ElementSidebar } from "@/types/pageEditor";
import * as Hero from "./Hero";
import * as basicElements from "./basicElements";
import * as Discord from "./discord";
import * as Layout from "./layout";
import * as Onekingdom from "./onekingdom";

const allElements = {
  ...basicElements,
  ...Layout,
  ...Hero,
  ...Discord,
  ...Onekingdom
};

const elements: ElementSidebar<any>[] = Object.values(allElements).map((element) => {
  return element;
});

export { elements };
