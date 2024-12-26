import { useParams } from "react-router-dom";
import MovieListContainer from "../components/MovieListContainer";
import SlickBannerSlide from "../components/SlickBannerSlide";
import { useParam } from "../stores/paramStore";
import { useEffect } from "react";

import One from "../assets/1.svg";

export default function Main() {
  const { movieId } = useParams();
  const setMovieIdParam = useParam((state) => state.setMovieIdParam);

  useEffect(() => {
    if (!movieId) setMovieIdParam(null);
    else setMovieIdParam(Number(movieId));
  }, [movieId]);
  return (
    <div>
      <div>
        <SlickBannerSlide />
      </div>
      <main>
        <MovieListContainer type="now_playing" />
        <img src={One} alt="" />
        <MovieListContainer type="popular" />
        <MovieListContainer type="trending" />
      </main>
    </div>
  );
}
