import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowLeft from "@assets/arrow-left.svg";
import ArrowRight from "@assets/arrow-right.svg";
import { useModal } from "@stores/modalStore";
import { useLocation, useNavigate } from "react-router-dom";
import PosterNotFound from "@assets/poster_not_found.svg";
import { useAuth } from "@stores/authStore";

const CustomPrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{
        ...style,
        height: "99.3%",
        zIndex: 2,
        background: "rgb(20,20,20,0.5)",
        transform: "none",
        top: "0px",
        left: "-5.6%",
        width: "5.5%",
        borderRadius: "0 4px 4px 0",
      }}
      onClick={onClick}
    >
      <img src={ArrowLeft} alt="arrow-left" />
    </button>
  );
};

const CustomNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{
        ...style,
        height: "99%",
        zIndex: 2,
        background: "rgb(20,20,20,0.5)",
        transform: "none",
        top: "0px",
        right: "-5.6%",
        width: "5.5%",
        borderRadius: "4px 0 0 4px",
      }}
      onClick={onClick}
    >
      <img src={ArrowRight} alt="arrow-right" />
    </button>
  );
};

export default function SlickSlide({
  movieList,
  type,
}: {
  movieList: MovieType[] | TVType[] | PersonMovieCreditType[];
  type: string;
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 9,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    swipe: false,

    customPaging: () => <div className={`custom-dot`}></div>,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="list flex justify-end">{dots}</ul>
      </div>
    ),
  };
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAuth((state) => state.user);

  const setMovieModalOpen = useModal((state) => state.setMovieModalOpen);

  const handleSlideClick = (movieId: number) => {
    let targetPath = "";

    if (location.pathname.includes("/user/") && user) {
      targetPath =
        type === "movie"
          ? `/user/${user.id}/movie/${movieId}`
          : `/user/${user.id}/tv/${movieId}`;
    } else {
      targetPath = type === "movie" ? `/movie/${movieId}` : `/tv/${movieId}`;
    }
    navigate(targetPath);

    document.body.style.overflow = "hidden";
    setMovieModalOpen(true);
  };

  if (movieList.length < 10) {
    return (
      <div className="w-[90%] grid grid-cols-9 gap-2">
        {movieList.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer"
            onClick={() => handleSlideClick(movie.id)}
          >
            <div className="flex">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : PosterNotFound
                }
                className="object-cover rounded-[4px] max-h-[400px] aspect-[2/3]"
                alt="movie-poster"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-[90%] list-slider">
      <Slider {...settings}>
        {movieList.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer"
            onClick={() => handleSlideClick(movie.id)}
          >
            <div className="flex">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : PosterNotFound
                }
                className="object-cover rounded-[4px] max-h-[400px] aspect-[2/3]"
                alt="movie-poster"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
