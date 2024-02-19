import { create } from "zustand";
import { UserModel } from "../shared/types/models/User.model";
import Cookies from "js-cookie";

interface UserState {
  token?: string;
  user?: UserModel;
  setToken: (token: string) => void;
  setUser: (user: UserModel) => void;
}

const useUserStore = create<UserState>((set) => ({
  token: Cookies.get("token"),
  user: undefined,
  setToken: (token) => {
    Cookies.set("token", token);
    set({ token });
  },
  setUser: (user) => set({ user }),
}));

export default useUserStore;
