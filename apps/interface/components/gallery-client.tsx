"use client";

import dynamic from "next/dynamic";

const GalleryScene = dynamic(
  () =>
    import("@/components/gallery-scene").then((mod) => mod.GalleryScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
        Loading gallery...
      </div>
    ),
  },
);

export function GalleryClient() {
  return <GalleryScene />;
}
