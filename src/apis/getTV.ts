import { axiosInstance } from ".";

export const getTVs = async (getBy: string, page = 1) => {
  return (await axiosInstance.get(`tv/${getBy}?language=ko-KR&page=${page}`))
    .data.results;
};

export const getTrendingTVs = async () => {
  return (await axiosInstance.get("trending/tv/day?language=ko-KR")).data
    .results;
};

export const getTVsWithGenres = async (genres: number, page = 1) => {
  return (
    await axiosInstance.get(
      `discover/tv?language=ko-KR&page=${page}&with_genres=${genres}`
    )
  ).data.results;
};

export const getTVDetails = async (tvId: number, page = 1) => {
  return (
    await axiosInstance.get(`tv/${tvId}?language=ko-KR&page=${page}`)
  ).data;
};
export const getTVCredits = async (tvId: number) => {
  return (await axiosInstance.get(`tv/${tvId}/credits?language=ko-KR`))
    .data.cast;
};
export const getTVVideos = async (tvId: number) => {
  return (await axiosInstance.get(`tv/${tvId}/videos?language=ko-KR`))
    .data.results;
};
export const getTVImages = async (tvId: number) => {
  return (await axiosInstance.get(`tv/${tvId}/images`)).data.backdrops;
};