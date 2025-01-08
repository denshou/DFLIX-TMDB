import { useEffect, useState } from "react";
import { useAuth } from "@stores/authStore";
import {
  getFavoriteMovies,
  getFavoriteTVs,
  getWatchlistMovies,
  getWatchlistTVs,
} from "@apis/tmdbApi";
import { useParams } from "react-router-dom";
import { useModal } from "@stores/modalStore";
import { useParam } from "@stores/paramStore";
import UserLikeSection from "@components/UserLikeSection";

export default function User() {
  const user = useAuth((state) => state.user);
  const [favoriteMovies, setFavoriteMovies] = useState<MovieType[] | null>(
    null
  );
  const [watchlistMovies, setWatchlistMovies] = useState<MovieType[] | null>(
    null
  );
  const [favoriteTVs, setFavoriteTVs] = useState<TVType[] | null>(null);
  const [watchlistTVs, setWatchlistTVs] = useState<TVType[] | null>(null);
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
      <UserLikeSection
        title="Favorite Movies"
        mediaList={favoriteMovies}
        type="movie"
      />
      <UserLikeSection
        title="Watchlist Movies"
        mediaList={watchlistMovies}
        type="movie"
      />
      <UserLikeSection title="Favorite TVs" mediaList={favoriteTVs} type="tv" />
      <UserLikeSection
        title="Watchlist TVs"
        mediaList={watchlistTVs}
        type="tv"
      />
    </>
  );
}
