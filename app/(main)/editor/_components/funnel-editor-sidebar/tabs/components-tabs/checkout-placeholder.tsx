import { EditorBtns } from "@/lib/constants";
import Image from "next/image";
import React from "react";

export default function CheckoutPlaceHolder() {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "paymentForm")}
      className="size-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Image
        src="/stripelogo.png"
        height={40}
        width={40}
        alt="stripe logo"
        className="object-cover"
      />
    </div>
  );
}
