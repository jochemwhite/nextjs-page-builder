"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";
import { HexColorPicker } from "react-colorful";

type Props = {
  color?: string;
  onChange: (value: string) => void;
  children: ReactNode;
};

export const ColorPicker = ({ onChange, color, children }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <HexColorPicker color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
};
