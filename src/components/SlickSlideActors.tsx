import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

export default function SlickSlideActors({ actors }: { actors: ActorType[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
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
  const handleSlideClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
    document.body.style.overflow = "hidden";
    setMovieModalOpen(true);
  };

  return (
    <div className="w-[100%] list-slider">
      <Slider {...settings}>
        {actors?.map((actor) => (
          <div key={actor.id}>
            <div className="flex flex-col items-center">
              <div className="w-[72px] h-[72px] rounded-full overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  className="w-[72px] h-[72px] object-cover"
                  alt=""
                />
              </div>
              <p className="text-center">{actor.name}</p>
              <p className="text-center">{actor.character}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
