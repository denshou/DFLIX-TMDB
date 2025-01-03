import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from "../assets/image1.jpg";
import ArrowLeft from "../assets/arrow-left.svg";
import ArrowRight from "../assets/arrow-right.svg";
import { useModal } from "../stores/modalStore";
import { useNavigate } from "react-router-dom";

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

export default function SlickSlide() {
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
      <div style={{ marginTop: "10px" }}>
        <ul className="list flex justify-end">{dots}</ul>
      </div>
    ),
  };
  const navigate = useNavigate();

  const setMovieModalOpen = useModal((state) => state.setMovieModalOpen);
  const handleSlideClick = () => {
    navigate("/movie/123");
    document.body.style.overflow = "hidden";
    setMovieModalOpen(true);
  };

  return (
    <div className="w-[90%] list-slider">
      <Slider {...settings}>
        <div className="cursor-pointer" onClick={handleSlideClick}>
          <img
            src={`https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg`}
            className="w-full rounded-[4px]"
            alt=""
          />
        </div>
        <div>
          <img src={Image1} className="w-full" alt="" />
        </div>
        <div>
          <img src={Image1} className="w-full" alt="" />
        </div>
        <div>
          <img src={Image1} className="w-full" alt="" />
        </div>
        <div>
          <img src={Image1} className="w-full" alt="" />
        </div>
        <div>
          <img src={Image1} className="w-full" alt="" />
        </div>
        <div>
          <img src={Image1} className="w-full" alt="" />
        </div>
        <div>
          <img src={Image1} className="w-full" alt="" />
        </div>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg`}
            className="w-full rounded-[4px]"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
}
