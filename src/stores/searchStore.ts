import { create } from "zustand";

type SearchStoreType = {
  searchWord: string;
  setSearchWord: (keyword: string) => void;
};

export const useSearch = create<SearchStoreType>((set) => ({
  searchWord: "",
  setSearchWord: (keyword) =>
    set(() => ({
      searchWord: keyword,
    })),
}));
