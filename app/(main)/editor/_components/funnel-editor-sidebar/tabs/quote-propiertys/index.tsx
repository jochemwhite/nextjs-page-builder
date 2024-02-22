import { EditorElement, PropertisElementHandler } from "@/types/pageEditor";
import React from "react";

type Props = {
  element: EditorElement;
  handleOnChanges: (e: PropertisElementHandler) => void;
  handleChangeCustomValues: (e: PropertisElementHandler) => void;
  subAccountId: string;
};

export default function QuotePropiertys({}: Props) {
  return <div>QuotePropiertys</div>;
}
