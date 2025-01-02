import { create } from "zustand";

type ParamStoreType = {
  movieIdParam: number | null;
  setMovieIdParam: (movieId: number | null) => void;
  personIdParam: number | null;
  setPersonIdParam: (personId: number | null) => void;
  videoIdParam: string | null;
  setVideoIdParam: (videoId: string | null) => void;
  typeParam: string | null;
  setTypeParam: (type: string | null) => void;
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
  typeParam: null,
  setTypeParam: (type) =>
    set(() => ({
      typeParam: type,
    })),
}));
