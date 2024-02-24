import { Element, ElementSidebar } from "@/types/pageEditor";
import { Video } from "lucide-react";
import { v4 } from "uuid";
import VideoComponent from "./video";

const VideoElement: ElementSidebar = {
  group: "elements",
  icon: Video,
  id: "video",
  label: "Video",
  name: "Video",
  defaultPayload: {
    content: {
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=y_Sm2klboPmi5UnT&autoplay=1",
    },
    id: v4(),
    name: "Video",
    styles: {},
    type: "video",
  },
  type: "video",
  component: VideoComponent,
};

export default VideoElement;
