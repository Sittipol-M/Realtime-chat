import PrivateMessageRepository from "../../webService/api/privateMessage/privateMessageRepository.js";
import GroupMessageRepository from "../../webService/api/groupMessage/groupMessageRepository.js";
import Jwt from "../../others/helpers/jwt.js";

class SocketController {
  constructor() {
    this.privateMessageRepository = new PrivateMessageRepository();
    this.groupMessageRepository = new GroupMessageRepository();
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
    socket.on("group-message", async ({ message, groupRoomId, authToken }) => {
      const user = await this.jwt.verifyJWT({ token: authToken });
      const senderId = user.id;
      await this.groupMessageRepository.createGroupMessage({ senderId, groupId: groupRoomId, message });
      socket.to(groupRoomId).emit("message", { message, senderId });
    });
  };
}

export default SocketController;
