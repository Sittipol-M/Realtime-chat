const sendPrivateMessage = ({ message, privateRoomId, socket }) => {
  const authToken = localStorage.getItem("authToken");
  socket.emit("private-message", { message, privateRoomId, authToken });
};

const sendGroupMassage = ({ message, groupId, socket }) => {
  const authToken = localStorage.getItem("authToken");
  socket.emit("group-message", { message, groupId, authToken });
};

export { sendPrivateMessage, sendGroupMassage };
