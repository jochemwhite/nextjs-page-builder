"use server";

import { PageDetailStorage } from "@/types/database/pages";
import { Query } from "node-appwrite";
import { database } from "./appwrite-server";

export async function getPageData(path: string) {
  const response = await database.listDocuments<PageDetailStorage>("658fabb7b076a84d06d2", "65cf612a10b631f9d906", [Query.equal("pathName", path)]);

  return response;
}
