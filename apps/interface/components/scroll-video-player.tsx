"use client";

import { useRef, useEffect, useCallback, useState, type ReactNode } from "react";

interface ScrollVideoPlayerProps {
  videoSrc: string;
  children: ReactNode;
  containerHeight?: string;
}

export function ScrollVideoPlayer({
  videoSrc,
  children,
  containerHeight = "300vh",
}: ScrollVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const rafIdRef = useRef<number>(0);
  const isActiveRef = useRef(false);
  const [videoError, setVideoError] = useState(false);

  const getScrollProgress = useCallback(() => {
    const container = containerRef.current;
    if (!container) return 0;

    const rect = container.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;
    if (scrollableDistance <= 0) return 0;

    const scrolled = -rect.top;
    return Math.max(0, Math.min(1, scrolled / scrollableDistance));
  }, []);

  const tick = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || !isActiveRef.current) return;

    const delta = targetTimeRef.current - video.currentTime;

    if (Math.abs(delta) > 0.01) {
      video.currentTime = video.currentTime + delta * 0.25;
    }

    rafIdRef.current = requestAnimationFrame(tick);
  }, []);

  const handleScroll = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const progress = getScrollProgress();
    targetTimeRef.current = progress * video.duration;
  }, [getScrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          isActiveRef.current = true;
          window.addEventListener("scroll", handleScroll, { passive: true });
          handleScroll();
          rafIdRef.current = requestAnimationFrame(tick);
        } else {
          isActiveRef.current = false;
          window.removeEventListener("scroll", handleScroll);
          cancelAnimationFrame(rafIdRef.current);
        }
      },
      { threshold: 0 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [handleScroll, tick]);

  return (
    <section
      ref={containerRef}
      style={{ height: containerHeight }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="flex w-full h-full">
          {/* Video */}
          <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
            {videoError ? (
              <div className="w-full aspect-video bg-muted/20 rounded-lg flex items-center justify-center text-muted-foreground text-sm border border-border/50">
                Video placeholder
              </div>
            ) : (
              <video
                ref={videoRef}
                src={videoSrc}
                muted
                playsInline
                preload="auto"
                onLoadedData={(e) => {
                  // Force the browser to render the first frame
                  const video = e.currentTarget;
                  video.currentTime = 0.001;
                }}
                onError={() => setVideoError(true)}
                className="w-full aspect-video rounded-lg object-cover"
              />
            )}
          </div>

          {/* Text */}
          <div className="w-80 lg:w-96 flex flex-col justify-center p-6 lg:p-10 overflow-y-auto max-h-screen shrink-0">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
