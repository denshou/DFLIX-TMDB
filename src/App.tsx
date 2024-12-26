import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Main from "./pages/Main";
import MovieInfo from "./components/MovieInfo";
import { useModal } from "./stores/modalStore";

function App() {
  const movieModalOpen = useModal((state) => state.movieModalOpen);
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/movie/:movieId" element={<Main />} />
        </Route>
      </Routes>
      {movieModalOpen && <MovieInfo />}
    </>
  );
}

export default App;
