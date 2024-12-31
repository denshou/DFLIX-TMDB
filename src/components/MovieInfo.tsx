import { useNavigate } from "react-router-dom";
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

const { Kakao } = window;

export default function MovieInfo() {
  const navigate = useNavigate();

  const [currentMovie, setCurrentMovie] = useState<MovieDetailType | null>(
    null
  );
  const [actors, setActors] = useState<ActorType[] | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [images, setImages] = useState<MovieImageType[] | null>(null);
  const setMovieModalOpen = useModal((state) => state.setMovieModalOpen);
  const movieId = useParam((state) => state.movieIdParam);
  const setMovieId = useParam((state) => state.setMovieIdParam);

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
      try {
        const current = await getMovieDetails(movieId);
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
        if (videos.length) setVideoId(videos[0].key);
        else setVideoId(null);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getImages = async () => {
    if (movieId) {
      try {
        const backdrops = await getMovieImages(movieId);
        if (backdrops.length) setImages(backdrops);
        else setImages(null);
      } catch (error) {
        console.log(error);
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
        title: `${currentMovie?.title}`,
        imageUrl:
          `https://image.tmdb.org/t/p/w500/${currentMovie?.poster_path}` || "",
        link: {
          mobileWebUrl: `http://localhost:5173/movie/${currentMovie?.id}`,
          webUrl: `http://localhost:5173/movie/${currentMovie?.id}`,
        },
      },
      buttons: [
        {
          title: "페이지로 이동",
          link: {
            mobileWebUrl: `http://localhost:5173/movie/${currentMovie?.id}`,
            webUrl: `http://localhost:5173/movie/${currentMovie?.id}`,
          },
        },
      ],
    });
  };

  // URL이 변경되었을 때 모달 상태 처리
  useEffect(() => {
    const handlePopState = () => {
      if (!location.pathname.includes("/movie/")) {
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
      window.Kakao.init("94330ec1fd217b86d3aec285df24bfb5");
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
          {videoId ? (
            <div className="mb-[56.25%]">
              <div className="absolute top-0 left-0 w-full rounded-lg overflow-hidden">
                <YouTubePlayerForModal videoId={videoId} />
              </div>
            </div>
          ) : (
            <></>
          )}
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
              <h3>{currentMovie?.original_title}</h3>
              <div>
                <ul className="flex">
                  {currentMovie?.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
              <h3>{currentMovie?.tagline}</h3>
              <div className="star">
                {renderStars(currentMovie?.vote_average)}
              </div>
              <ul>
                <li>평점 : {currentMovie?.vote_average} / 10</li>
                <li>개봉일 : {currentMovie?.release_date}</li>
                <li>런타임 : {currentMovie?.runtime} 분</li>
              </ul>
            </div>
          </div>
          <button
            className=" w-[200px] h-[34px] rounded-lg bg-black/30 mt-5 border"
            onClick={handleShareKakao}
          >
            공유하기
          </button>
          <div>{currentMovie?.overview}</div>
          <div>
            <div className="">출연진</div>
            <div className="px-10 overflow-hidden">
              {actors ? <SlickSlideActors actors={actors} /> : <></>}
            </div>
          </div>
          <div className="">
            <p>포토</p>
            <div className="px-10 overflow-hidden">
              {images ? <SlickImageSlide imageList={images} /> : <></>}
            </div>
          </div>
          <div>제작진/credits</div>

          <div>끝</div>
        </div>
      </div>
    </div>
  );
}
