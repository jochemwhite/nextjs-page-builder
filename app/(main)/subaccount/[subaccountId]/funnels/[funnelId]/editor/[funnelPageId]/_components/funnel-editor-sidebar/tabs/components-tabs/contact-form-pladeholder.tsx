import { EditorBtns } from "@/lib/constants";
import { Contact2Icon } from "lucide-react";
import React from "react";

export default function ContactFormComponentPlaceHolder() {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "contactForm")}
      className="size-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Contact2Icon size={40} className="text-muted-foreground" />
    </div>
  );
}
