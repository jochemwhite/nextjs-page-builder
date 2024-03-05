"use client";
import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import SocialIcon from "./social-icon";
import { socialMediaType } from "@/schema/socialMedia";
import { storage } from "@/lib/appwrite";

interface TeamCardProps {
  name?: string;
  description?: string;
  img?: { bucketID: string; imageID: string };
  socials: socialMediaType[];
}

export default function MemberCard({ name, description, img, socials }: TeamCardProps) {
  const StyledUl = styled.ul`
    position: relative;
    margin: 0;
    padding: 6px 0;
    list-style-type: none;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
    background-color: #252525;
    margin-left: -8px;
    position: relative;
    transition: all 0.3s ease;

    &:before {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-color: transparent;
      transition: all 0.3s ease;
      border-width: 0 0 40px 12px;
      border-bottom-color: #252525;
      right: 100%;
      top: 0;
    }

    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-color: transparent;
      transition: all 0.3s ease;
      border-width: 40px 0 0 12px;
      border-left-color: #252525;
      left: 100%;
      top: 0;
    }
    li {
      margin: 5px 0 5px 8px;
    }
    a {
      color: #777;
      font-size: 18px;
      display: -moz-flex;
      display: -ms-flex;
      display: -o-flex;
      display: flex;
      -ms-align-items: center;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      text-align: center;
      padding: 0 2px;
    }
  `;

  const imgURL = img
    ? storage.getFilePreview(img.bucketID, img.imageID, 320, 320) && storage.getFilePreview(img.bucketID, img.imageID, 320, 320).href
    : "/teamMembers/placeholder.jpg";

  

  return (
    <div className="border-2 border-var(--extra-color) rounded-lg transition-all duration-300 ease">
      <div className="px-[40px] py-[40px] pt-[20px] text-center">
        <div className="w-full max-w-240 mx-auto mb-[26px]">

          <Image
            src={imgURL}
            alt="person Placeholder"
            width={320}
            height={320}
            className="w-full h-full object-cover rounded-full"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </div>
        <div className="w-full">
          <h3 className="m-0 p-0 text-[22px] font-medium mb-[8px]">{name ? name : "Jochemwhite"}</h3>
          <p className="text-[18px]">{description ? description : "Jochem Van Der Wit"}</p>
        </div>
      </div>
      <div className=" w-full px-[40px]">
        <StyledUl>
          {socials &&
            socials
              .sort((a, b) => a.value.localeCompare(b.value))
              .map((social) => (
                <li key={social.value}>
                  <a href={social.href} target="_blank" rel="noreferrer">
                    <SocialIcon value={social.value.toLocaleLowerCase()} />
                  </a>
                </li>
              ))}
        </StyledUl>
      </div>
    </div>
  );
}
