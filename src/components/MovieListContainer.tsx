import { useEffect, useState } from "react";
import { getMovies, getTrendingMovies } from "../apis/getMovie";
import SlickSlide from "./SlickSlide";
import SlickSlideTrend from "./SlickSlideTrend";

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
      <div className="list-container">
        <h2>{listTitle}</h2>
        <div className="flex flex-col items-center">
          <SlickSlideTrend movieList={movieList} />
        </div>
      </div>
    );

  return (
    <div className="list-container">
      <h2>{listTitle}</h2>
      <div className="flex flex-col items-center">
        <SlickSlide movieList={movieList} />
      </div>
    </div>
  );
}
