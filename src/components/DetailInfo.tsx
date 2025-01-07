import { useNavigate } from "react-router-dom";
import { useModal } from "../stores/modalStore";
import { useEffect, useState } from "react";
import Close from "../assets/close.svg";
import PosterNotFound from "../assets/poster_not_found.svg";
import { useParam } from "../stores/paramStore";
import ProfileNotFound from "../assets/profile_not_found.svg";

import {
  getPersonDetails,
  getPersonMovieCredits,
  getPersonTVCredits,
} from "../apis/getPerson";
import { useAuth } from "../stores/authStore";

export default function DetailInfo() {
  const navigate = useNavigate();

  const user = useAuth((state) => state.user);

  const movieModalOpen = useModal((state) => state.movieModalOpen);
  const setDetailModalOpen = useModal((state) => state.setDetailModalOpen);

  const personId = useParam((state) => state.personIdParam);
  const setPersonId = useParam((state) => state.setPersonIdParam);

  const [currentPerson, setCurrentPerson] = useState<PersonDetailType | null>(
    null
  );
  const [currentPersonMovieCredits, setCurrentPersonMovieCredits] = useState<
    PersonMovieCreditType[] | null
  >(null);
  const [currentPersonTVCredits, setCurrentPersonTVCredits] = useState<
    PersonTVCreditType[] | null
  >(null);

  const [showAllMovies, setShowAllMovies] = useState(false); // 영화 전체 보기 상태
  const [showAllTVs, setShowAllTVs] = useState(false); // TV 전체 보기 상태

  const handleClose = () => {
    if (!movieModalOpen) document.body.style.overflow = "auto";
    setPersonId(null);
    setDetailModalOpen(false);
    navigate(-1);
  };

  const getCurrentPerson = async () => {
    if (personId) {
      try {
        const current = await getPersonDetails(personId);
        setCurrentPerson(current);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getPersonCredits = async () => {
    if (personId) {
      try {
        const appearanceMovies = await getPersonMovieCredits(personId);
        const appearanceTVs = await getPersonTVCredits(personId);
        if (appearanceMovies.length)
          setCurrentPersonMovieCredits(appearanceMovies);
        if (appearanceTVs.length) setCurrentPersonTVCredits(appearanceTVs);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleMoviePosterClick = (movieId: number) => {
    if (location.pathname.includes("/user/") && user) {
      navigate(`/user/${user.id}/movie/${movieId}`);
    } else if (location.pathname.includes("search"))
      navigate(`/search/movie/${movieId}`);
    else navigate(`/movie/${movieId}`);
    setDetailModalOpen(false);
  };
  const handleTVPosterClick = (tvId: number) => {
    if (location.pathname.includes("/user/") && user) {
      navigate(`/user/${user.id}/tv/${tvId}`);
    } else if (location.pathname.includes("search"))
      navigate(`/search/tv/${tvId}`);
    else navigate(`/tv/${tvId}`);
    setDetailModalOpen(false);
  };

  // URL이 변경되었을 때 모달 상태 처리
  useEffect(() => {
    const handlePopState = () => {
      if (!location.pathname.includes("/person/")) {
        setDetailModalOpen(false);
      }
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname, setDetailModalOpen]);

  useEffect(() => {
    if (personId) {
      getCurrentPerson();
      getPersonCredits();
    }
  }, [personId]);

  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 bg-[#222222]/90 flex justify-center overflow-y-auto z-[200]"
      onClick={handleClose}
    >
      <div>
        <div
          className="w-[916px] min-h-[40%] bg-[#303030] rounded-lg relative text-white mt-[280px] p-10 pt-20"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="absolute top-4 right-4 bg-[#222222] rounded-full p-[5px]"
            onClick={handleClose}
          >
            <img src={Close} className="w-[30px]" alt="close" />
          </button>
          <div className="flex gap-5">
            <div className="rounded-lg overflow-hidden">
              {currentPerson?.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${currentPerson?.profile_path}`}
                  className="w-[200px]"
                  alt=""
                />
              ) : (
                <img src={ProfileNotFound} className="w-[200px]" alt="" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-[22px]">{currentPerson?.name}</h2>
              <ul className="flex flex-col gap-1 text-[15px]">
                <li>{currentPerson?.birthday}</li>
                <li>{currentPerson?.place_of_birth}</li>
                <li>{currentPerson?.popularity} / 100</li>
              </ul>
            </div>
          </div>
          <div className="overflow-hidden">
            <p className="text-[18px] my-5">출연작</p>
            <div>
              {currentPersonMovieCredits && (
                <>
                  <p className="text-[18px] my-5">영화</p>
                  {/* 영화 전체 보기 버튼 */}
                  <button
                    onClick={() => setShowAllMovies(!showAllMovies)}
                    className="text-blue-500 mb-3"
                  >
                    {showAllMovies ? "영화 접기" : "영화 전체 보기"}
                  </button>
                  <div className="grid grid-cols-4 gap-3">
                    {currentPersonMovieCredits
                      .sort((a, b) => b.popularity - a.popularity)
                      .slice(
                        0,
                        showAllMovies ? currentPersonMovieCredits.length : 8
                      )
                      .map((movie, i) => (
                        <div
                          key={i}
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
                </>
              )}
              {currentPersonTVCredits && (
                <>
                  <p className="text-[18px] mb-5 mt-20">TV</p>
                  {/* TV 전체 보기 버튼 */}
                  <button
                    onClick={() => setShowAllTVs(!showAllTVs)}
                    className="text-blue-500 mb-3"
                  >
                    {showAllTVs ? "TV 접기" : "TV 전체 보기"}
                  </button>
                  <div className="grid grid-cols-4 gap-3">
                    {currentPersonTVCredits
                      .sort((a, b) => b.popularity - a.popularity)
                      .slice(0, showAllTVs ? currentPersonTVCredits.length : 8)
                      .map((tv, i) => (
                        <div
                          key={i}
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
                              alt="movie-poster"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
