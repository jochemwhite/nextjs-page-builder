"use server";
import { database } from "@/lib/appwrite-server";
import { memberStorage } from "@/types/database/member";

export async function getTeamSection() {
  try {
    const response = await database.listDocuments<memberStorage>("658fabb7b076a84d06d2", "65b88761559a4aa41f38");
    return response.documents;
  } catch (error) {
    console.log("error fetching team members");
  }
}
