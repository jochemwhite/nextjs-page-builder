"use client";
import MediaComponent from "@/components/media";


import React, { useEffect, useState } from "react";

type Props = {
  subaccountId: string;
};

export default function MediaBucketTab() {

  return (
    <div className="h-full overflow-auto p-4" >
      <MediaComponent buckedId="658fad6a1cfcc5125a99" />
    </div>
  );
}
