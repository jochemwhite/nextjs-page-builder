import { Models } from "appwrite";
import { PageDetails } from "../pageEditor";

export interface PageDetailStorage extends Models.Document, PageDetails {}