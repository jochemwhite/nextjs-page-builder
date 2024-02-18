"use client";
import { ColorPicker } from "@/components/global/color-picker";
import { EditorElement } from "@/components/providers/editor/editor-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertisElementHandler } from "@/lib/types";

type Props = {
  element: EditorElement;
  handleOnChanges: (e: PropertisElementHandler) => void;
  handleChangeCustomValues: (e: PropertisElementHandler) => void;
};

export default function TextPropertys({
  element,
  handleOnChanges,
  handleChangeCustomValues,
}: Props) {
  const data = !Array.isArray(element.content) ? element.content : null;
  return (
    <>
      <Label className="text-muted-foreground">Color Text</Label>
      <div className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
        <ColorPicker
          color={element.styles.color}
          onChange={(e) => {
            handleOnChanges({
              target: {
                value: e,
                id: "color",
              },
            });
          }}
        >
          <div
            className="w-12 cursor-pointer h-10"
            style={{
              backgroundColor: element.styles.color,
            }}
          />
        </ColorPicker>
        <Input
          placeholder="#FFFFFF"
          id="color"
          onChange={handleOnChanges}
          value={element.styles.color}
        />
      </div>
      <Label className="text-muted-foreground mt-2 mb-2">Type Text</Label>
      <Select
        onValueChange={(e) => {
          if (!e) return;
          handleChangeCustomValues({
            target: {
              id: "typeText",
              value: e,
            },
          });
        }}
        value={data?.typeText}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Type Text" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Title" className="text-3xl cursor-pointer">
            Title
          </SelectItem>
          <SelectItem value="SubTitle" className="text-xl cursor-pointer">
            SubTitle
          </SelectItem>
          <SelectItem value="Parrafo" className="cursor-pointer">
            Parrafo
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
