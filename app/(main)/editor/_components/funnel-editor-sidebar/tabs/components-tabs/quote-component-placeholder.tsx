import { EditorBtns } from "@/lib/constants";
import { QuoteIcon } from "lucide-react";
import React from "react";

type Props = {};

export default function QuoteComponentPlaceHolder({}: Props) {
  const handleDrapStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;

    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDrapStart(e, "quote");
      }}
      className="size-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <QuoteIcon size={40} className="text-muted-foreground" />
    </div>
  );
}
