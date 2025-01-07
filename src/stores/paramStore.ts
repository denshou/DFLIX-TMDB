import { create } from "zustand";

type ParamStoreType = {
  movieIdParam: number | null;
  setMovieIdParam: (movieId: number | null) => void;
  personIdParam: number | null;
  setPersonIdParam: (personId: number | null) => void;
  videoIdParam: string | null;
  setVideoIdParam: (videoId: string | null) => void;
  getByParam: string | null;
  setGetByParam: (getBy: string | null) => void;
};

export const useParam = create<ParamStoreType>((set) => ({
  movieIdParam: null,
  setMovieIdParam: (movieId) =>
    set(() => ({
      movieIdParam: movieId,
    })),
  personIdParam: null,
  setPersonIdParam: (personId) =>
    set(() => ({
      personIdParam: personId,
    })),
  videoIdParam: null,
  setVideoIdParam: (videoId) =>
    set(() => ({
      videoIdParam: videoId,
    })),
  getByParam: null,
  setGetByParam: (getBy) =>
    set(() => ({
      getByParam: getBy,
    })),
}));
