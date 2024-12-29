import { useEffect, useRef } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import { useModal } from "../stores/modalStore";

type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number) => void;
};

export default function YouTubePlayerForModal({
  videoId,
}: {
  videoId: string;
}) {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const detailModalOpen = useModal((state) => state.detailModalOpen);

  const opts = {
    width: "100%",
    height: "100%",
  };

  const handleVideoEnd = (e: YouTubeEvent) => {
    const player = e.target as YouTubePlayer;
    player.seekTo(0);
    player.stopVideo();

    // 비디오가 끝나면 IntersectionObserver 제거
    if (observerRef.current && containerRef.current) {
      observerRef.current.unobserve(containerRef.current);
    }
  };

  const onPlayerReady = (event: YouTubeEvent) => {
    playerRef.current = event.target as YouTubePlayer;
    if (playerRef.current) {
      event.target.mute();
      if (!detailModalOpen) event.target.playVideo();
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (playerRef.current) {
          if (entry.intersectionRatio > 0.5 && !detailModalOpen) {
            playerRef.current.playVideo(); // 비디오 재생
          } else {
            playerRef.current.pauseVideo(); // 비디오 멈춤
          }
        }
      },
      { threshold: [0.5] } // 요소가 50% 이상 보일 때 감지
    );

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current && observerRef.current) {
        observerRef.current.unobserve(containerRef.current);
      }
    };
  }, [detailModalOpen]);

  return (
    //동영상 비율 16:9로 맞추기
    // YouTube 플레이어가 기본적으로 150px로 고정되는 문제를 방지하기 위해 부모와 자식 컨테이너 모두 height: 100%를 정확히 지정합니다.
    <div className="relative w-full pb-[56.25%] h-0" ref={containerRef}>
      <div className="absolute top-0 left-0 w-full h-full">
        <YouTube
          videoId={videoId}
          opts={opts}
          onEnd={handleVideoEnd}
          style={{ width: "100%", height: "100%" }}
          onReady={onPlayerReady}
        />
      </div>
    </div>
  );
}
