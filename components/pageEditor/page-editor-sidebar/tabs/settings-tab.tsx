"use client";

import { ColorPicker } from "@/components/global/color-picker";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditor } from "@/providers/editor/editor-provider";
import { PropertisElementHandler } from "@/types/pageEditor";
import {
  AlignCenter,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  ChevronsLeftRightIcon,
  Columns,
  LucideImage,
  Rows,
} from "lucide-react";
import { elements } from "../../components";

export default function SettingsTab() {
  const { dispatch, state } = useEditor();
  const styles = state.editor.selectedElement.styles;

  const handleChangeCustomValues = (e: PropertisElementHandler) => {
    const settingProperty = e.target.id;
    const value = e.target.value;
    const styleObject = {
      [settingProperty]: value,
    };
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleOnChanges = (e: PropertisElementHandler) => {
    const styleSettings = e.target.id;
    const value = e.target.value;
    const styleObject = {
      [styleSettings]: value,
    };
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
  };

  const defaultValueOpacity = [
    typeof state.editor.selectedElement.styles?.opacity === "number"
      ? state.editor.selectedElement.styles?.opacity
      : parseFloat((state.editor.selectedElement.styles?.opacity ?? "0").replace("%", "")) ?? 0,
  ];
  const defulValueBorderRaidus = [
    typeof state.editor.selectedElement.styles.borderRadius === "number"
      ? state.editor.selectedElement.styles.borderRadius
      : parseFloat((state.editor.selectedElement.styles?.borderRadius ?? "0").replace("%", "")) ?? 0,
  ];

  const onChangeColorBg = (color: string) => {
    handleOnChanges({
      target: {
        id: "backgroundColor",
        value: color,
      },
    });
  };

  return (
    <Accordion
      type="multiple"
      className="w-full"
      // defaultValue={["Typography", "Dimesions", "Decorations", "Flexbox"]}
    >
      {elements
        .filter((element) => element.type === state.editor.selectedElement.type)
        .map((element) => (
          <>
            {element.settings && (
              <AccordionItem key={element.id} value={element.label} className="px-6 py-0 border-y-[1px]">
                <AccordionTrigger className="!no-underline">{element.label} Settings</AccordionTrigger>
                <AccordionContent>{element.settings && <element.settings element={state.editor.selectedElement} />}</AccordionContent>
              </AccordionItem>
            )}
          </>
        ))}

      <AccordionItem value="Typography" className="px-6 py-0 border-y-[1px]">
        <AccordionTrigger className="!no-underline">Typography</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Text Aling</p>
            <Tabs
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "textAlign",
                    value: e,
                  },
                });
              }}
              value={styles.textAlign}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger value="left" className="size-10 p-0 data-[state=active]:bg-muted">
                  <AlignLeft size={18} />
                </TabsTrigger>
                <TabsTrigger value="right" className="size-10 p-0 data-[state=active]:bg-muted">
                  <AlignRight size={18} />
                </TabsTrigger>
                <TabsTrigger value="center" className="size-10 p-0 data-[state=active]:bg-muted">
                  <AlignCenter size={18} />
                </TabsTrigger>
                <TabsTrigger value="justify" className="size-10 p-0 data-[state=active]:bg-muted">
                  <AlignJustify size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Font Family</p>
            <Input id="DM Sans" onChange={handleOnChanges} value={styles.fontFamily} />
          </div>
          <div className="flex gap-4">
            <div>
              <Label className="text-muted-foreground">Weight</Label>
              <Select
                onValueChange={(e) => {
                  handleOnChanges({
                    target: {
                      id: "font-weight",
                      value: e,
                    },
                  });
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Font Weights</SelectLabel>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="lighter">Ligth</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-muted-foreground">Size</Label>
              <Input placeholder="px" id="fontSize" onChange={handleOnChanges} value={styles.fontSize} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Dimensions" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Dimensions</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Height</Label>
                    <Input id="height" placeholder="px" onChange={handleOnChanges} value={styles.height} />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Width</Label>
                    <Input placeholder="px" id="width" onChange={handleOnChanges} value={styles.width} />
                  </div>
                </div>
              </div>
              <p>Margin px</p>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input id="marginTop" placeholder="px" onChange={handleOnChanges} value={styles.marginTop || ""} />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input id="marginBottom" placeholder="px" onChange={handleOnChanges} value={styles.marginBottom} />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input id="marginLeft" placeholder="px" onChange={handleOnChanges} value={styles.marginLeft} />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input id="marginRight" placeholder="px" onChange={handleOnChanges} value={styles.marginRight || ""} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Padding px</p>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input placeholder="px" id="paddingTop" onChange={handleOnChanges} value={styles.paddingTop} />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input placeholder="px" id="paddingBottom" onChange={handleOnChanges} value={styles.paddingBottom} />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input placeholder="px" id="paddingLeft" onChange={handleOnChanges} value={styles.paddingLeft} />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input placeholder="px" id="paddingRight" onChange={handleOnChanges} value={styles.paddingRight} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Decorations" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Decorations</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div>
            <Label className="text-muted-foreground">Opacity</Label>
            <div className="flex items-center justify-end">
              <small className="p-2">{defaultValueOpacity}%</small>
            </div>
            <Slider
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "opacity",
                    value: `${e[0]}%`,
                  },
                });
              }}
              defaultValue={defaultValueOpacity}
              max={100}
              step={1}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Border Radius</Label>
            <div className="flex items-center justify-end">
              <small>{defulValueBorderRaidus}px</small>
            </div>
            <Slider
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "borderRadius",
                    value: `${e[0]}px`,
                  },
                });
              }}
              defaultValue={defulValueBorderRaidus}
              max={100}
              step={1}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Color</Label>
            <div className="flex border-[1px] rounded-md overflow-clip">
              <ColorPicker color={state.editor.selectedElement.styles.backgroundColor} onChange={onChangeColorBg}>
                <div
                  className="w-12 cursor-pointer"
                  style={{
                    backgroundColor: state.editor.selectedElement.styles.backgroundColor,
                  }}
                />
              </ColorPicker>
              <Input
                placeholder="#HFI245"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundColor"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.backgroundColor}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Image</Label>
            <div className="flex border-[1px] rounded-md overflow-clip">
              <div
                className="w-12"
                style={{
                  backgroundImage: state.editor.selectedElement.styles.backgroundImage,
                }}
              />
              <Input
                placeholder="url()"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundImage"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.backgroundImage}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Image Position</Label>
            <Tabs
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "backgroundSize",
                    value: e,
                  },
                });
              }}
              value={state.editor.selectedElement.styles.backgroundSize?.toString()}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger value="cover" className="size-10 p-0 data-[state=active]:bg-muted">
                  <ChevronsLeftRightIcon size={18} />
                </TabsTrigger>
                <TabsTrigger value="contain" className="size-10 p-0 data-[state=active]:bg-muted">
                  <AlignVerticalJustifyCenter size={18} />
                </TabsTrigger>
                <TabsTrigger value="auto" className="size-10 p-0 data-[state=active]:bg-muted">
                  <LucideImage size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Flexbox" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Flexbox</AccordionTrigger>
        <AccordionContent>
          <Label className="text-muted-foreground">Justify Content</Label>
          <Tabs
            onValueChange={(e) => {
              handleOnChanges({
                target: {
                  id: "justifyContent",
                  value: e,
                },
              });
            }}
            value={state.editor.selectedElement.styles.justifyContent}
          >
            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
              <TabsTrigger value="space-between" className="size-10 data-[state=active]:bg-muted">
                <AlignHorizontalSpaceBetween size={18} />
              </TabsTrigger>
              <TabsTrigger value="space-evenly" className="size-10 data-[state=active]:bg-muted">
                <AlignHorizontalSpaceAround size={18} />
              </TabsTrigger>
              <TabsTrigger value="center" className="size-10 data-[state=active]:bg-muted">
                <AlignHorizontalJustifyCenterIcon size={18} />
              </TabsTrigger>
              <TabsTrigger value="start" className="size-10 data-[state=active]:bg-muted">
                <AlignHorizontalJustifyStart size={18} />
              </TabsTrigger>
              <TabsTrigger value="end" className="size-10 data-[state=active]:bg-muted">
                <AlignHorizontalJustifyEnd size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Label className="text-muted-foreground">Align Items</Label>
          <Tabs
            onValueChange={(e) => {
              handleOnChanges({
                target: {
                  id: "alignItems",
                  value: e,
                },
              });
            }}
            value={state.editor.selectedElement.styles.alignItems}
          >
            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
              <TabsTrigger value="center" className="size-10 data-[state=active]:bg-muted">
                <AlignVerticalJustifyCenter size={18} />
              </TabsTrigger>
              <TabsTrigger value="normal" className="size-10 data-[state=active]:bg-muted">
                <AlignVerticalJustifyStart size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2 mt-2 mb-2">
            <Input
              className="size-4"
              placeholder="px"
              type="checkbox"
              id="display"
              onChange={(va) => {
                handleOnChanges({
                  target: {
                    id: "display",
                    value: va.target.checked ? "flex" : "block",
                  },
                });
              }}
            />
            <Label className="text-muted-foreground">Flex</Label>
          </div>
          <div className=" flex flex-col gap-2 mt-2">
            <Label className="text-muted-foreground">Direction</Label>
            <Tabs
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "flexDirection",
                    value: e,
                  },
                });
              }}
              value={state.editor.selectedElement.styles.flexDirection}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger value="row" className="size-10 data-[state=active]:bg-muted">
                  <Rows size={18} />
                </TabsTrigger>
                <TabsTrigger value="row-reverse" className="size-10 data-[state=active]:bg-muted">
                  <Rows size={18} />
                </TabsTrigger>
                <TabsTrigger value="column" className="size-10 data-[state=active]:bg-muted">
                  <Columns size={18} />
                </TabsTrigger>
                <TabsTrigger value="column-reverse" className="size-10 data-[state=active]:bg-muted">
                  <Columns size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
