import { useEffect, useState } from "react";
import { getMovies, getTrendingMovies } from "../apis/getMovie";
import SlickSlide from "./SlickSlide";

export default function MovieListContainer({ type }: { type: string }) {
  const [movieList, setMovieList] = useState<MovieType[]>([]);
  let listTitle = "";
  switch (type) {
    case "trending":
      listTitle = "Weekly 영화 TOP 20";
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
        setMovieList(movieList);
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
  return (
    <div className="list-container">
      <h2>{listTitle}</h2>
      <div className="flex flex-col items-center">
        <SlickSlide movieList={movieList} />
      </div>
    </div>
  );
}
