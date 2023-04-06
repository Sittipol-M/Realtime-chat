import ENV from "../env.json";
const API = ENV.API;
const authToken = localStorage.getItem("authToken");

const groupRoomsURL = `${API}/group-rooms`;

const getGroupRooms = async () => {
  const res = await fetch(`${groupRoomsURL}`, {
    method: "GET",
    headers: {
      Authorization: authToken,
    },
  });
  const { body } = await res.json();
  return { status: res.status, body };
};

const getGroupRoom = async ({ groupRoomId }) => {
  const res = await fetch(`${groupRoomsURL}/${groupRoomId}`, {
    method: "GET",
    headers: {
      Authorization: authToken,
    },
  });
  const { body } = await res.json();
  return { status: res.status, body };
};

export { getGroupRooms, getGroupRoom };
