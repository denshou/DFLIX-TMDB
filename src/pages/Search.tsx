import { useEffect, useState } from "react";
import { useSearch } from "../stores/searchStore";
import { getMovieSearch } from "../apis/getSearch";
import useDebounce from "../hooks/useDebounce";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../stores/modalStore";
import { useParam } from "../stores/paramStore";
import { getMovies } from "../apis/getMovie";

import ArrowDown from "../assets/arrow-down.svg";
import PosterNotFound from "../assets/poster_not_found.svg";

export default function Search() {
  const { movieId, personId, type } = useParams();
  const navigate = useNavigate();

  const movieModalOpen = useModal((state) => state.movieModalOpen);
  const setMovieModalOpen = useModal((state) => state.setMovieModalOpen);
  const setMovieIdParam = useParam((state) => state.setMovieIdParam);

  const detailModalOpen = useModal((state) => state.detailModalOpen);
  const setDetailModalOpen = useModal((state) => state.setDetailModalOpen);
  const setPersonIdParam = useParam((state) => state.setPersonIdParam);

  const setTypeParam = useParam((state) => state.setTypeParam);

  const [page, setPage] = useState(1);

  const handlePosterClick = (movieId: number) => {
    if (type) navigate(`/m/${type}/movie/${movieId}`);
    else navigate(`/search/movie/${movieId}`);
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

  useEffect(() => {
    if (!movieId) setMovieIdParam(null);
    else setMovieIdParam(Number(movieId));

    if (movieId && !movieModalOpen) {
      document.body.style.overflow = "hidden";
      setMovieModalOpen(true);
    }
  }, [movieId]);
  useEffect(() => {
    if (!personId) setPersonIdParam(null);
    else setPersonIdParam(Number(personId));

    if (personId && !detailModalOpen) setDetailModalOpen(true);
  }, [personId]);

  useEffect(() => {
    if (!type) setTypeParam(null);
    else {
      setTypeParam(type);
      setPage(1);
    }
  }, [type]);

  const handleMoreButton = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const getNextPage = async () => {
      if (type && page) {
        try {
          const nextMovies = await getMovies(type, page);
          setSearchedMovies((prev) => {
            const uniqueMovies = nextMovies.filter(
              (newMovie: MovieType) =>
                !prev.some((movie) => movie.id === newMovie.id)
            );
            return [...prev, ...uniqueMovies];
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    getNextPage();
  }, [page, type]);

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
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className="object-cover rounded-[4px] max-h-[400px] aspect-[2/3]"
                  alt="movie-poster"
                />
              ) : (
                <img
                  src={PosterNotFound}
                  className="object-cover rounded-[4px] max-h-[400px] aspect-[2/3]"
                  alt="movie-poster"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="border my-20"></div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleMoreButton}
          className="flex justify-center items-center border-2 rounded-full h-[3rem] w-[3rem] -mt-[6.6rem] bg-[#141414]"
        >
          <img src={ArrowDown} alt="" />
        </button>
      </div>
    </div>
  );
}
