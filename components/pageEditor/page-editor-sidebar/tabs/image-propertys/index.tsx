"use client";

import { CustomModal } from "@/components/global/custom-modal";
import MediaComponent from "@/components/media";
import { useModal } from "@/providers/modal-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { EditorElement, PropertisElementHandler } from "@/types/pageEditor";
import {
  AlignVerticalJustifyCenter,
  ChevronsLeftRightIcon,
  ExpandIcon,
  ImageIcon,
  LucideImage,
} from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
  handleOnChanges: (e: PropertisElementHandler) => void;
  handleChangeCustomValues: (e: PropertisElementHandler) => void;
  subAccountId: string;
};

export default function ImageProperties({
  element,
  handleChangeCustomValues,
  handleOnChanges,
}: Props) {


  const { setOpen } = useModal();
  const content = !Array.isArray(element.content) ? element.content : null;
  const onOpenModalImages = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(
      <CustomModal title="Your images" subheading="Copy or upload your images">
        <MediaComponent buckedId="658fad6a1cfcc5125a99"  />
      </CustomModal>
    );
  };
  return (
    <>
      <div className=" flex flex-col gap-2 mb-2">
        <Label className="text-muted-foreground">Url image</Label>
        <div className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
          <ImageIcon
            onClick={onOpenModalImages}
            size={40}
            className="cursor-pointer"
          />
          <Input
            placeholder="#FFFFFF"
            id="src"
            onChange={handleChangeCustomValues}
            value={content?.src}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        <Label className="text-muted-foreground">Image Cut</Label>
        <Tabs
          onValueChange={(e) => {
            handleOnChanges({
              target: {
                id: "objectFit",
                value: e,
              },
            });
          }}
          value={element.styles.objectFit?.toString()}
        >
          <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
            <TabsTrigger
              value="cover"
              className="size-10 p-0 data-[state=active]:bg-muted"
            >
              <ExpandIcon size={18} />
            </TabsTrigger>
            <TabsTrigger
              value="contain"
              className="size-10 p-0 data-[state=active]:bg-muted"
            >
              <AlignVerticalJustifyCenter size={18} />
            </TabsTrigger>
            <TabsTrigger
              value="fill"
              className="size-10 p-0 data-[state=active]:bg-muted"
            >
              <LucideImage size={18} />
            </TabsTrigger>
            <TabsTrigger
              value="none"
              className="size-10 p-0 data-[state=active]:bg-muted"
            >
              <ImageIcon size={18} />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </>
  );
}
