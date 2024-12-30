// import { create } from "zustand";

// type AuthStoreType = {
//     movieModalOpen: boolean;
//     setMovieModalOpen: (bool: boolean) => void;
//     detailModalOpen: boolean;
//     setDetailModalOpen: (bool: boolean) => void;
//   };

// export const useAuth = create<AuthStoreType>((set) => ({
//   movieModalOpen: false,
//   setMovieModalOpen: (bool) =>
//     set(() => ({
//       movieModalOpen: bool,
//     })),
//   detailModalOpen: false,
//   setDetailModalOpen: (bool) =>
//     set(() => ({
//       detailModalOpen: bool,
//     })),
// }));