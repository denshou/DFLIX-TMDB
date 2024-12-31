import { axiosInstance } from ".";

export const getMovieSearch = async (keyword: string) => {
  return (
    await axiosInstance.get(
      `search/movie?query=${keyword}&language=ko-KR&page=1`
    )
  ).data.results;
};
