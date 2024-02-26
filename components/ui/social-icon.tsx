import { Socialmedia } from "@/types/socialMedia";
import React from "react";
import { FaDiscord, FaFacebook, FaInstagram, FaTiktok, FaTwitch, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface Props {
  value: "twitter" | "facebook" | "instagram" | "discord" | "tiktok" | "twitch" | "youtube" | string;
  size?: number;
}

export default function SocialIcon({ value, size }: Props) {
  switch (value) {
    case Socialmedia.Twitter:
      return (
        <span>
          <FaXTwitter size={size} />
        </span>
      );
    case Socialmedia.Facebook:
      return (
        <span>
          <FaFacebook size={size} />
        </span>
      );
    case Socialmedia.Instagram:
      return (
        <span>
          <FaInstagram size={size} />
        </span>
      );
    case Socialmedia.Discord:
      return (
        <span>
          <FaDiscord size={size} />
        </span>
      );
    case Socialmedia.TikTok:
      return (
        <span>
          <FaTiktok size={size} />
        </span>
      );
    case Socialmedia.Twitch:
      return (
        <span>
          <FaTwitch size={size} />
        </span>
      );
    case Socialmedia.YouTube:
      return (
        <span>
          <FaYoutube size={size} />
        </span>
      );

    default:
      return <></>;
  }
}
