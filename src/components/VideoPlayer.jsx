import React from "react";
import { Play, Video as VideoIcon } from "lucide-react";

export default function VideoPlayer({ video, className = "" }) {
  if (!video || !video.url) {
    return (
      <div className="w-full aspect-video bg-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-400 p-6 border border-dashed border-gray-300">
        <VideoIcon className="w-10 h-10 mb-2 text-gray-300" />
        <p className="text-sm font-medium">No product video demonstration provided.</p>
      </div>
    );
  }

  // Helper to format YouTube URLs into embed URLs
  const getEmbedUrl = (rawUrl) => {
    try {
      if (rawUrl.includes("youtube.com/embed/")) {
        return rawUrl;
      }
      if (rawUrl.includes("youtube.com/watch")) {
        const urlObj = new URL(rawUrl);
        const v = urlObj.searchParams.get("v");
        return `https://www.youtube.com/embed/${v}`;
      }
      if (rawUrl.includes("youtu.be/")) {
        const id = rawUrl.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (rawUrl.includes("vimeo.com/")) {
        const id = rawUrl.split("vimeo.com/")[1]?.split("?")[0];
        return `https://player.vimeo.com/video/${id}`;
      }
      return rawUrl;
    } catch {
      return rawUrl;
    }
  };

  const isEmbed =
    video.type === "embed" ||
    video.url.includes("youtube.com") ||
    video.url.includes("youtu.be") ||
    video.url.includes("vimeo.com");

  return (
    <div className={`w-full overflow-hidden rounded-2xl bg-black shadow-lg border border-gray-800 ${className}`}>
      {video.title && (
        <div className="bg-gray-900/90 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between border-b border-gray-800">
          <span className="flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 text-oranza-500 fill-oranza-500" />
            {video.title}
          </span>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest bg-gray-800 px-2 py-0.5 rounded">
            HD Walkthrough
          </span>
        </div>
      )}

      <div className="relative aspect-video w-full bg-black">
        {isEmbed ? (
          <iframe
            src={getEmbedUrl(video.url)}
            title={video.title || "Product Video Demo"}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <video
            controls
            playsInline
            className="w-full h-full object-contain"
            src={video.url}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}
