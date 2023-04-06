const sendPrivateMessage = ({ message, privateRoomId, socket }) => {
  const authToken = localStorage.getItem("authToken");
  socket.emit("private-message", { message, privateRoomId, authToken });
};

const sendGroupMassage = ({ message, groupRoomId, socket }) => {
  const authToken = localStorage.getItem("authToken");
  socket.emit("group-message", { message, groupRoomId, authToken });
};

export { sendPrivateMessage, sendGroupMassage };
