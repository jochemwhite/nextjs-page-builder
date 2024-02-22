import FunnelEditor from "@/app/(main)/editor/_components/funnel-editor";
import EditorProvider from "@/components/providers/editor/editor-provider";
import { getPageData } from "@/lib/querys";
import { notFound } from "next/navigation";

export default async function PagePath({ params }: { params: { path: string } }) {
  const pageDetails = await getPageData(params.path)
  
  if (!pageDetails || pageDetails.total === 0 ) {
    return notFound();
  }
  return (
    <EditorProvider
      subaccountId="sdf"
      pageDetails={pageDetails.documents[0]}
      funnelId="sdf"
    >
      <FunnelEditor pageDetails={pageDetails.documents[0]} liveMode={true} />
    </EditorProvider>

  );
}
