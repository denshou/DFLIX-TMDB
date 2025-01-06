import { axiosInstance } from ".";

export const getMovieSearch = async (keyword: string, page = 1) => {
  return (
    await axiosInstance.get(
      `search/movie?query=${keyword}&language=ko-KR&page=${page}`
    )
  ).data.results;
};

export const getTVSearch = async (keyword: string, page = 1) => {
  return (
    await axiosInstance.get(
      `search/tv?query=${keyword}&language=ko-KR&page=${page}`
    )
  ).data.results;
};

export const getPersonSearch = async (keyword: string, page = 1) => {
  return (
    await axiosInstance.get(
      `search/person?query=${keyword}&language=ko-KR&page=${page}`
    )
  ).data.results;
};
