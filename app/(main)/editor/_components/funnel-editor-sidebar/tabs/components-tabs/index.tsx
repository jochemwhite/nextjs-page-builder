import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EditorBtns } from "@/lib/constants";
import { ReactNode } from "react";
import TextPlaceHolder from "./text-placeholder";
import ContainerPlaceHolder from "./container-placeholder";
import VideoPlaceholder from "./video-placeholder";
import TwoColumnsPlaceHolder from "./two-columns-placeholder";
import LinkPLaceholder from "./link-placeholder";

import ImageComponentPlaceHolder from "./image-components-placeholder";
import QuoteComponentPlaceHolder from "./quote-component-placeholder";

type Props = {};

export default function ComponentsTab({}: Props) {
  const elements: {
    Component: ReactNode;
    label: string;
    id: EditorBtns;
    group: "layout" | "elements";
  }[] = [
    {
      Component: <TextPlaceHolder />,
      group: "elements",
      label: "Text",
      id: "text",
    },
    {
      Component: <ContainerPlaceHolder />,
      label: "Container",
      id: "container",
      group: "layout",
    },
    {
      label: "2 Columns",
      id: "2Col",
      group: "layout",
      Component: <TwoColumnsPlaceHolder />,
    },
    {
      Component: <VideoPlaceholder />,
      label: "Video",
      id: "video",
      group: "elements",
    },
    {
      Component: <LinkPLaceholder />,
      label: "Link",
      group: "elements",
      id: "link",
    },


    {
      Component: <ImageComponentPlaceHolder />,
      label: "Image",
      id: "image",
      group: "elements",
    },
    {
      Component: <QuoteComponentPlaceHolder />,
      label: "Quote",
      group: "elements",
      id: "quote",
    },
  ];
  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Layout", "Elements"]}
    >
      <AccordionItem value="Layout" className="px-6 py-0 border-y-[1px]">
        <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
        <AccordionContent className="grid grid-cols-2 gap-2">
          {elements
            .filter((e) => e.group == "layout")
            .map((element) => (
              <div
                key={element.id}
                className="flex flex-col items-center justify-center"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="px-6 py-0 border-y-[1px]">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="grid grid-cols-2 gap-2">
          {elements
            .filter((e) => e.group == "elements")
            .map((element) => (
              <div
                key={element.id}
                className="flex flex-col items-center justify-center"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
