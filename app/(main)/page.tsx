"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import usePageEditor from "@/hooks/usePageEditor";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const { createNewPage } = usePageEditor();
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      setLoading(true);
      const response = await createNewPage({
        name: "new page",
        content: null,
        createdAt: new Date(),
        order: 1,
        pathName: "new-page",
        previewImage: null,
        updatedAt: new Date(),
        visits: 0,
      });

      if (!response) {
        setLoading(false);
        throw new Error("Failed to create new page");
      }

      router.push(`/editor/?pageID=${response.$id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
  }

  return (
    <>
      <Button onClick={handleClick}>New Page</Button>;
    </>
  );
}
