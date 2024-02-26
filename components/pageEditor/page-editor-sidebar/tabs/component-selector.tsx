import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";import { elements } from "../../components/index";

import PlaceHolder from "@/components/pageEditor/components/placeholder";

type Props = {};

export default function ComponentsTab({}: Props) {
  const elementsByGroup = elements.reduce((acc: { [key: string]: any[] }, element) => {
    const { group } = element;

    if (!acc[group]) {
      acc[group] = [];
    }

    acc[group].push(element);
    return acc;
  }, {});

  // Step 2: Dynamically create an AccordionItem for each group
  return (
    <Accordion type="multiple"  className="w-full" defaultValue={Object.keys(elementsByGroup)}>
      {Object.entries(elementsByGroup).map(([groupName, elements]) => (
        <AccordionItem key={groupName} value={groupName} className="px-6 py-0 border-y-[1px]">
          <AccordionTrigger className="!no-underline capitalize">{groupName}</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2">
            {elements.map((element) => (
              <div key={element.id} className="flex flex-col items-center justify-center">
                <PlaceHolder Type={element.id} Icon={element.icon} />
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
