import { USER_MODEL, BASE_MODEL } from "@/utils/constant";
import { request } from "@/utils/request";

const login = (data) => {
  return request(`${BASE_MODEL}/auth/login`, {
    method: "POST",
    data,
  });
};

const getUser = ({ sort, limit }) => {
  const params = [];
  if (limit) {
    params.push(["limit", limit]);
  }
  if (sort) {
    params.push(["sort", sort]);
  }
  return request(`${USER_MODEL}`, {
    method: "GET",
    params: new URLSearchParams(params),
  });
};

const deleteUser = (id) => {
  return request(`${USER_MODEL}/${id}`, {
    method: "DELETE",
  });
};

const UserServices = {
  login,
  getUser,
  deleteUser,
};

export default UserServices;
