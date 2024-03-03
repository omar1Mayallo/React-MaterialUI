import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import usePermissionsAPIs from "../api/permission.api";
import { ResponseErrorsI } from "../../../../api/types/response.types";
import useUserStore from "../../../../store/user.store";
import CACHED_KEYS from "../../../../shared/constants/query-cached-keys";

export default function useGetUserPermissions() {
  const { getLoggedUserPermissions } = usePermissionsAPIs();
  const { token, userPermissions } = useUserStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any, AxiosError<ResponseErrorsI>>({
    queryKey: [CACHED_KEYS.LOGGED_USER_PERMISSIONS],
    queryFn: getLoggedUserPermissions,
    enabled: !!token, // Just trigger if user authenticated
    staleTime: Infinity, // Consider as Fresh Forever
    placeholderData: userPermissions,
  });
}
