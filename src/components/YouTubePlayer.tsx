import { useEffect } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

export default function YouTubePlayer({ videoId }: { videoId: string }) {
  const opts = {
    width: "100%",
    height: "480",
    playerVars: {
      autoplay: 0,
    },
  };
  useEffect(() => {}, []);
  const handleVideoEnd = (e: YouTubeEvent) => {
    e.target.seekTo(0);
    e.target.stopVideo();
  };
  return (
    <>
      <YouTube videoId={videoId} opts={opts} onEnd={handleVideoEnd}></YouTube>
    </>
  );
}
