"use client";
import ContactUserForm from "@/components/forms/contact-user-form";
import { CustomModal } from "@/components/global/custom-modal";
import { useModal } from "@/components/providers/modal-provider";
import { Button } from "@/components/ui/button";

type Props = {
  subaccountId: string;
};

export default function CreateContactButton({ subaccountId }: Props) {
  const { setOpen } = useModal();
  const handleCreateContact = () => {
    setOpen(
      <CustomModal title="Create contactat" subheading="Create">
        <ContactUserForm subaccountId={subaccountId} />
      </CustomModal>
    );
  };
  return <Button onClick={handleCreateContact}>CreateContactButton</Button>;
}
