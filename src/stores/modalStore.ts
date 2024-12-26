import { create } from "zustand";

type ModalStoreType = {
  movieModalOpen: boolean;
  setMovieModalOpen: (bool: boolean) => void;
  detailModalOpen: boolean;
  setDetailModalOpen: (bool: boolean) => void;
};

export const useModal = create<ModalStoreType>((set) => ({
  movieModalOpen: false,
  setMovieModalOpen: (bool) =>
    set(() => ({
      movieModalOpen: bool,
    })),
  detailModalOpen: false,
  setDetailModalOpen: (bool) =>
    set(() => ({
      detailModalOpen: bool,
    })),
}));
