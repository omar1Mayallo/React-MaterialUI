import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  GetAllResponseI,
  ResponseErrorsI,
} from "../../../../../api/types/response.types";
import { UserModel } from "../../../../../shared/types/models/User.model";
import useUsersAPIs from "../api";
import useGetAllUsersParamsStore from "../store/useGetAllUsersParams.store";

export default function useGetAllUsers() {
  const { getAllUsers } = useUsersAPIs();
  const { pagination, search, sort, status } = useGetAllUsersParamsStore();

  return useQuery<GetAllResponseI<UserModel>, AxiosError<ResponseErrorsI>>({
    queryKey: [
      "users",
      pagination.page,
      pagination.limit,
      search,
      sort,
      status,
    ],
    queryFn: () =>
      getAllUsers({
        page: pagination.page,
        limit: pagination.limit,
        ...(search && { search: `[username,email]:${search}` }),
        ...(sort && { sort }),
        ...(status && { status }),
      }),
    placeholderData: keepPreviousData,
  });
}
