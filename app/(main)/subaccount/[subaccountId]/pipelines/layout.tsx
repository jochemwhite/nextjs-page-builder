import BlurPage from "@/components/global/blur-page";
import React, { ReactNode } from "react";

export default function LayoutPage({ children }: { children: ReactNode }) {
  return <BlurPage>{children}</BlurPage>;
}
