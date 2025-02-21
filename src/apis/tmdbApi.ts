import { axiosInstance } from ".";

export const getAccount = async (sessionId: string) => {
  return (
    await axiosInstance.get(
      `/account?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&session_id=${sessionId}`
    )
  ).data;
};

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
    return response.data;
  } catch (error) {
    console.error(error);
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
        watchlist: true,
      },
      {
        params: { session_id: sessionId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};
export const deleteFavorite = async (
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
        favorite: false,
      },
      {
        params: { session_id: sessionId },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteWatchlist = async (
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
        watchlist: false,
      },
      {
        params: { session_id: sessionId },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
  }
};
