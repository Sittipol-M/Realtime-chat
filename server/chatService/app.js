import { Server } from "socket.io";
import SocketController from "./socket/socketController.js";

const createChatService = ({ server }) => {
  const socketController = new SocketController();
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", async (socket) => {
    console.log("User connected");
    await socketController.joinRoom({ socket });
    await socketController.leaveRoom({ socket });
    await socketController.listenPrivateMessages({ socket });
    await socketController.listenGroupMessages({ socket });
  });
};

export default createChatService;
