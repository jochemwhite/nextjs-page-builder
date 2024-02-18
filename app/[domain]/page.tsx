import EditorProvider from "@/components/providers/editor/editor-provider";
import { db } from "@/lib/db";
import { getDomainContent } from "@/lib/querys";
import { notFound } from "next/navigation";
import FunnelEditor from "../(main)/editor/_components/funnel-editor";

export default async function PageDomain({
  params,
}: {
  params: {
    domain: string;
  };
}) {
  const domainData = await getDomainContent(params.domain.slice(0, -1));
  if (!domainData) {
    return notFound();
  }
  const pageData = domainData.FunnelPages.find((page) => !page.pathName);
  if (!pageData) return notFound();
  await db.funnelPage.update({
    where: {
      id: pageData.id,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
  });
  return (
    <EditorProvider
      subaccountId={domainData.subAccountId}
      pageDetails={pageData}
      funnelId={domainData.id}
    >
      <FunnelEditor funnelPageId={pageData.id} liveMode={true} />
    </EditorProvider>
  );
}
