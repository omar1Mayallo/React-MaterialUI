import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../../../store/user.store";

const PublicRoutes = ({
  redirectPath = "/dashboard", // !update This to the first permission of the logged user
}: {
  redirectPath?: string;
}) => {
  const token = useUserStore((s) => s.token);

  if (token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
