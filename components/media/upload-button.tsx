"use client";

import { useModal } from "@/components/providers/modal-provider";
import { Button } from "@/components/ui/button";
import { CustomModal } from "@/components/global/custom-modal";
import UploadMediaForm from "@/components/forms/uplod-media-form";

type Props = {
  subaccountId: string;
};

export default function MediaUploadButton({ subaccountId }: Props) {
  const { isOpen, setOpen, setClose } = useModal();
  const onClick = () => {
    setOpen(
      <CustomModal
        title="Upload Media"
        subheading="Upload a file to your media Bucket"
      >
        <UploadMediaForm subaccountId={subaccountId} />
      </CustomModal>
    );
  };
  return <Button onClick={onClick}>Upload</Button>;
}
