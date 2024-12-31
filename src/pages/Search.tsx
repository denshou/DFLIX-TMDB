import { useEffect, useState } from "react";
import { useSearch } from "../stores/searchStore";
import { getMovieSearch } from "../apis/getSearch";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const handlePosterClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  const searchWord = useSearch((state) => state.searchWord);

  const [searchedMovies, setSearchedMovies] = useState<MovieType[]>([]);

  const searchWordDebounce = useDebounce(searchWord, 300);

  const fetchSearchResults = async (query: string) => {
    try {
      const results = await getMovieSearch(query);
      setSearchedMovies(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchWordDebounce) {
      fetchSearchResults(searchWordDebounce);
    } else {
      setSearchedMovies([]);
    }
  }, [searchWordDebounce]);
  return (
    <div className="px-20">
      <div className="grid grid-cols-9 gap-3">
        {searchedMovies.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer"
            onClick={() => handlePosterClick(movie.id)}
          >
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="object-cover rounded-[4px] max-h-[400px] aspect-[2/3]"
                alt="movie-poster"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
