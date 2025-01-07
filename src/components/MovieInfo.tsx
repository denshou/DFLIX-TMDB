import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../stores/modalStore";
import { useEffect, useState } from "react";
import Close from "../assets/close.svg";
import { useParam } from "../stores/paramStore";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieImages,
  getMovieVideos,
} from "../apis/getMovie";
import SlickSlideActors from "./SlickSlideActors";
import YouTubePlayerForModal from "./YouTubePlayForModal";
import SlickImageSlide from "./SlickImageSlide";
import SlickVideoSlide from "./SlickVideoSlide";
import PosterNotFound from "../assets/poster_not_found.svg";
import {
  getTVCredits,
  getTVDetails,
  getTVImages,
  getTVVideos,
} from "../apis/getTV";
import { useAuth } from "../stores/authStore";
import {
  addFavorite,
  addWatchlist,
  deleteFavorite,
  deleteWatchlist,
  getFavoriteMovies,
  getFavoriteTVs,
  getWatchlistMovies,
  getWatchlistTVs,
} from "../apis/tmdbApi";

const { Kakao } = window;

export default function MovieInfo() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentMovie, setCurrentMovie] = useState<
    MovieDetailType | TVDetailType | null
  >(null);
  const [actors, setActors] = useState<ActorType[] | null>(null);
  const [videos, setVideos] = useState<MovieVideoType[] | null>(null);
  const [images, setImages] = useState<MovieImageType[] | null>(null);
  const setMovieModalOpen = useModal((state) => state.setMovieModalOpen);
  const movieId = useParam((state) => state.movieIdParam);
  const setMovieId = useParam((state) => state.setMovieIdParam);

  const [favoriteIds, setFavoriteIds] = useState<number[] | null>(null);
  const [watchlistIds, setWatchlistIds] = useState<number[] | null>(null);

  const user = useAuth((state) => state.user);

  useEffect(() => {
    const getUserFavorite = async () => {
      if (!user) return;
      if (location.pathname.includes("/movie/")) {
        const fm = await getFavoriteMovies(user.id);
        const wm = await getWatchlistMovies(user.id);
        const fmIds = fm.map((movie: MovieType) => movie.id);
        const wmIds = wm.map((movie: MovieType) => movie.id);
        setFavoriteIds(fmIds);
        setWatchlistIds(wmIds);
      } else if (location.pathname.includes("/tv/")) {
        const ft = await getFavoriteTVs(user.id);
        const wt = await getWatchlistTVs(user.id);
        const ftIds = ft.map((tv: TVType) => tv.id);
        const wtIds = wt.map((tv: TVType) => tv.id);
        setFavoriteIds(ftIds);
        setWatchlistIds(wtIds);
      }
    };
    getUserFavorite();
  }, [currentMovie]);

  const handleClose = () => {
    setMovieId(null);
    setMovieModalOpen(false);
    document.body.style.overflow = "auto";

    // 이전 페이지가 없으면 홈으로 이동
    if (window.history.length > 2) {
      navigate(-1); // 이전 페이지로 이동
    } else {
      navigate("/", { replace: true }); // 홈으로 이동
    }
  };
  const getCurrentMovie = async () => {
    if (movieId) {
      if (location.pathname.includes("/movie/")) {
        try {
          const current = await getMovieDetails(movieId);
          setCurrentMovie(current);
        } catch (error) {
          console.log(error);
        }
      } else if (location.pathname.includes("/tv/")) {
        try {
          const current = await getTVDetails(movieId);
          setCurrentMovie(current);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  const getActors = async () => {
    if (movieId) {
      if (location.pathname.includes("/movie/")) {
        try {
          const credits = await getMovieCredits(movieId);
          setActors(credits.slice(0, 10));
        } catch (error) {
          console.log(error);
        }
      } else if (location.pathname.includes("/tv/")) {
        try {
          const credits = await getTVCredits(movieId);
          setActors(credits.slice(0, 10));
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  const getVideos = async () => {
    if (movieId) {
      if (location.pathname.includes("/movie/")) {
        try {
          const videos = await getMovieVideos(movieId);
          if (videos.length) setVideos(videos);
          else setVideos(null);
        } catch (error) {
          console.log(error);
        }
      } else if (location.pathname.includes("/tv/")) {
        try {
          const videos = await getTVVideos(movieId);
          if (videos.length) setVideos(videos);
          else setVideos(null);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  const getImages = async () => {
    if (movieId) {
      if (location.pathname.includes("/movie/")) {
        try {
          const backdrops = await getMovieImages(movieId);
          if (backdrops.length) setImages(backdrops);
          else setImages(null);
        } catch (error) {
          console.log(error);
        }
      } else if (location.pathname.includes("/tv/")) {
        try {
          const backdrops = await getTVImages(movieId);
          if (backdrops.length) setImages(backdrops);
          else setImages(null);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const renderStars = (rating: number | null | undefined) => {
    if (!rating) return null;

    const fullStars = Math.floor(rating / 2); // 가득 찬 별의 개수
    const halfStar = rating % 2 >= 1 ? 1 : 0; // 반쯤 찬 별 여부

    return (
      <ul className="flex">
        {Array(fullStars)
          .fill(0)
          .map((_, idx) => (
            <li key={`full-${idx}`}>
              <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
            </li>
          ))}
        {halfStar === 1 && (
          <li>
            <i
              className="fa-solid fa-star-half"
              style={{ color: "#FFD43B" }}
            ></i>
          </li>
        )}
      </ul>
    );
  };

  const handleShareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: location.pathname.includes("/movie/")
          ? (currentMovie as MovieDetailType)?.title
          : (currentMovie as TVDetailType)?.name,
        imageUrl:
          `https://image.tmdb.org/t/p/w500/${currentMovie?.poster_path}` || "",
        link: {
          mobileWebUrl: location.pathname.includes("/movie/")
            ? `${import.meta.env.VITE_PUBLIC_URL}/movie/${currentMovie?.id}`
            : `${import.meta.env.VITE_PUBLIC_URL}/tv/${currentMovie?.id}`,
          webUrl: location.pathname.includes("/movie/")
            ? `${import.meta.env.VITE_PUBLIC_URL}/movie/${currentMovie?.id}`
            : `${import.meta.env.VITE_PUBLIC_URL}/tv/${currentMovie?.id}`,
        },
      },
      buttons: [
        {
          title: "페이지로 이동",
          link: {
            mobileWebUrl: location.pathname.includes("/movie/")
              ? `${import.meta.env.VITE_PUBLIC_URL}/movie/${currentMovie?.id}`
              : `${import.meta.env.VITE_PUBLIC_URL}/tv/${currentMovie?.id}`,

            webUrl: location.pathname.includes("/movie/")
              ? `${import.meta.env.VITE_PUBLIC_URL}/movie/${currentMovie?.id}`
              : `${import.meta.env.VITE_PUBLIC_URL}/tv/${currentMovie?.id}`,
          },
        },
      ],
    });
  };

  const handleAddFavorite = async () => {
    if (!user) {
      window.alert("로그인을 해주세요");
      return;
    }
    if (!currentMovie) return;

    if (location.pathname.includes("/movie/"))
      await addFavorite(user?.id!, "movie", currentMovie?.id!);
    else if (location.pathname.includes("/tv/"))
      await addFavorite(user?.id!, "tv", currentMovie?.id!);

    setFavoriteIds((prev) =>
      prev ? [...prev, currentMovie.id] : [currentMovie.id]
    );
  };
  const handleAddWatchlist = async () => {
    if (!user) {
      window.alert("로그인을 해주세요");
      return;
    }
    if (!currentMovie) return;

    if (location.pathname.includes("/movie/"))
      await addWatchlist(user?.id!, "movie", currentMovie?.id!);
    else if (location.pathname.includes("/tv/"))
      await addWatchlist(user?.id!, "tv", currentMovie?.id!);

    setWatchlistIds((prev) =>
      prev ? [...prev, currentMovie.id] : [currentMovie.id]
    );
  };

  const handleDeleteFavorite = async () => {
    if (!user) {
      window.alert("로그인을 해주세요");
      return;
    }
    if (!currentMovie) return;
    if (!favoriteIds) return;

    if (location.pathname.includes("/movie/"))
      await deleteFavorite(user?.id!, "movie", currentMovie?.id!);
    else if (location.pathname.includes("/tv/"))
      await deleteFavorite(user?.id!, "tv", currentMovie?.id!);

    setFavoriteIds((prev) =>
      prev ? prev.filter((id) => id !== currentMovie.id) : []
    );
  };
  const handleDeleteWatchlist = async () => {
    if (!user) {
      window.alert("로그인을 해주세요");
      return;
    }
    if (!currentMovie) return;
    if (!watchlistIds) return;

    if (location.pathname.includes("/movie/"))
      await deleteWatchlist(user?.id!, "movie", currentMovie?.id!);
    else if (location.pathname.includes("/tv/"))
      await deleteWatchlist(user?.id!, "tv", currentMovie?.id!);

    setWatchlistIds((prev) =>
      prev ? prev.filter((id) => id !== currentMovie.id) : []
    );
  };

  // URL이 변경되었을 때 모달 상태 처리
  useEffect(() => {
    const handlePopState = () => {
      if (
        !location.pathname.includes("/movie/") &&
        !location.pathname.includes("/tv/")
      ) {
        setMovieModalOpen(false);
        document.body.style.overflow = "auto";
      }
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname, setMovieModalOpen]);

  useEffect(() => {
    if (movieId) {
      getCurrentMovie();
      getActors();
      getVideos();
      getImages();
    }
  }, [location.pathname, movieId]);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(`${import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY}`);
    }
  }, []);

  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 bg-[#181818]/50 flex justify-center overflow-y-auto z-[100]"
      onClick={handleClose}
    >
      <div>
        <div
          className="w-[916px] min-h-[93%] bg-[#181818] rounded-lg relative text-white mt-10 p-10 pt-20"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="absolute top-4 right-4 bg-[#181818] rounded-full p-[5px] z-50"
            onClick={handleClose}
          >
            <img src={Close} className="w-[30px]" alt="close" />
          </button>
          {videos?.length ? (
            <div className="mb-[56.25%]">
              <div className="absolute top-0 left-0 w-full rounded-lg overflow-hidden">
                <YouTubePlayerForModal videoId={videos[0].key} />
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="flex gap-5">
            <div className="rounded-lg overflow-hidden">
              <img
                src={
                  currentMovie?.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${currentMovie?.poster_path}`
                    : PosterNotFound
                }
                className="w-[200px]"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-4">
              <div>
                {location.pathname.includes("/movie/") ? (
                  <h2 className="text-[22px]">
                    {(currentMovie as MovieDetailType)?.title}
                  </h2>
                ) : (
                  <h2 className="text-[22px]">
                    {(currentMovie as TVDetailType)?.name}
                  </h2>
                )}
                {location.pathname.includes("/movie/") ? (
                  <h3 className="text-[11px]">
                    {(currentMovie as MovieDetailType)?.original_title}
                  </h3>
                ) : (
                  <h3 className="text-[11px]">
                    {(currentMovie as TVDetailType)?.original_name}
                  </h3>
                )}
              </div>
              <div>
                <ul className="flex gap-2">
                  {currentMovie?.genres.map((genre) => (
                    <li
                      key={genre.id}
                      className="border rounded-lg bg-[#1e76dd] px-2 py-[2px] text-[12px]"
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
              <h3 className="text-[14px]">{currentMovie?.tagline}</h3>
              <div className="star">
                {renderStars(currentMovie?.vote_average)}
              </div>
              <ul className="flex flex-col gap-1 text-[15px]">
                <li>
                  <i
                    className="fa-solid fa-star fa-xs mr-1"
                    style={{ color: "#ffffff" }}
                  ></i>
                  평점 : {currentMovie?.vote_average} / 10
                </li>
                <li>
                  <i
                    className="fa-solid fa-film fa-xs mr-1"
                    style={{ color: "#ffffff" }}
                  ></i>
                  {location.pathname.includes("/movie/") ? (
                    <span>
                      개봉일 : {(currentMovie as MovieDetailType)?.release_date}
                    </span>
                  ) : (
                    <span>
                      {(currentMovie as TVDetailType)?.first_air_date} ~{" "}
                      {(currentMovie as TVDetailType)?.last_air_date}
                    </span>
                  )}
                </li>
                <li>
                  <i
                    className="fa-solid fa-clock-rotate-left fa-xs mr-1"
                    style={{ color: "#ffffff" }}
                  ></i>
                  {location.pathname.includes("/movie/") ? (
                    <span>
                      런타임 : {(currentMovie as MovieDetailType)?.runtime} 분
                    </span>
                  ) : (
                    <span>
                      시즌 {(currentMovie as TVDetailType)?.seasons?.length}개
                      에피소드{" "}
                      {(currentMovie as TVDetailType)?.number_of_episodes}개
                    </span>
                  )}
                </li>
              </ul>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={
                    currentMovie && favoriteIds?.includes(currentMovie?.id)
                      ? handleDeleteFavorite // 삭제 기능
                      : handleAddFavorite // 추가 기능
                  }
                  className="border rounded-full w-8 h-8 flex justify-center items-center"
                >
                  {currentMovie && favoriteIds?.includes(currentMovie?.id) ? (
                    <i
                      className="fa-solid fa-heart mt-[1px]"
                      style={{ color: "#F44336" }}
                    ></i>
                  ) : (
                    <i
                      className="fa-regular fa-heart mt-[1px]"
                      style={{ color: "#ffffff" }}
                    ></i>
                  )}
                </button>

                <button
                  type="button"
                  onClick={
                    currentMovie && watchlistIds?.includes(currentMovie?.id)
                      ? handleDeleteWatchlist // 삭제 기능
                      : handleAddWatchlist // 추가 기능
                  }
                  className="border rounded-full w-8 h-8 flex justify-center items-center"
                >
                  {currentMovie && watchlistIds?.includes(currentMovie?.id) ? (
                    <i
                      className="fa-solid fa-check"
                      style={{ color: "#ffffff" }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-plus"
                      style={{ color: "#ffffff" }}
                    ></i>
                  )}
                </button>
              </div>
            </div>
          </div>
          <button
            className=" w-[200px] h-[34px] rounded-lg bg-black/30 my-5 border"
            onClick={handleShareKakao}
          >
            공유하기
          </button>
          <div>{currentMovie?.overview}</div>
          <div className="my-5">
            <p className="text-[18px]">출연진</p>
            <div className="px-10 overflow-hidden">
              {actors ? <SlickSlideActors actors={actors} /> : <></>}
            </div>
          </div>
          {videos && (
            <div className="my-5">
              <p className="text-[18px]">영상</p>
              <div className="px-10 overflow-hidden">
                <SlickVideoSlide videoList={videos} />
              </div>
            </div>
          )}
          {images && (
            <div className="mt-5">
              <p className="text-[18px]">포토</p>
              <div className="px-10 overflow-hidden">
                <SlickImageSlide imageList={images} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
