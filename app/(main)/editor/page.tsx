"use client";
import EditorProvider from "@/components/providers/editor/editor-provider";
import FunnelEditor from "./_components/funnel-editor";
import FunnelEditorNavigation from "./_components/funnel-editor-navigation";
import FunnelEditorSidebar from "./_components/funnel-editor-sidebar";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PageDetails } from "@/types/pageEditor";
import usePageEditor from "@/hooks/usePageEditor";

type Props = {
  params: {
    subaccountId: string;
    funnelId: string;
    funnelPageId: string;
  };
};



export default function PageEditor({ params }: Props) {
  const searchParmas = useSearchParams();
  const [pageDetails, setPageDetails] = useState<PageDetails>();
  const { getPageDetails } = usePageEditor();

  useEffect(() => {
    const getPage = async () => {
      const pageID = searchParmas.get("pageID");

      if (pageID) {
        const response = await getPageDetails(pageID);
      
        setPageDetails({
          $id: response.$id,
          name: response.name,
          pathName: response.pathName,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
          visits: response.visits,
          content: response.content,
          order: response.order,
          previewImage: response.previewImage,
          funnelId: response.funnelId,
        });
      }
    };

    getPage();
  }, [searchParmas]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
      <EditorProvider subaccountId={params.subaccountId} funnelId={params.funnelId} pageDetails={pageDetails}>
        <FunnelEditorNavigation funnelId={params.funnelId} funnelPageDetails={pageDetails} subaccountId={params.subaccountId} />
        <div className="h-full flex justify-center">
          <FunnelEditor pageDetails={pageDetails} />
        </div>
        <FunnelEditorSidebar subaccountId={params.subaccountId} />
      </EditorProvider>
    </div>
  );
}
