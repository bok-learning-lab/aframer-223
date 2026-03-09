import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-bold tracking-tighter">
          A Project Machine
        </h1>
        <p className="mt-4 text-muted-foreground">
          Two explorations of the image, the gaze, and the space between.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/scroll-story" className="group">
            <Card className="h-full transition-colors border-border/50 hover:border-foreground/30">
              <CardHeader>
                <CardTitle className="text-lg">Scroll Story</CardTitle>
                <CardDescription>
                  A scrolling narrative pairing animated photographs with texts
                  on opacity, privacy, and the ethics of seeing.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/gallery" className="group">
            <Card className="h-full transition-colors border-border/50 hover:border-foreground/30">
              <CardHeader>
                <CardTitle className="text-lg">3D Gallery</CardTitle>
                <CardDescription>
                  Photographs floating in three-dimensional space. Drag to
                  orbit, scroll to zoom.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
