import { useParams } from "react-router-dom";
import MovieListContainer from "../components/MovieListContainer";
import { useParam } from "../stores/paramStore";
import { useEffect, useState } from "react";
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
        <MovieListContainer type="trending" />
        <MovieListContainer type="now_playing" />
        <MovieListContainer type="popular" />
      </main>
    </div>
  );
}
