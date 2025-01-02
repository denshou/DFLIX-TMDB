import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowLeft from "../assets/arrow-left.svg";
import ArrowRight from "../assets/arrow-right.svg";
import { useEffect } from "react";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

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

export default function SlickImageSlide({
  imageList,
}: {
  imageList: MovieImageType[];
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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

  const handleImageClick = (imageUrl: string) => {
    // Fancybox.show()를 사용하여 이미지를 모달로 띄운다
    Fancybox.show([
      {
        src: imageUrl,
        type: "image",
      },
    ]);
  };

  useEffect(() => {
    return () => {
      Fancybox.destroy();
    };
  }, [imageList]);

  if (imageList.length < 5)
    return (
      <div className="grid grid-cols-4 gap-2">
        {imageList.map((image, i) => (
          <div key={i}>
            <div className="flex">
              <div
                onClick={() => {
                  handleImageClick(
                    `https://image.tmdb.org/t/p/original${image.file_path}`
                  );
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  className="object-cover rounded-[4px] max-h-[400px] aspect-[2/3]"
                  alt={`movie-image-${i}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="w-[100%] list-slider mt-5">
      <Slider {...settings}>
        {imageList.map((image, i) => (
          <div key={i}>
            <div className="flex">
              <div
                onClick={() => {
                  handleImageClick(
                    `https://image.tmdb.org/t/p/original${image.file_path}`
                  );
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  className="object-cover rounded-[4px] max-h-[400px] aspect-[2/3]"
                  alt={`movie-image-${i}`}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
