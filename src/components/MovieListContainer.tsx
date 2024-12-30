import { useEffect, useState } from "react";
import { getMovies, getTrendingMovies } from "../apis/getMovie";
import SlickSlide from "./SlickSlide";
import SlickSlideTrend from "./SlickSlideTrend";

import ArrowRight from "../assets/arrow-right.svg";

export default function MovieListContainer({ type }: { type: string }) {
  const [movieList, setMovieList] = useState<MovieType[]>([]);
  let listTitle = "";
  switch (type) {
    case "trending":
      listTitle = "오늘의 영화 TOP 10";
      break;
    case "now_playing":
      listTitle = "현재 상영중인 영화";
      break;
    case "popular":
      listTitle = "인기 영화";
      break;
  }
  const getMovieList = async () => {
    if (type === "trending") {
      try {
        const movieList = await getTrendingMovies();
        setMovieList(movieList.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const movieList = await getMovies(type);
        setMovieList(movieList);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  if (type === "trending")
    return (
      <div className="list-container mb-10">
        <div className="flex justify-center">
          <h2 className="text-[1.4vw] mb-2 w-[90%]">
            <p>{listTitle}</p>
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <SlickSlideTrend movieList={movieList} />
        </div>
      </div>
    );

  return (
    <div className="list-container mb-10">
      <div className="flex justify-center">
        <h2 className="text-[1.4vw] flex mb-2 w-[90%]">
          <p className="cursor-pointer">{listTitle}</p>
          <div className="flex items-center ml-3 cursor-pointer">
            <div className="text-[.9vw]">모두 보기</div>
            <img src={ArrowRight} className="w-[1vw] mt-1" alt="" />
          </div>
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <SlickSlide movieList={movieList} />
      </div>
    </div>
  );
}
