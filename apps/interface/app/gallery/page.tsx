import { GalleryClient } from "@/components/gallery-client";
import Link from "next/link";

export const metadata = {
  title: "3D Gallery",
};

export default function GalleryPage() {
  return (
    <main className="h-screen w-screen bg-black relative">
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 text-sm text-white/50 hover:text-white transition-colors"
      >
        &larr; Back
      </Link>
      <p className="fixed bottom-6 left-6 z-50 text-xs text-white/30">
        Drag to orbit &middot; Scroll to zoom
      </p>
      <GalleryClient />
    </main>
  );
}
