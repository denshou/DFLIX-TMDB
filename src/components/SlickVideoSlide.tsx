import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowLeft from "../assets/arrow-left.svg";
import ArrowRight from "../assets/arrow-right.svg";
import { useEffect } from "react";

import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useParam } from "../stores/paramStore";

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

export default function SlickVideoSlide({
  videoList,
}: {
  videoList: MovieVideoType[];
}) {
  const navigate = useNavigate();
  const movieId = useParam((state) => state.movieIdParam);
  const location = useLocation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
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

  const handleImageClick = (videoKey: string) => {
    if (location.pathname.includes("/movie/")) {
      navigate(`/movie/${movieId}/videos/${videoKey}`);
    } else navigate(`/tv/${movieId}/videos/${videoKey}`);
  };

  useEffect(() => {
    if (videoList && videoList.length > 68) videoList = videoList.slice(0, 68);
    return () => {};
  }, [videoList]);

  if (videoList && videoList.length < 3)
    return (
      <div className="grid grid-cols-2 gap-2">
        {videoList.map((video, i) => (
          <div key={i}>
            <div className="flex relative cursor-pointer">
              <div
                onClick={() => {
                  handleImageClick(video.key);
                }}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                  className="object-cover rounded-[4px] max-h-[400px] aspect-video"
                  alt={`movie-image-${i}`}
                />
                <i className="fa-solid fa-circle-play fa-2xl absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 opacity-40"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="w-[100%] list-slider mt-5">
      <Slider {...settings}>
        {videoList.map((video, i) => (
          <div key={i}>
            <div className="flex relative cursor-pointer">
              <div
                onClick={() => {
                  handleImageClick(video.key);
                }}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                  className="object-cover rounded-[4px] max-h-[400px]  aspect-video"
                  alt={`movie-image-${i}`}
                />
                <i className="fa-solid fa-circle-play fa-2xl absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 opacity-40"></i>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
