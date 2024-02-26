"use client";

import { useEditor } from "@/providers/editor/editor-provider";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React from "react";
import TabList from "./tabs";
import SettingsTab from "./tabs/settings-tab";
import MediaBucketTab from "./tabs/media-bucket-tab";
import ComponentSelector from "./tabs/component-selector";
import LayersComponent from "./tabs/layers-component";

type Props = {
  subaccountId: string;
};

export default function PageEditorSidebar() {
  const { state, dispatch } = useEditor();
  return (
    <Sheet open={true} modal={false}>
      <Tabs className="w-full" defaultValue="Settings">
        <SheetContent
          showX={false}
          side="right"
          className={cn("mt-[97px] w-16 z-[80] shadow-none p-0 focus:border-none transition-all overflow-hidden", {
            hidden: state.editor.previewMode,
          })}
        >
          <TabList />
        </SheetContent>
        <SheetContent
          side="right"
          showX={false}
          className={cn("mt-[97px] w-80 z-[40] shadow-none p-0 mr-16 bg-background h-full transition-all overflow-hidden", {
            hidden: state.editor.previewMode,
          })}
        >
          <div className="grid gap-4 h-full pb-36 overflow-y-auto">
            <TabsContent value="Settings">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Styles</SheetTitle>
                <SheetDescription>
                  Show your creativity! You can customize every component as you
                  <span className="font-bold">
                    {state.editor.selectedElement.name}#{state.editor.selectedElement.id.substring(0, 4)}
                  </span>
                </SheetDescription>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>
            <TabsContent value="Media">
              <MediaBucketTab  />
            </TabsContent>
            <TabsContent value="Components">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Components</SheetTitle>
                <SheetDescription>You can drag adn drop components on the canvas</SheetDescription>
              </SheetHeader>
              <ComponentSelector />
            </TabsContent>
            <TabsContent value="Layers">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Layers</SheetTitle>
                <SheetDescription>View the editor in a tree like structure</SheetDescription>
              </SheetHeader>
              <LayersComponent />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
}
