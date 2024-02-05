import { EditorBtns } from "@/lib/constants";
import { Youtube } from "lucide-react";
import React from "react";

export default function VideoPlaceholder() {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      onDragStart={(e) => handleDragStart(e, "video")}
      draggable
      className="size-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Youtube size={40} className="text-muted-foreground" />
    </div>
  );
}
