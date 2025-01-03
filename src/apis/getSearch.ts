import { axiosInstance } from ".";

export const getMovieSearch = async (keyword: string, page = 1) => {
  return (
    await axiosInstance.get(
      `search/movie?query=${keyword}&language=ko-KR&page=${page}`
    )
  ).data.results;
};
