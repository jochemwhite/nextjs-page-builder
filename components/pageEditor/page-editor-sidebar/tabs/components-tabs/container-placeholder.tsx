import { EditorBtns } from "@/lib/constants";
import React from "react";

export default function ContainerPlaceHolder() {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "container")}
      className="size-14 bg-muted/70 rounded-lg p-2 flex flex-col gap-[4px]"
    >
      <div className="border-dashed boder-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full" />
    </div>
  );
}
