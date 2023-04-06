import ENV from "../env.json";
const API = ENV.API;

const getPrivateRoom = async ({ receiverId }) => {
  const authToken = localStorage.getItem("authToken");
  const res = await fetch(`${API}/private-rooms/${receiverId}`, {
    method: "GET",
    headers: {
      Authorization: authToken,
    },
  });
  const { body } = await res.json();
  return { status: res.status, body };
};

export default getPrivateRoom;
