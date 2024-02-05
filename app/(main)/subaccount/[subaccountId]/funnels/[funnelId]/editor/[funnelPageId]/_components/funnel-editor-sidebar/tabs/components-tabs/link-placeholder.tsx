import { EditorBtns } from "@/lib/constants";
import { Link2Icon } from "lucide-react";
import React from "react";

export default function LinkPLaceholder() {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type == null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "link")}
      className="size-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Link2Icon size={40} className="text-muted-foreground" />
    </div>
  );
}
