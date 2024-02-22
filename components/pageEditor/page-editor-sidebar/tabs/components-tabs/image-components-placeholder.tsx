import { EditorBtns } from "@/lib/constants";
import { ImageIcon } from "lucide-react";
import React from "react";

export default function ImageComponentPlaceHolder() {
  const handleDrapStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type == null) return;
    e.stopPropagation();
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDrapStart(e, "image");
      }}
      className="size-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <ImageIcon size={40} className="text-muted-foreground" />
    </div>
  );
}
