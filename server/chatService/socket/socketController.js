import PrivateMessageRepository from "../../webService/api/privateMessage/privateMessageRepository.js";
import Jwt from "../../others/helpers/jwt.js";

class SocketController {
  constructor() {
    this.privateMessageRepository = new PrivateMessageRepository();
    this.jwt = new Jwt();
  }

  joinRoom = async ({ socket }) => {
    socket.on("join-room", async ({ roomId }) => {
      console.log("Joined room");
      console.log({ roomId });
      socket.join(roomId);
    });
  };

  leaveRoom = async ({ socket }) => {
    socket.on("leave-room", async ({ roomId }) => {
      socket.leave(roomId);
    });
  };

  listenPrivateMessages = async ({ socket }) => {
    socket.on("private-message", async ({ message, privateRoomId, authToken }) => {
      const user = await this.jwt.verifyJWT({ token: authToken });
      const senderId = user.id;
      await this.privateMessageRepository.createPrivateMessage({ privateRoomId, senderId, message });
      socket.to(privateRoomId).emit("message", { message, senderId });
    });
  };

  listenGroupMessages = async ({ socket }) => {
    socket.on("group-message", ({ message, groupId, authToken }) => {
      //   socket.emit("group1", { message });
    });
  };
}

export default SocketController;
