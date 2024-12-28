import { useEffect } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

export default function YouTubePlayer({ videoId }: { videoId: string }) {
  const opts = {
    width: "100%",
    height: "100%",
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
    //동영상 비율 16:9로 맞추기
    // YouTube 플레이어가 기본적으로 150px로 고정되는 문제를 방지하기 위해 부모와 자식 컨테이너 모두 height: 100%를 정확히 지정합니다.
    <div className="relative w-full pb-[56.25%] h-0">
      <div className="absolute top-0 left-0 w-full h-full">
        <YouTube
          videoId={videoId}
          opts={opts}
          onEnd={handleVideoEnd}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
