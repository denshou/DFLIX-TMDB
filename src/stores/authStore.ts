import { create } from "zustand";

type AuthStoreType = {
  user: TMDBUserType | null;
  setUser: (user: TMDBUserType | null) => void;
};

export const useAuth = create<AuthStoreType>((set) => ({
  user: null,
  setUser: (user) =>
    set(() => ({
      user: user,
    })),
}));
