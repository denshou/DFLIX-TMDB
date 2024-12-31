import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Main from "./pages/Main";
import MovieInfo from "./components/MovieInfo";
import { useModal } from "./stores/modalStore";
import DetailInfo from "./components/DetailInfo";
import SignIn from "./pages/SignIn";
import KakaoRedirect from "./pages/KakaoRedirect";
import Search from "./pages/Search";

function App() {
  const movieModalOpen = useModal((state) => state.movieModalOpen);
  const detailModalOpen = useModal((state) => state.detailModalOpen);
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/movie/:movieId" element={<Main />} />
          <Route path="/movie/:movieId/person/:personId" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/auth/kakao/callback" element={<KakaoRedirect />} />

          <Route path="/search" element={<Search />} />
          <Route path="/search/movie/:movieId" element={<Search />} />
          <Route path="/search/movie/:movieId/person/:personId" element={<Search />} />
        </Route>
      </Routes>
      {movieModalOpen && <MovieInfo />}
      {detailModalOpen && <DetailInfo />}
    </>
  );
}

export default App;
