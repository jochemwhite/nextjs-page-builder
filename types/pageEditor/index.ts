import { EditorBtns } from "@/lib/constants";
import { CSSProperties, ReactNode } from "react";

export interface PageDetails {

  name: string;
  pathName: string;
  createdAt: Date;
  updatedAt: Date;
  visits: number;
  content: string | null;
  order: number;
  previewImage: string | null

}

export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";

export type EditorElement = {
  id: string;
  styles: CSSProperties;
  name: string;
  type: EditorBtns;
  content:
    | EditorElement[]
    | {
        href?: string;
        innerText?: string;
        src?: string;
        typeText?: TypeTextP;
        quoteStyles?: QuoteProps;
      };
};
export type QuoteProps = {
  styles?: CSSProperties;
};
export type TypeTextP = "Parrafo" | "Title" | "SubTitle";

export type Editor = {
  liveMode: boolean;
  elements: EditorElement[];
  selectedElement: EditorElement;
  device: DeviceTypes;
  previewMode: boolean;
  
};

export type HistoryState = {
  history: Editor[];
  currentIndex: number;
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
};


export type EditorContextData = {
  device: DeviceTypes;
  previewMode: boolean;
  setPreviewMode: (previewMode: boolean) => void;
  setDevice: (device: DeviceTypes) => void;
};

export type EditorProps = {
  children: ReactNode;
  pageDetails: PageDetails;
};

export type PropertisElementHandler = {
  target: {
    id: string;
    value: string;
  };
};