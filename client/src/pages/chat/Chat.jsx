import React, { useEffect, useState } from "react";
import "./chat.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { getPrivateMessages } from "../../api/privateMessage";
import getPrivateRoom from "../../api/privateRoom";
import { sendGroupMassage, sendPrivateMessage } from "../../socket/socketFunc";
import { getGroupRoom } from "../../api/groupRoom";
import { getGroupMessages } from "../../api/groupMessage";

const Chat = ({ socket }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState({ type: "", _id: "", users: [], name: "" });
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      localStorage.clear();
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    socket.on("message", ({ message, senderId }) => {
      setMessages((oldMessages) => [...oldMessages, { message, senderId }]);
    });
    return () => socket.off("message");
  }, [socket]);

  const clearMessageInput = () => {
    document.getElementById("message-input").value = "";
    setMessage("");
  };

  const handleSendMessage = () => {
    if (message.length === 0) {
      alert("Type message");
      return;
    }
    if (!room._id) {
      alert("Select room");
      return;
    }
    setMessages([...messages, { message, senderId: userId, senderName: userName }]);
    if (room.type === "PRIVATE") sendPrivateMessage({ message, privateRoomId: room._id, socket });
    else if (room.type === "GROUP") sendGroupMassage({ message, groupRoomId: room._id, socket });
    clearMessageInput();
  };

  const handleSelectRoom = async ({ id, type, name }) => {
    socket.emit("leave-room", { roomId: room._id });
    if (type === "PRIVATE") {
      const { status, body } = await getPrivateRoom({ receiverId: id });
      const { _id, users } = body.privateRoom;
      if (status === 200) {
        const { status, body } = await getPrivateMessages({ privateRoomId: _id });
        if (status === 200) {
          const { messages } = body;
          setRoom({ _id, users, type, name });
          setMessages(messages);
        }
      }
    }
    if (type === "GROUP") {
      const { status, body } = await getGroupRoom({ groupRoomId: id });
      const { _id, users } = body.groupRoom;
      if (status === 200) {
        const { status, body } = await getGroupMessages({ groupRoomId: _id });
        if (status === 200) {
          const { messages } = body;
          setRoom({ _id, type, name, users });
          setMessages(messages);
        }
      }
    }
    socket.emit("join-room", { roomId: room._id });
  };

  const handleLogout = () => {
    localStorage.clear();
    socket.emit("leave-room", { roomId: room._id });
    navigate("/login");
  };

  const displayMessage = () => {
    return messages.map(({ message, senderId }, index) => {
      const user = room.users.find(({ _id }) => _id === senderId);

      return senderId !== user._id ? (
        <div key={`${senderId}${index}`} className="chat-room-message right">
          {message}
          <span>{user.name || ""}</span>
        </div>
      ) : (
        <div key={`${senderId}${index}`} className="chat-room-message left">
          <span>{user.name || ""}</span>
          {message}
        </div>
      );
    });
  };

  return (
    <div className="chat-container">
      <Sidebar onSelectRoom={handleSelectRoom} />
      <div className="chat-room-section">
        <div className="chat-room-title">
          <h1>{room.name}</h1>
          <div className="logout-button" onClick={() => handleLogout()}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </div>
        </div>
        <div className="chat-room-messages">{displayMessage()}</div>
        <div className="chat-message-input">
          <input id="message-input" onChange={(event) => setMessage(event.target.value)} />
          <button className="send-button" onClick={() => handleSendMessage()}>
            <i className="fa-solid fa-arrow-right "></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
