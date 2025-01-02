import { useEffect, useState } from "react";
import { useSearch } from "../stores/searchStore";
import { getMovieSearch } from "../apis/getSearch";
import useDebounce from "../hooks/useDebounce";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../stores/modalStore";
import { useParam } from "../stores/paramStore";
import { getMovies } from "../apis/getMovie";

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
    else setTypeParam(type);
  }, [type]);

  useEffect(() => {
    const getMoreMovies = async () => {
      if (type) {
        try {
          const results = await getMovies(type);
          setSearchedMovies(results);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMoreMovies();
  }, [type]);

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
