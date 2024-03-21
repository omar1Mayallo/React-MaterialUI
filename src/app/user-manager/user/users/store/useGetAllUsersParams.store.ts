import { create } from "zustand";
import { useLocation } from "react-router-dom";

interface PaginationParams {
  page: number;
  limit: number;
}

interface GetAllUsersParamsStore {
  pagination: PaginationParams;
  search: string;
  sort: string;
  status: string;
  handlePagination: (page: number) => void;
  handleChangeLimit: (limit: number) => void;
  handleSearch: (search: string) => void;
  handleSort: (sort: string) => void;
  handleStatus: (status: string) => void;
}

// !ACCESS LOCATION PARAMS BY PASS IT TO THE FUNCTION PARAMS
const useGetAllUsersParamsStore = create<GetAllUsersParamsStore>((set) => {
  return {
    pagination: {
      page: 1,
      limit: 5,
    },

    search: "",

    sort: "",

    status: "",

    handleStatus: (status: string) =>
      set((state) => ({
        ...state,
        pagination: { ...state.pagination, page: 1 },
        status,
      })),

    handleSort: (sortKey: string) =>
      set((state) => ({
        ...state,
        sort:
          state.sort === sortKey
            ? `-${sortKey}`
            : state.sort === `-${sortKey}`
              ? sortKey
              : `-${sortKey}`,
      })),

    handleSearch: (search: string) =>
      set((state) => ({
        ...state,
        pagination: { ...state.pagination, page: 1 },
        search,
      })),

    handlePagination: (page: number) =>
      set((state) => ({ pagination: { ...state.pagination, page } })),

    handleChangeLimit: (limit: number) =>
      set((state) => ({ pagination: { ...state.pagination, page: 1, limit } })),
  };
});

export default useGetAllUsersParamsStore;
