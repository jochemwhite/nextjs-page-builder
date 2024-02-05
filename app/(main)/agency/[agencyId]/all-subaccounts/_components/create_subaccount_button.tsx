"use client";

import SubAccountDetails from "@/components/forms/subaccount-details";
import { CustomModal } from "@/components/global/custom-modal";
import { useModal } from "@/components/providers/modal-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Agency, User, SubAccount, AgencySidebarOption } from "@prisma/client";
import { PlusCircle } from "lucide-react";

type Props = {
  user: User & {
    Agency:
      | (
          | Agency
          | (null & {
              SubAccount: SubAccount[];
              SideBarOption: AgencySidebarOption[];
            })
        )
      | null;
  };
  id: string;
  className: string;
};

export const CreateSubAccountButton = ({ className, id, user }: Props) => {
  const { setOpen } = useModal();
  const agencyDetails = user.Agency;
  if (!agencyDetails) return null;

  const onClick = () => {
    setOpen(
      <CustomModal
        title="Create a SubAccount "
        subheading="You can switch bettwen"
      >
        <SubAccountDetails
          agencyDetails={agencyDetails}
          userId={user.id}
          userName={user.name}
        />
      </CustomModal>
    );
  };

  return (
    <Button className={cn("w-full flex gap-4", className)} onClick={onClick}>
      <PlusCircle />
      Create Sub Account
    </Button>
  );
};
