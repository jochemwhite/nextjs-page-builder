import { EditorBtns } from "@/lib/constants";
import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  Type: EditorBtns;
  Icon: LucideIcon;
};

export default function PlaceHolder({ Type, Icon }: Props) {
  const handleDrapStart = (e: React.DragEvent) => {
    if (Type === null) return;

    e.dataTransfer.setData("componentType", Type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDrapStart(e);
      }}
      className="size-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Icon size={40} className="text-muted-foreground" />
    </div>
  );
}
