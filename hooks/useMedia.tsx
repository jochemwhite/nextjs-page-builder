import React, { useEffect } from "react";
import { storage } from "@/lib/appwrite";
import { Models, Query } from "appwrite";

interface MediaProps {
  bucketID: string;
  search?: string;
}

export default function useMedia({ bucketID, search }: MediaProps) {
  const [mediaFiles, setMediaFiles] = React.useState<Models.File[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  //TODO create debounce function
  useEffect(() => {
    getMediaFiles();
  }, [search]);

  async function getMediaFiles() {
    try {
      const response = await storage.listFiles(bucketID);
      setMediaFiles(response.files);
      console.log(response.files);
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false);
    }
  }

  return { mediaFiles, loading };
}
