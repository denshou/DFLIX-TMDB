import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowLeft from "@assets/arrow-left.svg";
import ArrowRight from "@assets/arrow-right.svg";
import ProfileNotFound from "@assets/profile_not_found.svg";
import { useModal } from "@stores/modalStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useParam } from "@stores/paramStore";
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

export default function SlickSlideActors({ actors }: { actors: ActorType[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
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

  const setDetailModalOpen = useModal((state) => state.setDetailModalOpen);
  const movieId = useParam((state) => state.movieIdParam);
  const getBy = useParam((state) => state.getByParam);

  const handleSlideClick = (actorId: number) => {
    let basePath = "";
    if (location.pathname.includes("/user/") && user) {
      basePath = `/user/${user.id}`;
    } else if (location.pathname.includes("search")) {
      basePath = "/search";
    } else if (location.pathname.includes("/m/")) {
      basePath = `/m/${getBy}`;
    }
    const mediaType = location.pathname.includes("/movie/") ? "movie" : "tv";

    const targetPath = basePath
      ? `${basePath}/${mediaType}/${movieId}/person/${actorId}`
      : `/${mediaType}/${movieId}/person/${actorId}`;

    navigate(targetPath);
    setDetailModalOpen(true);
  };

  if (actors.length < 8) {
    return (
      <div className="flex mt-5 gap-[40px]">
        {actors?.map((actor) => (
          <div key={actor.id} onClick={() => handleSlideClick(actor.id)}>
            <div className="flex flex-col items-center">
              <div className="w-[72px] h-[72px] rounded-full overflow-hidden">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                      : ProfileNotFound
                  }
                  className="w-[72px] h-[72px] object-cover"
                  alt=""
                />
              </div>
              <p className="text-center text-[12px] break-keep">{actor.name}</p>
              <p className="text-center text-[10px] text-[#999999]">
                {actor.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-[100%] list-slider mt-5">
      <Slider {...settings}>
        {actors?.map((actor) => (
          <div key={actor.id} onClick={() => handleSlideClick(actor.id)}>
            <div className="flex flex-col items-center">
              <div className="w-[72px] h-[72px] rounded-full overflow-hidden">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    className="w-[72px] h-[72px] object-cover"
                    alt=""
                  />
                ) : (
                  <img
                    src={ProfileNotFound}
                    className="w-[72px] h-[72px] object-cover"
                    alt=""
                  />
                )}
              </div>
              <p className="text-center text-[12px] break-keep">{actor.name}</p>
              <p className="text-center text-[10px] text-[#999999]">
                {actor.character}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
