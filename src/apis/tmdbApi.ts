import { axiosInstance } from ".";

export const addFavorite = async (
  accountId: number,
  type: string,
  movieId: number
) => {
  const sessionId = localStorage.getItem("sessionId");
  if (!sessionId) return;
  try {
    const response = await axiosInstance.post(
      `/account/${accountId}/favorite`,
      {
        media_type: type,
        media_id: movieId,
        favorite: true,
      },
      {
        params: { session_id: sessionId },
      }
    );
    console.log("add 성공");
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};

export const addWatchlist = async (
    accountId: number,
    type: string,
    movieId: number
  ) => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) return;
    try {
      const response = await axiosInstance.post(
        `/account/${accountId}/watchlist`,
        {
          media_type: type,
          media_id: movieId,
          favorite: true,
        },
        {
          params: { session_id: sessionId },
        }
      );
      console.log("add 성공");
      return response.data;
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

export const getFavoriteMovies = async (accountId: number) => {
  const sessionId = localStorage.getItem("sessionId");
  if (!sessionId) return;

  try {
    const response = await axiosInstance.get(
      `/account/${accountId}/favorite/movies?language=ko-KR&page=1&session_id=${sessionId}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};
export const getWatchlistMovies = async (accountId: number) => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) return;
  
    try {
      const response = await axiosInstance.get(
        `/account/${accountId}/watchlist/movies?language=ko-KR&page=1&session_id=${sessionId}`
      );
      return response.data.results;
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  export const getFavoriteTVs = async (accountId: number) => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) return;
  
    try {
      const response = await axiosInstance.get(
        `/account/${accountId}/favorite/tv?language=ko-KR&page=1&session_id=${sessionId}`
      );
      return response.data.results;
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };
  export const getWatchlistTVs = async (accountId: number) => {
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) return;
    
      try {
        const response = await axiosInstance.get(
          `/account/${accountId}/watchlist/tv?language=ko-KR&page=1&session_id=${sessionId}`
        );
        return response.data.results;
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    };