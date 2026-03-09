"use client";

import dynamic from "next/dynamic";

const GalleryScene = dynamic(
  () =>
    import("@/components/gallery-scene").then((mod) => mod.GalleryScene),
  { ssr: false },
);

export function GalleryClient() {
  return <GalleryScene />;
}
