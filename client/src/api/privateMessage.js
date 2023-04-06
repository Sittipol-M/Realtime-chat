import ENV from "../env.json";
const API = ENV.API;
const authToken = localStorage.getItem("authToken");

const getPrivateMessages = async ({ privateRoomId }) => {
  const res = await fetch(`${API}/private-rooms/${privateRoomId}/messages`, {
    method: "GET",
    headers: {
      Authorization: authToken,
    },
  });
  const { body } = await res.json();
  return { status: res.status, body };
};

export { getPrivateMessages };
