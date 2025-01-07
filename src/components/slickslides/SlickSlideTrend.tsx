import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowLeft from "@assets/arrow-left.svg";
import ArrowRight from "@assets/arrow-right.svg";
import { useModal } from "@stores/modalStore";
import { useNavigate } from "react-router-dom";

import One from "@assets/1.svg";
import Two from "@assets/2.svg";
import Three from "@assets/3.svg";
import Four from "@assets/4.svg";
import Five from "@assets/5.svg";
import Six from "@assets/6.svg";
import Seven from "@assets/7.svg";
import Eight from "@assets/8.svg";
import Nine from "@assets/9.svg";
import Ten from "@assets/10.svg";

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

export default function SlickSlideTrend({
  movieList,
  type,
}: {
  movieList: MovieType[] | TVType[];
  type: string;
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
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

  const setMovieModalOpen = useModal((state) => state.setMovieModalOpen);

  const numberIcons = [
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
  ];

  const handleSlideClick = (movieId: number) => {
    if (type === "movie") navigate(`/movie/${movieId}`);
    else navigate(`/tv/${movieId}`);
    document.body.style.overflow = "hidden";
    setMovieModalOpen(true);
  };

  return (
    <div className="w-[90%] list-slider">
      <Slider {...settings}>
        {movieList.map((movie, index) => (
          <div
            key={movie.id}
            className="cursor-pointer"
            onClick={() => handleSlideClick(movie.id)}
          >
            {/* 포스터 이미지 */}
            <div className="relative flex justify-end aspect-[4/3]">
              {/* 숫자 아이콘 */}
              <div className="-z-[1]">
                <img
                  src={numberIcons[index]}
                  className="h-full translate-x-5"
                  alt={`number-${index + 1}`}
                />
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="object-cover rounded-[4px] aspect-[2/3]"
                alt="movie-poster"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
