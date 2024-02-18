"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { UpsertFunnelPage } from "./types";

export const getFunnels = async (subacountId: string) => {
  const funnels = await db.funnel.findMany({
    where: { subAccountId: subacountId },
    include: { FunnelPages: true },
  });

  return funnels;
};
export const getFunnel = async (funnelId: string) => {
  const funnel = await db.funnel.findUnique({
    where: {
      id: funnelId,
    },
    include: {
      FunnelPages: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
  return funnel;
};
export const updateFunnelProducts = async (products: string, funnelId: string) => {
  const data = await db.funnel.update({
    where: { id: funnelId },
    data: { liveProducts: products },
  });
  return data;
};
export const upsertFunnelPage = async (subaccountId: string, funnelPage: UpsertFunnelPage, funnelId: string) => {
  if (!subaccountId || !funnelId) return;
  const response = await db.funnelPage.upsert({
    where: { id: funnelPage.id || "" },
    update: { ...funnelPage },
    create: {
      ...funnelPage,
      content: funnelPage.content
        ? funnelPage.content
        : JSON.stringify([
            {
              content: [],
              id: "__body",
              name: "Body",
              styles: { backgroundColor: "white" },
              type: "__body",
            },
          ]),
      funnelId,
    },
  });

  revalidatePath(`/subaccount/${subaccountId}/funnels/${funnelId}`, "page");
  return response;
};
export const deleteFunnelePage = async (funnelPageId: string) => {
  const response = await db.funnelPage.delete({ where: { id: funnelPageId } });

  return response;
};

export const getFunnelPageDetails = async (funnelPageId: string) => {
  const response = await db.funnelPage.findUnique({
    where: {
      id: funnelPageId,
    },
  });
  return response;
};


//Appwrite Code


