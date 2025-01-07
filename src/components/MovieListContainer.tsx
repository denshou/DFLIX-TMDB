import { useEffect, useState } from "react";
import {
  getMovies,
  getMoviesWithGenres,
  getTrendingMovies,
} from "@apis/getMovie";
import SlickSlide from "./slickslides/SlickSlide";
import SlickSlideTrend from "./slickslides/SlickSlideTrend";

import ArrowRight from "@assets/arrow-right.svg";
import { useNavigate } from "react-router-dom";
import { getTrendingTVs, getTVs, getTVsWithGenres } from "@apis/getTV";

export default function MovieListContainer({
  type,
  getBy,
  genreId = null,
  genreName = null,
}: {
  type: string;
  getBy: string;
  genreId?: number | null;
  genreName?: string | null;
}) {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState<MovieType[] | TVType[]>([]);

  let listTitle = "";
  if (getBy === "trending") {
    if (type === "movie") listTitle = "오늘의 영화 TOP10";
    else listTitle = "오늘의 TV TOP10";
  } else if (getBy === "popular") {
    if (type === "movie") listTitle = "인기있는 영화";
    else listTitle = "인기있는 TV 프로그램";
  } else if (getBy === "genres") {
    if (type === "movie") listTitle = `영화 / ${genreName}`;
    else listTitle = `TV / ${genreName}`;
  }

  const getMovieList = async () => {
    let movieList = [];
    try {
      if (getBy === "trending") {
        movieList = type === "movie" ? await getTrendingMovies() : await getTrendingTVs();
        setMovieList(movieList.slice(0, 10));
      } else if (getBy === "popular") {
        movieList = type === "movie" ? await getMovies(getBy) : await getTVs(getBy);
        setMovieList(movieList);
      } else if (getBy === "genres" && genreId) {
        movieList = type === "movie" ? await getMoviesWithGenres(genreId) : await getTVsWithGenres(genreId);
        setMovieList(movieList);
      }
  
      if (movieList.length === 0) {
        console.log("No movies or TV shows found.");
      }
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  //Search 페이지로 이동
  const handleMoreClick = () => {
    if (getBy === "genres") {
      navigate(`/m/${type}/${genreId}`);
    } else navigate(`/m/${type}/${getBy}`);
  };

  if (getBy === "trending")
    return (
      <div className="list-container mb-10">
        <div className="flex justify-center">
          <h2 className="text-[1.4vw] mb-2 w-[90%]">
            <p>{listTitle}</p>
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <SlickSlideTrend movieList={movieList} type={type} />
        </div>
      </div>
    );

  return (
    <div className="list-container mb-10">
      <div className="flex justify-center">
        <h2 className="text-[1.4vw] flex mb-2 w-[90%]">
          <p className="cursor-pointer">{listTitle}</p>
          <div
            className="flex items-center ml-3 cursor-pointer"
            onClick={handleMoreClick}
          >
            <div className="text-[.9vw]">모두 보기</div>
            <img src={ArrowRight} className="w-[1vw] mt-1" alt="" />
          </div>
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <SlickSlide movieList={movieList} type={type} />
      </div>
    </div>
  );
}
