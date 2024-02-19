import { useLocation } from "react-router-dom";

const useCustomPath = () => {
  const location = useLocation();

  const getPathSegments = () => {
    return location.pathname.split("/").filter((segment) => segment !== "");
  };

  // Paths
  const modulePath = "/" + (getPathSegments()[0] || "");
  const subModulePath = "/" + getPathSegments().slice(0, 2).join("/") || "";
  const subSubModulePath = "/" + getPathSegments().slice(0, 3).join("/") || "";
  const itemPath = location.pathname || "";

  // Query Search Params
  const queryParams = new URLSearchParams(location.search);
  const queryParamsObject: Record<string, string> = {};
  queryParams.forEach((value, key) => {
    queryParamsObject[key] = value;
  });

  return {
    modulePath,
    subModulePath,
    subSubModulePath,
    itemPath,
    queryParams: queryParamsObject,
  };
};

export default useCustomPath;
