import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Main from "./pages/Main";
import MovieInfo from "./components/MovieInfo";
import { useModal } from "./stores/modalStore";
import DetailInfo from "./components/DetailInfo";

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
        </Route>
      </Routes>
      {movieModalOpen && <MovieInfo />}
      {detailModalOpen && <DetailInfo />}
    </>
  );
}

export default App;
