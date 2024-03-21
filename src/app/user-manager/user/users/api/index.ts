import { getData } from "../../../../../api/methods";
import { GetAllResponseI } from "../../../../../api/types/response.types";
import { UserModel } from "../../../../../shared/types/models/User.model";

const useUsersAPIs = () => {
  // GET_ALL_USERS
  async function getAllUsers(params: any) {
    const res = await getData<GetAllResponseI<UserModel>>("/users", { params });
    return res.data;
  }

  return {
    getAllUsers,
  };
};

export default useUsersAPIs;
