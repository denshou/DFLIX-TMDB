import { useEffect, useState } from "react";
import { useSearch } from "@stores/searchStore";
import { getMovieSearch, getPersonSearch, getTVSearch } from "@apis/getSearch";
import useDebounce from "@hooks/useDebounce";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "@stores/modalStore";
import { useParam } from "@stores/paramStore";
import { getMovies, getMoviesWithGenres } from "@apis/getMovie";

import ArrowDown from "@assets/arrow-down.svg";
import PosterNotFound from "@assets/poster_not_found.svg";
import ProfileNotFound from "@assets/profile_not_found.svg";
import { getTVs, getTVsWithGenres } from "@apis/getTV";

export default function Search() {
  const { movieId, personId, type, getBy } = useParams();
  const navigate = useNavigate();

  const movieModalOpen = useModal((state) => state.movieModalOpen);
  const setMovieModalOpen = useModal((state) => state.setMovieModalOpen);
  const setMovieIdParam = useParam((state) => state.setMovieIdParam);

  const detailModalOpen = useModal((state) => state.detailModalOpen);
  const setDetailModalOpen = useModal((state) => state.setDetailModalOpen);
  const setPersonIdParam = useParam((state) => state.setPersonIdParam);

  const setGetByParam = useParam((state) => state.setGetByParam);

  const [page, setPage] = useState(1);
  const [moviePage, setMoviePage] = useState(1);
  const [tvPage, setTVPage] = useState(1);
  const [personPage, setPersonPage] = useState(1);

  const [searchTitle, setSearchTitle] = useState("");
  const movieGenres = [
    {
      id: 28,
      name: "액션",
    },
    {
      id: 12,
      name: "모험",
    },
    {
      id: 16,
      name: "애니메이션",
    },
    {
      id: 35,
      name: "코미디",
    },
    {
      id: 80,
      name: "범죄",
    },
    {
      id: 99,
      name: "다큐멘터리",
    },
    {
      id: 18,
      name: "드라마",
    },
    {
      id: 10751,
      name: "가족",
    },
    {
      id: 14,
      name: "판타지",
    },
    {
      id: 36,
      name: "역사",
    },
    {
      id: 27,
      name: "공포",
    },
    {
      id: 10402,
      name: "음악",
    },
    {
      id: 9648,
      name: "미스터리",
    },
    {
      id: 10749,
      name: "로맨스",
    },
    {
      id: 878,
      name: "SF",
    },
    {
      id: 10770,
      name: "TV 영화",
    },
    {
      id: 53,
      name: "스릴러",
    },
    {
      id: 10752,
      name: "전쟁",
    },
    {
      id: 37,
      name: "서부",
    },
  ];
  const tvGenres = [
    {
      id: 10759,
      name: "Action & Adventure",
    },
    {
      id: 16,
      name: "애니메이션",
    },
    {
      id: 35,
      name: "코미디",
    },
    {
      id: 80,
      name: "범죄",
    },
    {
      id: 99,
      name: "다큐멘터리",
    },
    {
      id: 18,
      name: "드라마",
    },
    {
      id: 10751,
      name: "가족",
    },
    {
      id: 10762,
      name: "Kids",
    },
    {
      id: 9648,
      name: "미스터리",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
    {
      id: 37,
      name: "서부",
    },
  ];

  //
  const handlePosterClick = (movieId: number) => {
    if (getBy) {
      if (type === "movie") navigate(`/m/${getBy}/movie/${movieId}`);
      else if (type === "tv") navigate(`/m/${getBy}/tv/${movieId}`);
    }
  };
  const handleMoviePosterClick = (movieId: number) => {
    navigate(`/search/movie/${movieId}`);
  };
  const handleTVPosterClick = (tvId: number) => {
    navigate(`/search/tv/${tvId}`);
  };
  const handlePersonClick = (personId: number) => {
    navigate(`/search/person/${personId}`);
  };

  const searchWord = useSearch((state) => state.searchWord);

  const [searchedMovies, setSearchedMovies] = useState<MovieType[]>([]);
  const [searchedTVs, setSearchedTVs] = useState<TVType[]>([]);
  const [searchedPeople, setSearchedPeople] = useState<PersonDetailType[]>([]);

  const searchWordDebounce = useDebounce(searchWord, 300);

  const fetchSearchResults = async (query: string) => {
    try {
      const moviesResult = await getMovieSearch(query);
      const tvsResult = await getTVSearch(query);
      const peopleResult = await getPersonSearch(query);
      setSearchedMovies(moviesResult);
      setSearchedTVs(tvsResult);
      setSearchedPeople(peopleResult);
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

    if (personId && !detailModalOpen) {
      document.body.style.overflow = "hidden";
      setDetailModalOpen(true);
    }
  }, [personId]);

  useEffect(() => {
    if (!getBy) setGetByParam(null);
    else {
      setGetByParam(getBy);
      setPage(1);
    }
  }, [getBy]);

  const handleMoreButton = () => {
    setPage((prev) => prev + 1);
  };
  const handleMoreMoviesButton = () => {
    setMoviePage((prev) => prev + 1);
  };
  const handleMoreTVsButton = () => {
    setTVPage((prev) => prev + 1);
  };
  const handleMorePeopleButton = () => {
    setPersonPage((prev) => prev + 1);
  };

  //정리
  useEffect(() => {
    const getNextPage = async () => {
      if (
        page &&
        !location.pathname.includes("/search") &&
        !isNaN(Number(getBy))
      ) {
        if (type === "movie") {
          try {
            const nextMovies = await getMoviesWithGenres(Number(getBy), page);
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
        } else if (type === "tv") {
          try {
            const nextMovies = await getTVsWithGenres(Number(getBy), page);
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
      } else if (getBy) {
        if (type === "movie") {
          try {
            const nextMovies = await getMovies(getBy, page);
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
        } else if (type === "tv") {
          try {
            const nextMovies = await getTVs(getBy, page);
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
      }
    };
    getNextPage();
  }, [page, getBy]);

  useEffect(() => {
    const getMoreSearchedMovies = async () => {
      try {
        const nextMovies = await getMovieSearch(searchWordDebounce, moviePage);
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
    };
    if (location.pathname.includes("/search")) {
      getMoreSearchedMovies();
    }
  }, [moviePage]);

  useEffect(() => {
    const getMoreSearchedTVs = async () => {
      try {
        const nextTVs = await getTVSearch(searchWordDebounce, tvPage);
        setSearchedTVs((prev) => {
          const uniqueTVs = nextTVs.filter(
            (newTV: TVType) => !prev.some((tv) => tv.id === newTV.id)
          );
          return [...prev, ...uniqueTVs];
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (location.pathname.includes("/search")) {
      getMoreSearchedTVs();
    }
  }, [tvPage]);

  useEffect(() => {
    const getMoreSearchedPeople = async () => {
      try {
        const nextPeople = await getPersonSearch(
          searchWordDebounce,
          personPage
        );
        setSearchedPeople((prev) => {
          const uniquePeople = nextPeople.filter(
            (newPerson: PersonDetailType) =>
              !prev.some((person) => person.id === newPerson.id)
          );
          return [...prev, ...uniquePeople];
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (location.pathname.includes("/search")) {
      getMoreSearchedPeople();
    }
  }, [personPage]);

  useEffect(() => {
    if (getBy === "popular") {
      if (type === "movie") setSearchTitle("인기있는 영화");
      else setSearchTitle("인기있는 TV 프로그램");
    } else if (type === "movie") {
      movieGenres.forEach((genre) => {
        if (Number(getBy) === genre.id) setSearchTitle(`영화 / ${genre.name}`);
      });
    } else if (type === "tv") {
      tvGenres.forEach((genre) => {
        if (Number(getBy) === genre.id) setSearchTitle(`TV / ${genre.name}`);
      });
    }
  }, [type, getBy]);

  if (!location.pathname.includes("/search")) {
    return (
      <>
        <div className="px-20">
          <h2 className="text-[1.4vw] mb-2 w-[90%]">
            <p>{searchTitle}</p>
          </h2>
          <div className="grid grid-cols-9 gap-3">
            {searchedMovies.map((movie) => (
              <div
                key={movie.id}
                className="cursor-pointer"
                onClick={() => handlePosterClick(movie.id)}
              >
                <div>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : PosterNotFound
                    }
                    className="object-cover rounded-[4px] max-h-[400px] aspect-[2/3]"
                    alt="movie-poster"
                  />
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
      </>
    );
  }

  return (
    <>
      {/* 영화 검색 */}
      <div className="px-20">
        <h2 className="text-[1.4vw] mb-2 w-[90%]">
          <p>영화</p>
        </h2>
        <div className="grid grid-cols-9 gap-3">
          {searchedMovies.map((movie) => (
            <div
              key={movie.id}
              className="cursor-pointer"
              onClick={() => handleMoviePosterClick(movie.id)}
            >
              <div>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : PosterNotFound
                  }
                  className="object-cover rounded-[4px] max-h-[400px] aspect-[2/3]"
                  alt="movie-poster"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="border my-20"></div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleMoreMoviesButton}
            className="flex justify-center items-center border-2 rounded-full h-[3rem] w-[3rem] -mt-[6.6rem] bg-[#141414]"
          >
            <img src={ArrowDown} alt="" />
          </button>
        </div>
      </div>
      {/* tv검색 */}
      <div className="px-20">
        <h2 className="text-[1.4vw] mb-2 w-[90%]">
          <p>TV</p>
        </h2>
        <div className="grid grid-cols-9 gap-3">
          {searchedTVs.map((tv) => (
            <div
              key={tv.id}
              className="cursor-pointer"
              onClick={() => handleTVPosterClick(tv.id)}
            >
              <div>
                <img
                  src={
                    tv.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
                      : PosterNotFound
                  }
                  className="object-cover rounded-[4px] max-h-[400px] aspect-[2/3]"
                  alt="tv-poster"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="border my-20"></div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleMoreTVsButton}
            className="flex justify-center items-center border-2 rounded-full h-[3rem] w-[3rem] -mt-[6.6rem] bg-[#141414]"
          >
            <img src={ArrowDown} alt="" />
          </button>
        </div>
      </div>
      {/* 인물 검색 */}
      <div className="px-20">
        <h2 className="text-[1.4vw] mb-2 w-[90%]">
          <p>인물</p>
        </h2>
        <div className="grid grid-cols-9 gap-3">
          {searchedPeople.map((person) => (
            <div
              key={person.id}
              className="cursor-pointer"
              onClick={() => handlePersonClick(person.id)}
            >
              <div>
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                      : ProfileNotFound
                  }
                  className="object-cover rounded-[4px] max-h-[400px] aspect-[2/3]"
                  alt="person-profile"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="border my-20"></div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleMorePeopleButton}
            className="flex justify-center items-center border-2 rounded-full h-[3rem] w-[3rem] -mt-[6.6rem] bg-[#141414]"
          >
            <img src={ArrowDown} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
