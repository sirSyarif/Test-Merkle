import { USER_MODEL, BASE_MODEL } from "@/utils/constant";
import { request } from "@/utils/request";

const login = (data) => {
  return request(`${BASE_MODEL}/auth/login`, {
    method: "POST",
    data,
  });
};

const UserServices = {
  login,
};

export default UserServices;
