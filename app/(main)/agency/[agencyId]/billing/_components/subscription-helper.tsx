"use client";
import SubscriptionFormWrapper from "@/components/forms/subscription-forms/subscription-form-wrapper";
import { CustomModal } from "@/components/global/custom-modal";
import { useModal } from "@/components/providers/modal-provider";
import { PricesList } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  prices: PricesList["data"];
  customerId: string;
  planExists: boolean;
};

export default function SubscriptionHelper({
  customerId,
  planExists,
  prices,
}: Props) {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const { setOpen } = useModal();

  useEffect(() => {
    if (!plan) return;
    setOpen(
      <CustomModal
        title="Upgrade Plan!"
        subheading="Get started today to get access to premiun features"
      >
        <SubscriptionFormWrapper
          planExists={planExists}
          customerId={customerId}
        />
      </CustomModal>,
      async () => ({
        plans: {
          defaultPriceId: plan ?? "",
          plans: prices,
        },
      })
    );
  }, [plan]);

  return <div>SubscriptionHelper</div>;
}
