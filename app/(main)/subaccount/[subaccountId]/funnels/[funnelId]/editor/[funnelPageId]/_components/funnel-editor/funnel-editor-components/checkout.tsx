"use client";

import Loading from "@/components/global/loading";
import {
  EditorElement,
  useEditor,
} from "@/components/providers/editor/editor-provider";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { EditorBtns } from "@/lib/constants";
import { getFunnel, getSubaccountDetails } from "@/lib/querys";
import { getStripe } from "@/lib/stripe/stripe-client";
import { cn } from "@/lib/utils";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  element: EditorElement;
};

export default function Checkout({ element }: Props) {
  const { dispatch, state, subaccountId, funnelId, pageDetails } = useEditor();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const [livePrices, setLivePrices] = useState([]);
  const [subAccountConnectAccId, setSubAccountConnectAccId] = useState("");
  const options = useMemo(() => ({ clientSecret }), [clientSecret]);
  const styles = element.styles;
  useEffect(() => {
    if (!subaccountId) return;
    const fechtData = async () => {
      const subaccountDetails = await getSubaccountDetails(subaccountId);
      if (!subaccountDetails) return;
      if (!subaccountDetails.connectAccountId) return;
      setSubAccountConnectAccId(subaccountDetails.connectAccountId);
    };
    fechtData();
  }, [subaccountId]);

  useEffect(() => {
    if (!funnelId) return;
    const fechtData = async () => {
      const funnelData = await getFunnel(funnelId);
      setLivePrices(JSON.parse(funnelData?.liveProducts ?? "[]"));
    };
    fechtData();
  }, [funnelId]);

  useEffect(() => {
    if (!(livePrices.length && subaccountId && subAccountConnectAccId)) return;
    const getClientSecret = async () => {
      try {
        const body = JSON.stringify({
          subAccountConnectAccId,
          prices: livePrices,
          subaccountId,
        });
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/stripe/create-checkout-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          }
        );
        const responseJson = await response.json();
        if (!responseJson) throw new Error("Something went wrong");
        if (responseJson.error) {
          throw new Error(responseJson.error);
        }
        if (responseJson.clientSecret) {
          setClientSecret(responseJson.clientSecret);
        }
      } catch (error: any) {
        toast({
          open: true,
          className: "z-[100000]",
          variant: "destructive",
          title: "Oppse!",
          description: error?.message,
        });
      }
    };
    getClientSecret();
  }, [livePrices, subaccountId, subAccountConnectAccId]);

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleOnCLickBody = (e: React.MouseEvent) => {
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
    if (!(funnelPages.FunnelPages.length > pageDetails.order + 1)) return;
    const nextPage = funnelPages.FunnelPages.find(
      (p) => p.order === pageDetails.order + 1
    );
    if (!nextPage) return;
    router.replace(
      `${process.env.NEXT_PUBLIC_SCHEME}${funnelPages.subDomainName}.${process.env.NEXT_PUBLIC_DOMAIN}/${nextPage.pathName}`
    );
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };
  const isSelectedElement = state.editor.selectedElement.id === element.id;
  const isLiveMode = state.editor.liveMode;
  const isPreview = state.editor.previewMode;
  const canDrag = !isLiveMode || !isPreview;
  return (
    <div
      style={styles}
      draggable={canDrag}
      onDragStart={(e) => handleDragStart(e, "contactForm")}
      onClick={handleOnCLickBody}
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
      {!(options.clientSecret && subAccountConnectAccId) && (
        <div className="w-full h-12 flex items-center text-muted-foreground">
          <p>Not account asocces and products</p>
        </div>
      )}
      <div className="border-none transition-all w-full">
        <div className="flex flex-col gap-4">
          {options.clientSecret && subAccountConnectAccId && (
            <div className="text-white">
              <EmbeddedCheckoutProvider
                stripe={getStripe(subAccountConnectAccId)}
                options={options}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          )}
          {!options.clientSecret && (
            <div className="flex items-center justify-center w-full h-40">
              <Loading />
            </div>
          )}
        </div>
      </div>
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
