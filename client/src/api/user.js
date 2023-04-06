import ENV from "../env.json";
const API = ENV.API;
const authToken = localStorage.getItem("authToken");

const getUsers = async () => {
  const res = await fetch(`${API}/users`, {
    method: "GET",
    headers: {
      Authorization: authToken,
    },
  });
  const { body } = await res.json();
  return { status: res.status, body };
};

export { getUsers };
