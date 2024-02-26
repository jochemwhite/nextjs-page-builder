import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function notfound() {
  const images: string[] = ["/memes/mo404.png", "/memes/ron404.png"];

  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-7xl uppercase">404 Page not found</h1>
      <div className="relative h-96 w-96 bg-cover">
        <Image src={randomImage} fill alt="404 page not found" style={{ objectFit: "cover" }} className="rounded-full" />
      </div>
      <Link href="/" className="mt-4">
        <Button>Go back to home</Button>
      </Link>
    </div>
  );
}
