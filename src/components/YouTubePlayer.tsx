import { useEffect, useRef } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import { useModal } from "../stores/modalStore";
import { useNavigate } from "react-router-dom";

type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number) => void;
};

export default function YouTubePlayer({ movieId, videoId }: { movieId:number, videoId: string }) {
  const navigate = useNavigate()
  const playerRef = useRef<YouTubePlayer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const movieModalOpen = useModal((state) => state.movieModalOpen);
  

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
      if (!movieModalOpen) event.target.playVideo();

    }
  };

  const handleDetailButton = ()=>{
    navigate(`/movie/${movieId}`)
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (playerRef.current) {
          if (entry.intersectionRatio > 0.5 && !movieModalOpen) {
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
  }, [movieModalOpen]);


  return (
    //동영상 비율 16:9로 맞추기
    // YouTube 플레이어가 기본적으로 150px로 고정되는 문제를 방지하기 위해 부모와 자식 컨테이너 모두 height: 100%를 정확히 지정합니다.
    <div className="relative w-full pb-[56.25%]" ref={containerRef}>
      <div className="absolute top-0 left-0 w-full h-full">
        <button type="button" onClick={handleDetailButton} className="absolute bottom-60 right-5 border rounded-md px-8 py-2 bg-transparent/30">상세 정보</button>
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
