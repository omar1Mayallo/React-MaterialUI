import { getData } from "../../../../api/methods";
import useUserStore from "../../../../store/user.store";

const usePermissionsAPIs = () => {
  const setUserPermissions = useUserStore((s) => s.setUserPermissions);
  // GET Logged User Permissions
  async function getLoggedUserPermissions() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await getData<any>("/permissions/logged-user");

    if (res.status === 200) {
      setUserPermissions(res.data);
    }
    return res.data;
  }

  return { getLoggedUserPermissions };
};

export default usePermissionsAPIs;
