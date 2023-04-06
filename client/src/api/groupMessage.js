import ENV from "../env.json";
const API = ENV.API;
const authToken = localStorage.getItem("authToken");

const getGroupMessages = async ({ groupRoomId }) => {
  const res = await fetch(`${API}/group-rooms/${groupRoomId}/messages`, {
    method: "GET",
    headers: {
      Authorization: authToken,
    },
  });
  const { body } = await res.json();
  return { status: res.status, body };
};

export { getGroupMessages };
