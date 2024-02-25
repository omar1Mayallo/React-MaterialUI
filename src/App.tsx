import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./app/authentication/pages/login";
import Register from "./app/authentication/pages/register";
import Plan from "./app/billing-manager/plan";
import ShortCode from "./app/billing-manager/short-code";
import Subscriptions from "./app/billing-manager/subscription";
import Dashboard from "./app/dashboard";
import useGetUserPermissions from "./app/user-manager/permissions/services/permissions.service";
import useGetLoggedUser from "./app/user-manager/user/profile/services/profile.service";
import FullPageLoading from "./shared/components/Loaders/FullPageLoading";
import ProtectedRoutes from "./shared/components/Routes/ProtectedRoutes";
import PublicRoutes from "./shared/components/Routes/PublicRoutes";
import Roles from "./app/user-manager/role";
import Users from "./app/user-manager/user/users";
import Groups from "./app/user-manager/group";

function App() {
  const {
    data: permissions,
    isLoading: permissionsLoading,
    isError,
    error,
  } = useGetUserPermissions();

  const loading = permissionsLoading;
  const firstPermissionsItem = permissions?.entities[0];
  const redirectPath: string =
    firstPermissionsItem?.entity_url ||
    `/${firstPermissionsItem?.entities[0]?.entity_url}`;

  return (
    <>
      {loading ? (
        <FullPageLoading />
      ) : (
        <Routes>
          <Route
            path="/"
            element={<PublicRoutes redirectPath={redirectPath} />}
          >
            <Route index element={<Navigate to={"/login"} />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoutes inLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />

            <Route path="/users-management">
              <Route path="users" element={<Users />} />
              <Route path="roles" element={<Roles />} />
              <Route path="groups" element={<Groups />} />
            </Route>

            <Route path="/billing-management">
              <Route path="plans" element={<Plan />} />
              <Route path="subscriptions" element={<Subscriptions />} />
            </Route>

            <Route path="/products-management">
              <Route path="products" element={<Plan />} />
              <Route path="orders" element={<Subscriptions />} />
              <Route path="categories">
                <Route path="clothes" element={<Plan />} />
                <Route path="shoes" element={<Subscriptions />} />
                <Route path="brands">
                  <Route path="adidas" element={<Plan />} />
                  <Route path="nike" element={<Subscriptions />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/short-code" element={<ShortCode />} />
          </Route>
        </Routes>
      )}
    </>
  );
}
export default App;
