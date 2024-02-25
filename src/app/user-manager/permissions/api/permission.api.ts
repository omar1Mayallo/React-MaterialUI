import { getData } from "../../../../api/methods";
import useUserStore from "../../../../store/user.store";

const usePermissionsAPIs = () => {
  const setUserPermissions = useUserStore((s) => s.setUserPermissions);
  // GET Logged User Permissions
  async function getLoggedUserPermissions() {
    const res = await getData<any>("/permissions/logged-user");
    console.log("res>>>>>>>>>>>", res);

    if (res.status === 200) {
      setUserPermissions(res.data);
    }
    return res.data;
  }

  return { getLoggedUserPermissions };
};

export default usePermissionsAPIs;
