import { useParams } from "react-router-dom";
import MovieListContainer from "../components/MovieListContainer";
import { useParam } from "../stores/paramStore";
import { useEffect, useRef, useState } from "react";
import { useModal } from "../stores/modalStore";
import YouTubePlayer from "../components/YouTubePlayer";
import { getMovieVideos, getTrendingMovies } from "../apis/getMovie";

export default function Main() {
  const { movieId, personId, videoId } = useParams();
  const movieModalOpen = useModal((state) => state.movieModalOpen);
  const setMovieModalOpen = useModal((state) => state.setMovieModalOpen);
  const setMovieIdParam = useParam((state) => state.setMovieIdParam);

  const detailModalOpen = useModal((state) => state.detailModalOpen);
  const setDetailModalOpen = useModal((state) => state.setDetailModalOpen);
  const setPersonIdParam = useParam((state) => state.setPersonIdParam);

  const youtubeModalOpen = useModal((state) => state.youtubeModalOpen);
  const setYoutubeModalOpen = useModal((state) => state.setYoutubeModalOpen);
  const setVideoIdParam = useParam((state) => state.setVideoIdParam);

  const [videoForBanner, setVideoForBanner] = useState<{
    movieId: number;
    key: string;
  } | null>(null);

  useEffect(() => {
    if (!movieId) setMovieIdParam(null);
    else setMovieIdParam(Number(movieId));

    if (movieId && !movieModalOpen) {
      document.body.style.overflow = "hidden";
      setMovieModalOpen(true);
    }
  }, [movieId]);

  useEffect(() => {
    if (!personId) setPersonIdParam(null);
    else setPersonIdParam(Number(personId));

    if (personId && !detailModalOpen) setDetailModalOpen(true);
  }, [personId]);

  useEffect(() => {
    if (!videoId) setVideoIdParam(null);
    else setVideoIdParam(videoId);

    if (videoId && !youtubeModalOpen) setYoutubeModalOpen(true);
  }, [videoId]);

  const getVideoForBanner = async () => {
    try {
      const trendMovies = await getTrendingMovies();
      const videoKeys = await Promise.all(
        trendMovies.map(async (movie: MovieType) => {
          const videos = await getMovieVideos(movie.id);
          return { movieId: movie.id, key: videos[0]?.key || null };
        })
      );
      const filtered = videoKeys.filter(({ key }) => Boolean(key));
      const randomNumber = Math.floor(Math.random() * filtered.length);
      setVideoForBanner(filtered[randomNumber]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideoForBanner();
  }, []);

  //io

  const lastRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // IntersectionObserver 등록
    const io = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => {
          // 관찰 대상이 viewport 안에 들어온 경우
          if (entry.isIntersecting) {
            //하단에 컨테이너 추가
            console.log("hi");
          }
        },
        {
          rootMargin: "0px",
          threshold: [0.01, 0.1, 1],
        }
      );
    });

    if (lastRef.current) {
      io.observe(lastRef.current); // 마지막 아이템을 관찰
    }

    return () => {
      if (lastRef.current) {
        io.unobserve(lastRef.current); // 컴포넌트가 unmount되거나 다른 조건이 발생할 때 옵저버를 해제
      }
    };
  }, []);

  const genres = [
    { type: "movie", id: 28, name: "액션" },
    { type: "movie", id: 12, name: "모험" },
    { type: "movie", id: 16, name: "애니메이션" },
    { type: "movie", id: 35, name: "코미디" },
    { type: "movie", id: 80, name: "범죄" },
    { type: "movie", id: 99, name: "다큐멘터리" },
    { type: "movie", id: 18, name: "드라마" },
    { type: "movie", id: 10751, name: "가족" },
    { type: "movie", id: 14, name: "판타지" },
    { type: "movie", id: 36, name: "역사" },
    { type: "movie", id: 27, name: "공포" },
    { type: "movie", id: 10402, name: "음악" },
    { type: "movie", id: 9648, name: "미스터리" },
    { type: "movie", id: 10749, name: "로맨스" },
    { type: "movie", id: 878, name: "SF" },
    { type: "movie", id: 10770, name: "TV 영화" },
    { type: "movie", id: 53, name: "스릴러" },
    { type: "movie", id: 10752, name: "전쟁" },
    { type: "movie", id: 37, name: "서부" },
    { type: "tv", id: 10759, name: "Action & Adventure" },
    { type: "tv", id: 16, name: "애니메이션" },
    { type: "tv", id: 35, name: "코미디" },
    { type: "tv", id: 80, name: "범죄" },
    { type: "tv", id: 99, name: "다큐멘터리" },
    { type: "tv", id: 18, name: "드라마" },
    { type: "tv", id: 10751, name: "가족" },
    { type: "tv", id: 10762, name: "Kids" },
    { type: "tv", id: 9648, name: "미스터리" },
    { type: "tv", id: 10763, name: "News" },
    { type: "tv", id: 10764, name: "Reality" },
    { type: "tv", id: 10765, name: "Sci-Fi & Fantasy" },
    { type: "tv", id: 10766, name: "Soap" },
    { type: "tv", id: 10767, name: "Talk" },
    { type: "tv", id: 10768, name: "War & Politics" },
    { type: "tv", id: 37, name: "서부" },
  ];

  return (
    <div>
      <div className="mb-10">
        {videoForBanner && (
          <YouTubePlayer
            movieId={videoForBanner.movieId}
            videoId={videoForBanner.key}
          />
        )}
      </div>
      <main>
        <MovieListContainer type="movie" getBy="trending" />
        <MovieListContainer type="movie" getBy="popular" />
        <MovieListContainer
          type="movie"
          getBy="genres"
          genreId={28}
          genreName="액션"
        />
        <MovieListContainer type="tv" getBy="trending" />
        <MovieListContainer type="tv" getBy="popular" />
        <MovieListContainer
          type="tv"
          getBy="genres"
          genreId={16}
          genreName="애니메이션"
        />
        <div ref={lastRef} className="border border-[#141414]"></div>
      </main>
    </div>
  );
}
