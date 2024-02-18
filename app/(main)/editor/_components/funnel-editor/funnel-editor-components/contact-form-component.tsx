"use client";
import ContactForm from "@/components/forms/contact-form";
import {
  EditorElement,
  useEditor,
} from "@/components/providers/editor/editor-provider";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { EditorBtns } from "@/lib/constants";
import {
  getFunnel,
  saveActivityLogsNotification,
  upsertContact,
} from "@/lib/querys";
import { ContactUserFormSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

type Props = {
  element: EditorElement;
};

export default function ContactFormComponent({ element }: Props) {
  const { state, dispatch, subaccountId, funnelId, pageDetails } = useEditor();
  const router = useRouter();
  const styles = element.styles;
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    e.stopPropagation();
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const goToNextPage = async () => {
    if (!state.editor.liveMode) return;
    const funnelPages = await getFunnel(funnelId);
    if (!funnelPages || !pageDetails) return;
    if (funnelPages.FunnelPages.length > pageDetails.order + 1) {
      console.log(funnelPages.FunnelPages.length, pageDetails.order + 1);
      const nextPage = funnelPages.FunnelPages.find(
        (page) => page.order === pageDetails.order + 1
      );
      if (!nextPage) return;
      router.replace(
        `${process.env.NEXT_PUBLIC_SCHEME}${funnelPages.subDomainName}.${process.env.NEXT_PUBLIC_DOMAIN}/${nextPage.pathName}`
      );
    }
  };

  const isSelectedElement = state.editor.selectedElement.id === element.id;
  const isLiveMode = state.editor.liveMode;
  const handleDeleteElement = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };
  const onFormSubmit = async (
    values: z.infer<typeof ContactUserFormSchema>
  ) => {
    if (!state.editor.liveMode) return;
    try {
      const response = await upsertContact({
        ...values,
        subAccountId: subaccountId,
      });
      //WIP CALL TRIGEER ENDPOINT
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `A New contact signed up | ${response?.name}`,
        subaccountId: subaccountId,
      });
      await goToNextPage();
      toast({
        title: "Success",
        description: "SuccesFully Saved your info",
      });
    } catch (error) {
      toast({
        title: "Success",
        description: "Could not sent information",
        variant: "destructive",
      });
    }
  };
  const isPreview = state.editor.previewMode;
  const canDrag = !isLiveMode || !isPreview;
  return (
    <div
      style={styles}
      draggable={canDrag}
      onDragStart={(e) => handleDragStart(e, "contactForm")}
      onClick={handleOnClickBody}
      className={cn(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center",
        {
          "!border-blue-500": isSelectedElement,
          "!border-solid": isSelectedElement,
          "border-dashed border-[1px] border-slate-300": !isLiveMode,
        }
      )}
    >
      {isSelectedElement && !isLiveMode && (
        <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
          {state.editor.selectedElement.name}
        </Badge>
      )}
      <ContactForm
        subTitle="Contact Us"
        title="Want a free quote? We can help you"
        apiCall={onFormSubmit}
      />
      {isSelectedElement && !isLiveMode && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={handleDeleteElement}
          />
        </div>
      )}
    </div>
  );
}
