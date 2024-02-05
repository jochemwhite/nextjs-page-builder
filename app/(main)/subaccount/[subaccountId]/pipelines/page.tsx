import { db } from "@/lib/db";
import { redirect } from "next/navigation";

type Props = {
  params: {
    subaccountId: string;
  };
};
export default async function PipeLines({ params }: Props) {
  const pipelineExists = await db.pipeline.findFirst({
    where: {
      subAccountId: params.subaccountId,
    },
  });
  if (pipelineExists) {
    return redirect(
      `/subaccount/${params.subaccountId}/pipelines/${pipelineExists.id}`
    );
  }
  try {
    const reponse = await db.pipeline.create({
      data: {
        name: "First Pipeline",
        subAccountId: params.subaccountId,
      },
    });
    return redirect(
      `/subaccount/${params.subaccountId}/pipelines/${reponse.id}`
    );
  } catch (error) {
    console.log(error);
  }
  return <div>PipeLines</div>;
}
