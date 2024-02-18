"use client";

import { useEditor } from "@/components/providers/editor/editor-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import usePageEditor from "@/hooks/usePageEditor";
import { upsertFunnelPage } from "@/lib/querys";
import { cn } from "@/lib/utils";
import { DeviceTypes, PageDetails } from "@/types/pageEditor";
import { ArrowLeftCircle, EyeIcon, Laptop, Redo2, Smartphone, Tablet, Undo2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FocusEventHandler, useEffect } from "react";

type Props = {
  funnelId: string;
  funnelPageDetails: PageDetails;
  subaccountId: string;
};

export default function FunnelEditorNavigation({ funnelId, funnelPageDetails, subaccountId }: Props) {
  const router = useRouter();
  const { dispatch, state } = useEditor();
  const { createNewPage, updatePage } = usePageEditor();

  useEffect(() => {
    dispatch({
      type: "SET_FUNNELPAGE_ID",
      payload: {
        funnelPageId: "sadfasf",
      },
    });
  }, [funnelPageDetails]);

  const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = async (event) => {
    if (event.target.value === funnelPageDetails.name) return;
    if (event.target.value) {
      await upsertFunnelPage(
        subaccountId,
        {
          id: "asdfadsf",
          name: event.target.value,
          order: funnelPageDetails.order,
        },
        funnelId
      );
      toast({
        title: "Success",
        description: "Saved Funnel Page title",
      });
      router.refresh();
    } else {
      toast({
        title: "Oppse!",
        description: "You need to have a title",
      });
      event.target.value = funnelPageDetails.name;
    }
  };

  const handlePreviewClick = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };
  const handleUdo = () => {
    dispatch({
      type: "UNDO",
    });
  };
  const handleRedo = () => {
    dispatch({
      type: "REDO",
    });
  };
  const handleOnSave = async () => {
    const content = JSON.stringify(state.editor.elements);
    try {
      const newPage = {
        ...funnelPageDetails,
        content,
      };

      if (funnelPageDetails.$id) {
        try {
          await updatePage(newPage, funnelPageDetails.$id);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await createNewPage(newPage);
        } catch (error) {
          console.log(error);
        }
      }

      toast({ title: "Saved Editor" });
    } catch (error) {
      toast({
        title: "Could not save Page Editor",
        variant: "destructive",
      });
    }
  };
  return (
    <TooltipProvider>
      <nav
        className={cn("border-b-[1px] flex items-center justify-between p-6 gap-2 transition-all", {
          "!h-0 !p-0 !overflow-hidden": state.editor.previewMode,
        })}
      >
        <aside className="flex items-center gap-4 max-w-[206px] w-[300px]">
          <Link href={`/subaccount/${subaccountId}/funnels/${funnelId}`}>
            <ArrowLeftCircle />
          </Link>
          <div className="flex flex-col w-full">
            <Input defaultValue={funnelPageDetails.name} className="border-none h-5 m-0 p-0 text-lg" onBlur={handleOnBlurTitleChange} />
            <span className="text-sm text-muted-foreground">Path: /{funnelPageDetails.pathName}</span>
          </div>
        </aside>
        <aside>
          <Tabs
            defaultValue="Desktop"
            className="w-fit"
            value={state.editor.device}
            onValueChange={(value) => {
              dispatch({
                type: "CHANGE_DEVICE",
                payload: { device: value as DeviceTypes },
              });
            }}
          >
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
              <TabsTrigger value="Desktop" className="data-[state=active]:bg-muted size-10 p-0">
                <Laptop />
              </TabsTrigger>

              <TabsTrigger value="Tablet" className="w-10 h-10 p-0 data-[state=active]:bg-muted">
                <Tablet />
              </TabsTrigger>

              <TabsTrigger value="Mobile" className="w-10 h-10 p-0 data-[state=active]:bg-muted">
                <Smartphone />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </aside>
        <aside className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-slate-800" onClick={handlePreviewClick}>
            <EyeIcon />
          </Button>
          <Button disabled={!(state.history.currentIndex > 0)} onClick={handleUdo} variant="ghost" size="icon" className="hover:bg-slate-800 mr-4">
            <Undo2 />
          </Button>
          <Button
            disabled={!(state.history.currentIndex < state.history.history.length - 1)}
            onClick={handleRedo}
            variant="ghost"
            size="icon"
            className="hover:bg-slate-800 mr-4"
          >
            <Redo2 />
          </Button>
          <div className="flex flex-col items-center mr-4">
            <div className="flex flex-row items-center gap-4">
              Draft
              <Switch disabled defaultChecked={true} />
              Publish
            </div>
            <span className="text-muted-foreground text-sm">
              Laste updated {new Date(funnelPageDetails.updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <Button onClick={handleOnSave}>Save</Button>
        </aside>
      </nav>
    </TooltipProvider>
  );
}
