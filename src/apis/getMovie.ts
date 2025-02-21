import { axiosInstance } from ".";

export const getMovies = async (getBy: string, page = 1) => {
  return (await axiosInstance.get(`movie/${getBy}?language=ko-KR&page=${page}`))
    .data.results;
};
export const getTrendingMovies = async () => {
  return (await axiosInstance.get("trending/movie/day?language=ko-KR")).data
    .results;
};
export const getMovieDetails = async (movieId: number, page = 1) => {
  return (
    await axiosInstance.get(`movie/${movieId}?language=ko-KR&page=${page}`)
  ).data;
};
export const getMovieCredits = async (movieId: number) => {
  return (await axiosInstance.get(`movie/${movieId}/credits?language=ko-KR`))
    .data.cast;
};
export const getMovieVideos = async (moiveId: number) => {
  return (await axiosInstance.get(`movie/${moiveId}/videos?language=ko-KR`))
    .data.results;
};
export const getMovieImages = async (moiveId: number) => {
  return (await axiosInstance.get(`movie/${moiveId}/images`)).data.backdrops;
};

export const getMoviesWithGenres = async (genres: number, page = 1) => {
  return (
    await axiosInstance.get(
      `discover/movie?language=ko-KR&page=${page}&with_genres=${genres}`
    )
  ).data.results;
};
