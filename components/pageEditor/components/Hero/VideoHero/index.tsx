import { ElementSidebar } from "@/types/pageEditor";
import { TypeIcon, Video } from "lucide-react";
import { v4 } from "uuid";
import VideoHeroComponent from "./VideoHero";

export interface VideoHeroContent {
  subtitle: string;
  title: string;
  videoURL: string;
}

const VideoHero: ElementSidebar<VideoHeroContent> = {
  icon: TypeIcon,
  group: "hero",
  id: v4(),
  label: "Video Hero",
  name: "Video Hero",
  type: "Video Hero",
  defaultPayload: {
    content: {
      subtitle: "Subtitle",
      title: "Title",
      videoURL:
        "https://appwrite.jochemwhite.nl/v1/storage/buckets/65c825ce8e79d2939e99/files/65c832f9bc27b7fd47e9/view?project=658fab9280f434656e3b&mode=admin",
    } as VideoHeroContent,
    id: v4(),
    name: "Text",
    styles: {},
    type: "Video Hero",
  },
  component: VideoHeroComponent,
};

export default VideoHero;
