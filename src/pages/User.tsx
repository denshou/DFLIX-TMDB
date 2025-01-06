import { useEffect, useState } from "react";
import { useAuth } from "../stores/authStore";
import {
  getFavoriteMovies,
  getFavoriteTVs,
  getWatchlistMovies,
  getWatchlistTVs,
} from "../apis/tmdbApi";
import SlickSlide from "../components/SlickSlide";
import { useParams } from "react-router-dom";
import { useModal } from "../stores/modalStore";
import { useParam } from "../stores/paramStore";
// import ArrowRight from "../assets/arrow-right.svg";

export default function User() {
  const user = useAuth((state) => state.user);
  const [favoriteMovies, setFavoriteMovies] = useState<MovieType[] | null>(
    null
  );
  const [watchlistMovies, setWatchlistMovies] = useState<MovieType[] | null>(
    null
  );
  const [favoriteTVs, setFavoriteTVs] = useState<MovieType[] | null>(null);
  const [watchlistTVs, setWatchlistTVs] = useState<MovieType[] | null>(null);
  useEffect(() => {
    if (!user) return;
    const fetchFavoriteMovies = async () => {
      const fm = await getFavoriteMovies(user.id);
      setFavoriteMovies(fm);
    };
    const fetchWatchlistMovies = async () => {
      const wm = await getWatchlistMovies(user.id);
      setWatchlistMovies(wm);
    };
    const fetchFavoriteTVs = async () => {
      const fm = await getFavoriteTVs(user.id);
      setFavoriteTVs(fm);
    };
    const fetchWatchlistTVs = async () => {
      const wm = await getWatchlistTVs(user.id);
      setWatchlistTVs(wm);
    };

    fetchFavoriteMovies();
    fetchWatchlistMovies();
    fetchFavoriteTVs();
    fetchWatchlistTVs();
  }, []);

  //   const handleMoreClick = () => {
  //       navigate(`/m/favoriteMovies`);
  //   };

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



  return (
    <>
      {/* favorite movies */}
      <div className="list-container mb-10">
        <div className="flex justify-center">
          <h2 className="text-[1.4vw] flex mb-2 w-[90%]">
            <p className="cursor-pointer">Favorite Movies</p>
            {/* <div
            className="flex items-center ml-3 cursor-pointer"
            onClick={handleMoreClick}
          >
            <div className="text-[.9vw]">모두 보기</div>
            <img src={ArrowRight} className="w-[1vw] mt-1" alt="" />
          </div> */}
          </h2>
        </div>
        <div className="flex flex-col items-center">
          {favoriteMovies?.length ? (
            <SlickSlide movieList={favoriteMovies} type="movie" />
          ) : (
            <div className="text-[1.2vw]">Favorite Movies가 비어있습니다.</div>
          )}
        </div>
      </div>
      {/* watchlist movies */}
      <div className="list-container mb-10">
        <div className="flex justify-center">
          <h2 className="text-[1.4vw] flex mb-2 w-[90%]">
            <p className="cursor-pointer">Watchlist Movies</p>
          </h2>
        </div>
        <div className="flex flex-col items-center">
          {watchlistMovies?.length ? (
            <SlickSlide movieList={watchlistMovies} type="movie" />
          ) : (
            <div className="text-[1.2vw]">Watchlist Movies가 비어있습니다.</div>
          )}
        </div>
      </div>
      {/* favorite TVs */}
      <div className="list-container mb-10">
        <div className="flex justify-center">
          <h2 className="text-[1.4vw] flex mb-2 w-[90%]">
            <p className="cursor-pointer">Favorite TVs</p>
          </h2>
        </div>
        <div className="flex flex-col items-center">
          {favoriteTVs?.length ? (
            <SlickSlide movieList={favoriteTVs} type="tv" />
          ) : (
            <div className="text-[1.2vw]">Favorite TVs가 비어있습니다.</div>
          )}
        </div>
      </div>
      {/* watchlist TVs */}
      <div className="list-container mb-10">
        <div className="flex justify-center">
          <h2 className="text-[1.4vw] flex mb-2 w-[90%]">
            <p className="cursor-pointer">Watchlist TVs</p>
          </h2>
        </div>
        <div className="flex flex-col items-center">
          {watchlistTVs?.length ? (
            <SlickSlide movieList={watchlistTVs} type="tv" />
          ) : (
            <div className="text-[1.2vw]">Watchlist TVs가 비어있습니다.</div>
          )}
        </div>
      </div>
    </>
  );
}
