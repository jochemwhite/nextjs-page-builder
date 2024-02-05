import BlurPage from "@/components/global/blur-page";
import MediaComponent from "@/components/media";
import { getMedia } from "@/lib/querys";

type Props = {
  params: { subaccountId: string };
};

export default async function MediaPage({ params }: Props) {
  const data = await getMedia(params.subaccountId);
  return (
    <BlurPage>
      <MediaComponent data={data} subaccountId={params.subaccountId} />
    </BlurPage>
  );
}
