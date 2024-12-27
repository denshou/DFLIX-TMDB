import { useNavigate } from "react-router-dom";
import { useModal } from "../stores/modalStore";
import { useEffect, useState } from "react";
import Close from "../assets/close.svg";
import { useParam } from "../stores/paramStore";
import {
  getMovieCredits,
  getMovieDetail,
  getMovieVideos,
} from "../apis/getMovie";
import YouTubePlayer from "./YouTubePlayer";
import SlickSlideActors from "./SlickSlideActors";

export default function MovieInfo() {
  const navigate = useNavigate();
  const [currentMovie, setCurrentMovie] = useState<MovieDetailType | null>(
    null
  );
  const [actors, setActors] = useState<ActorType[] | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const setMovieModalOpen = useModal((state) => state.setMovieModalOpen);
  const movieId = useParam((state) => state.movieIdParam);
  const setMovieId = useParam((state) => state.setMovieIdParam);

  const handleClose = () => {
    setMovieId(null);
    setMovieModalOpen(false);
    document.body.style.overflow = "auto";
    navigate(-1);
  };
  const getCurrentMovie = async () => {
    if (movieId) {
      try {
        const current = await getMovieDetail(movieId);
        setCurrentMovie(current);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getActors = async () => {
    if (movieId) {
      try {
        const credits = await getMovieCredits(movieId);
        setActors(credits.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getVideos = async () => {
    if (movieId) {
      try {
        const videos = await getMovieVideos(movieId);
        if (videos) setVideoId(videos[0].key);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // URL이 변경되었을 때 모달 상태 처리
  useEffect(() => {
    const handlePopState = () => {
      if (!location.pathname.startsWith("/movie/")) {
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
    }
  }, [movieId]);

  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 bg-[#181818]/50 flex justify-center overflow-y-auto z-[10]"
      onClick={handleClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="w-[916px] min-h-[93%] bg-[#181818] rounded-lg relative text-white mt-10 p-10 pt-20">
          <button
            type="button"
            className="absolute top-4 right-4 bg-[#181818] rounded-full p-[5px]"
            onClick={handleClose}
          >
            <img src={Close} className="w-[30px]" alt="close" />
          </button>
          <div className="flex">
            <div className="rounded-lg overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500/${currentMovie?.poster_path}`}
                className="w-[200px]"
                alt=""
              />
            </div>
            <div>
              <h2>{currentMovie?.title}</h2>
              <h3>{currentMovie?.tagline}</h3>
              <h4>{currentMovie?.original_title}</h4>
              <div className="star">
                <ul className="flex">
                  <li>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#FFD43B" }}
                    ></i>
                  </li>
                  <li>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#FFD43B" }}
                    ></i>
                  </li>
                  <li>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#FFD43B" }}
                    ></i>
                  </li>
                  <li>
                    <i
                      className="fa-duotone fa-solid fa-star-half"
                      style={{ color: "#FFD43B" }}
                    ></i>
                  </li>
                  {/* <li>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#88888B" }}
                    ></i>
                  </li> */}
                </ul>
              </div>
              <div>
                <ul className="flex">
                  {currentMovie?.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
              <ul>
                <li>평점 : {currentMovie?.vote_average} / 10</li>
                <li>개봉일 : {currentMovie?.release_date}</li>
                <li>런타임 : {currentMovie?.runtime} 분</li>
              </ul>
            </div>
          </div>
          <div>공유하기</div>
          <div>{currentMovie?.overview}</div>
          <div className="pt-10 px-10 overflow-hidden">
            {actors ? <SlickSlideActors actors={actors} /> : <></>}
          </div>
          <div>{videoId ? <YouTubePlayer videoId={videoId} /> : <></>}</div>
          <div>포스터/images</div>
          <div>제작진/credits</div>

          <div>끝</div>
        </div>
      </div>
    </div>
  );
}
