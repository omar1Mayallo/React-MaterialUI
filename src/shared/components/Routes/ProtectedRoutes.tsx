import { Navigate, Outlet } from "react-router-dom";
import BaseLayout from "../../../layout";
import useUserStore from "../../../store/user.store";

const ProtectedRoutes = ({ inLayout }: { inLayout?: boolean }) => {
  const token = useUserStore((s) => s.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const renderedElement = <Outlet />;
  if (inLayout) {
    return <BaseLayout>{renderedElement}</BaseLayout>;
  } else {
    return renderedElement;
  }
};

export default ProtectedRoutes;
