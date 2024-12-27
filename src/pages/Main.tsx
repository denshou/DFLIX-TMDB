import { useParams } from "react-router-dom";
import MovieListContainer from "../components/MovieListContainer";
import SlickBannerSlide from "../components/SlickBannerSlide";
import { useParam } from "../stores/paramStore";
import { useEffect } from "react";
import { useModal } from "../stores/modalStore";

export default function Main() {
  const { movieId } = useParams();
  const movieModalOpen = useModal((state) => state.movieModalOpen);
  const setMovieModalOpen = useModal((state) => state.setMovieModalOpen);
  const setMovieIdParam = useParam((state) => state.setMovieIdParam);

  useEffect(() => {
    if (!movieId) setMovieIdParam(null);
    else setMovieIdParam(Number(movieId));

    if (movieId && !movieModalOpen) setMovieModalOpen(true);
  }, [movieId]);
  return (
    <div>
      <div>
        <SlickBannerSlide />
      </div>
      <main>
        <MovieListContainer type="trending" />
        <MovieListContainer type="now_playing" />
        <MovieListContainer type="popular" />
      </main>
    </div>
  );
}
