import EditorProvider from "@/providers/editor/editor-provider";
import { getPageData } from "@/lib/querys";
import { notFound } from "next/navigation";
import PageEditor from "@/components/pageEditor/editor";

export default async function PagePath({ params }: { params: { path: string } }) {
  const pageDetails = await getPageData(params.path);

  if (!pageDetails || pageDetails.total === 0) {
    return notFound();
  }
  return (
    <EditorProvider pageDetails={pageDetails.documents[0]}>
      <PageEditor pageDetails={pageDetails.documents[0]} liveMode={true} />
    </EditorProvider>
  );
}
