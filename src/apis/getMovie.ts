import { axiosInstance } from ".";

export const getMovies = async (type: string) => {
  return (await axiosInstance.get(`movie/${type}?language=ko-KR&page=1`)).data
    .results;
};
export const getTrendingMovies = async () => {
  return (await axiosInstance.get("trending/movie/day?language=ko-KR")).data
    .results;
};
export const getMovieDetails = async (movieId: number) => {
  return (await axiosInstance.get(`movie/${movieId}?language=ko-KR&page=1`))
    .data;
};
export const getMovieCredits = async (movieId: number) => {
  return (await axiosInstance.get(`movie/${movieId}/credits?language=ko-KR`))
    .data.cast;
};
export const getMovieVideos = async (moiveId:number) => {
  return (await axiosInstance.get(`movie/${moiveId}/videos?language=ko-KR`)).data
    .results;
};
export const getMovieImages = async (moiveId:number) => {
  return (await axiosInstance.get(`movie/${moiveId}/images`)).data
    .backdrops;
};