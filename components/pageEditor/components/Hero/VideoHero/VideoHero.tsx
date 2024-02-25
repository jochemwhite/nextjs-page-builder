import React from "react";
// import AnimatedTitle from "./AnimatedTitle";
import RightArrow from "@/components/svg/right-arr.svg";
import Image from "next/image";
import { EditorElement } from "@/types/pageEditor";
import { VideoHeroContent } from "./index";
import { useEditor } from "@/providers/editor/editor-provider";

type Props = {
  element: EditorElement<VideoHeroContent>;
};

export default function VideoHero({ element }: Props) {
  const { subtitle, title, videoURL } = element.content;
  const { dispatch, state } = useEditor();

  return (
    <div className="neoh_fn_hero">
      {/* Overlay (of hero header) */}
      <div className="bg_overlay">
        {/* Overlay Color */}
        <div className="bg_color" />
        <div className="overlay_slider vegas-slide vegas-container" style={{ height: `100%` }}>
          <Backround
            mimeType="video/mp4"
            url="https://appwrite.jochemwhite.nl/v1/storage/buckets/65c825ce8e79d2939e99/files/65c832f9bc27b7fd47e9/view?project=658fab9280f434656e3b&mode=admin"
          />
        </div>
      </div>
      <div className="hero_content">
        <div className="container">
          <div className="content">
            <div id="magic" />
            <h4
              className="fn_subtitle"
              contentEditable={!state.editor.liveMode}
              onBlur={(e) => {
                const spanElemtn = e.target;
                dispatch({
                  type: "UPDATE_ELEMENT",
                  payload: {
                    elementDetails: {
                      ...element,
                      content: {
                        ...element.content,
                        subtitle: spanElemtn.textContent,
                      } as VideoHeroContent,
                    },
                  },
                });
              }}
            >
              {subtitle}
            </h4>

            {/* <AnimatedTitle title={title} /> */}
            <h1
              className="fn_title"
              contentEditable={!state.editor.liveMode}
              onBlur={(e) => {
                const spanElemtn = e.target;
                dispatch({
                  type: "UPDATE_ELEMENT",
                  payload: {
                    elementDetails: {
                      ...element,
                      content: {
                        ...element.content,
                        title: spanElemtn.textContent,
                      } as VideoHeroContent,
                    },
                  },
                });
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
      <a href="#about" className="neoh_fn_down magic-hover magic-hover__square">
        <span className="text">Scroll Down</span>
        <span className="icon">{/* <RightArrow /> */}</span>
      </a>
    </div>
  );
}

const Backround = ({ mimeType, url }: { mimeType: string; url: string }) => {
  if (mimeType === "video/mp4") {
    return (
      <video playsInline={true} autoPlay={true} muted={true} loop={true}>
        <source src={url} type="video/mp4" />
      </video>
    );
  }
  return (
    <Image
      src={url}
      alt=""
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
};
