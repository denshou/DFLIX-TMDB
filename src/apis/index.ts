import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Nzk1Y2EwNDE0MTE0NzM3MGNmZmFkZjFjOTc2ZWRkNCIsIm5iZiI6MTczMzI5MTIzOS44Miwic3ViIjoiNjc0ZmVjZTc0NDg0N2U5N2RmZjQwM2YwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.DjLrcmHH_hv2Y9c_Qj_N3lqwNNLcxsv5yThiGFgkARQ",
  },
});
