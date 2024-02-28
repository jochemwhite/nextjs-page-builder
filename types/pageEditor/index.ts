// import { EditorBtns } from "@/lib/constants";
import { LucideIcon } from "lucide-react";
import { CSSProperties, ReactNode } from "react";

export interface PageDetails {
  $id: string;
  name: string;
  pathName: string;
  createdAt: Date;
  updatedAt: Date;
  visits: number;
  content: string | null;
  order: number;
  previewImage: string | null;
}

export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";

export type EditorElement <T = any> = {
  id: string;
  styles: CSSProperties;
  name: string;
  type: string | null;
  content: T
    
};
export type QuoteProps = {
  styles?: CSSProperties;
};
export type TypeTextP = "Parrafo" | "Title" | "SubTitle";

export type Editor = {
  liveMode: boolean;
  elements: EditorElement[];
  selectedElement: EditorElement 
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

export type ElementSidebar<T> = {
  icon: LucideIcon;
  label: string;
  id: string;
  name: string;
  type: string;
  group: "layout" | "elements" | "hero" | "twitch" | "youtube" | "discord" 
  defaultPayload: EditorElement<T>;
  component?: ({ element }: {element: EditorElement<T>}) => JSX.Element;
  settings?: ({ element }: {element: EditorElement<T>}) => JSX.Element;
};

export interface Element {
  Placeholder: Placeholder;
}

export interface Placeholder {
  Type: string;
  Icon: LucideIcon;
}
