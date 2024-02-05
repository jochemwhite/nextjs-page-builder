"use client";

import {
  deleteSubAccount,
  getSubaccountDetails,
  saveActivityLogsNotification,
} from "@/lib/querys";
import { useRouter } from "next/navigation";

type Props = {
  subaccountId: string;
};

export const DeleteButton = ({ subaccountId }: Props) => {
  const router = useRouter();
  const handleCLick = async () => {
    const response = await getSubaccountDetails(subaccountId);
    await saveActivityLogsNotification({
      agencyId: undefined,
      description: `Deleted a subaccount | ${response?.name}`,
      subaccountId,
    });
    await deleteSubAccount(subaccountId);
    router.refresh();
  };
  return <div onClick={handleCLick}>Delete Sub account</div>;
};
