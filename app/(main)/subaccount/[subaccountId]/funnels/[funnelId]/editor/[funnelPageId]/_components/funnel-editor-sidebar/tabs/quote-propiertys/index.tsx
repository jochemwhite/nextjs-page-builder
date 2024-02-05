import { EditorElement } from "@/components/providers/editor/editor-provider";
import { PropertisElementHandler } from "@/lib/types";
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
