import { axiosInstance } from ".";

export const getMovies = async (type: string) => {
  return (await axiosInstance.get(`movie/${type}?language=ko-KR&page=1`)).data
    .results;
};
export const getMovieDetail = async (movieId: number) => {
  return (await axiosInstance.get(`movie/${movieId}?language=ko-KR&page=1`))
    .data;
};

export const getTrendingMovies = async () => {
  return (await axiosInstance.get("trending/movie/week?language=ko-KR")).data
    .results;
};
