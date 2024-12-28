import { axiosInstance } from ".";

export const getPersonDetails = async (personId: number) => {
  return (await axiosInstance.get(`person/${personId}?language=ko-KR`)).data;
};

export const getPersonMovieCredits = async (personId: number) => {
  return (
    await axiosInstance.get(`person/${personId}/movie_credits?language=ko-KR`)
  ).data.cast;
};
