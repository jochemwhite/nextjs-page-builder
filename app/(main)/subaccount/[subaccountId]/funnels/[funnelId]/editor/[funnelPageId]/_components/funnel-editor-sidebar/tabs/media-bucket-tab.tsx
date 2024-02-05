"use client";
import MediaComponent from "@/components/media";
import { getMedia } from "@/lib/querys";
import { GetMediaFiles } from "@/lib/types";
import React, { useEffect, useState } from "react";

type Props = {
  subaccountId: string;
};

export default function MediaBucketTab({ subaccountId }: Props) {
  const [data, setdata] = useState<GetMediaFiles>(null);
  useEffect(() => {
    const fechtData = async () => {
      const response = await getMedia(subaccountId);
      setdata(response);
    };
    fechtData();
  }, [subaccountId]);

  return (
    <div className="h-[900px] overflow-auto p-4">
      <MediaComponent data={data} subaccountId={subaccountId} />
    </div>
  );
}
