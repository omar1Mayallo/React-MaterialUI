import { enqueueSnackbar } from "notistack";
import { postData } from "../../../../../api/methods";
import { UserModel } from "../../../../../shared/types/models/User.model";
import useUserStore from "../../../../../store/user.store";
import { LoginFormData } from "../validations/login.validation";
import Cookies from "js-cookie";

interface AuthResponse {
  token: string;
  user: UserModel;
}

const useLoginAPIs = () => {
  const { setToken, setUser } = useUserStore();

  // LOGIN
  async function login(body: LoginFormData) {
    const res = await postData<AuthResponse, LoginFormData>(
      "/auth/login",
      body,
    );
    if (res.status === 200) {
      setToken(res.data.token);
      setUser(res.data.user);
      Cookies.set("userId", `${res.data.user.id}`);
      enqueueSnackbar("Successfully Login", { variant: "success" });
    }
    return res;
  }

  return { login };
};

export default useLoginAPIs;
