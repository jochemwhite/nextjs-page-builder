"use client";
import { ProgressCircle } from "@tremor/react";
import React, { ReactNode } from "react";

type Props = {
  value: number;
  description: ReactNode;
};

export default function CircleProgress({ value = 0, description }: Props) {
  return (
    <div className="flex gap-4 items-center">
      <ProgressCircle
        showAnimation={true}
        value={value}
        radius={70}
        strokeWidth={20}
      >
        {value}%
      </ProgressCircle>
      <div>
        <b>Closing Rate</b>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
