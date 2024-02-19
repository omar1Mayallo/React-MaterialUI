import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import catchErrors from "../../../../../api/catchErrors";
import { ResponseErrorsI } from "../../../../../api/types/response.types";
import useLoginAPIs from "../api/login.api";
import { LoginFormData } from "./../validations/login.validation";

export default function useLoginService(
  setError: UseFormSetError<LoginFormData>,
) {
  const { login } = useLoginAPIs();

  return useMutation({
    mutationFn: login,
    onError: (error: AxiosError<ResponseErrorsI<keyof LoginFormData>>) =>
      catchErrors<LoginFormData>(error, setError),
  });
}
