import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getData } from "./api/methods";
import Login from "./app/authentication/pages/login";
import Register from "./app/authentication/pages/register";
import Plan from "./app/billing-manager/plan";
import ShortCode from "./app/billing-manager/short-code";
import Subscriptions from "./app/billing-manager/subscription";
import Dashboard from "./app/dashboard";
import FullPageLoading from "./shared/components/Loaders/FullPageLoading";
import ProtectedRoutes from "./shared/components/Routes/ProtectedRoutes";
import PublicRoutes from "./shared/components/Routes/PublicRoutes";
import { UserModel } from "./shared/types/models/User.model";
import useUserStore from "./store/user.store";

async function getLoggedUser() {
  return await getData<UserModel>(`/users/logged`);
}

function App() {
  const { user, setUser, token } = useUserStore();
  const { data, isLoading } = useQuery<UserModel, AxiosError>({
    queryKey: ["loggedUser"],
    queryFn: () => getLoggedUser(),
    enabled: !!token, // Just trigger if user authenticated
    staleTime: Infinity, // Consider as Fresh Forever
    placeholderData: user,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {isLoading ? (
        <FullPageLoading />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoutes inLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/billing-manager/plans" element={<Plan />} />
              <Route
                path="/billing-manager/subscriptions"
                element={<Subscriptions />}
              />
            </Route>

            <Route element={<ProtectedRoutes />}>
              <Route path="/short-code" element={<ShortCode />} />
            </Route>
          </Routes>
        </>
      )}
    </>
  );
}
export default App;
