import React, { useEffect, useState } from "react";
import "./chat.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { getPrivateMessages } from "../../api/privateMessage";
import getPrivateRoom from "../../api/privateRoom";
import { sendGroupMassage, sendPrivateMessage } from "../../socket/socketFunc";

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
      console.log({ message });
      setMessages((oldMessages) => [...oldMessages, { message, senderId }]);
    });
    return () => socket.off("message");
  }, [socket]);

  useEffect(() => {
    socket.emit("join-room", { roomId: room._id });
    if (room.type === "PRIVATE") {
    }
  }, [room]);

  const displayMessage = () => {
    return messages.map(({ message, senderId }, index) => {
      const user = room.users.find(({ _id }) => _id === senderId);
      if (senderId === userId) {
        return (
          <div key={`${senderId}${index}`} className="chat-room-message right">
            {message}
            <span>{user.name}</span>
          </div>
        );
      } else {
        return (
          <div key={`${senderId}${index}`} className="chat-room-message left">
            <span>{user.name}</span>
            {message}
          </div>
        );
      }
    });
  };

  const clearMessage = () => {
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
    if (room.type === "PRIVATE") {
      setMessages([...messages, { message, senderId: userId, senderName: userName }]);
      sendPrivateMessage({ message, privateRoomId: room._id, socket });
    } else if (room.type === "GROUP") sendGroupMassage({ message, groupId: room.id, socket });
    clearMessage();
  };

  const handleSelectRoom = ({ id, type, name }) => {
    if (type === "PRIVATE") {
      getPrivateRoom({ receiverId: id }).then(({ status, body }) => {
        if (status === 200) {
          const { privateRoom } = body;
          const { _id, users } = privateRoom;
          setRoom({ _id, users, type, name });
          getPrivateMessages({ privateRoomId: _id }).then(({ status, body }) => {
            if (status === 200) {
              const { messages } = body;
              setMessages(messages);
            }
          });
        }
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    socket.emit("leave-room", { roomId: room._id });
    navigate("/login");
  };

  return (
    <div className="chat-container">
      <Sidebar onSelectRoom={handleSelectRoom} />
      <div className="chat-room-section">
        <div className="chat-room-title">
          <h1>{room.name}</h1>
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
        <div className="chat-room-messages">
          {/* <div className="chat-room-message left">
            <span>name</span>message-left
          </div>
          <div className="chat-room-message right">
            message-right<span>name</span>
          </div> */}
          {displayMessage()}
        </div>
        <div className="chat-message-input">
          <input id="message-input" onChange={(event) => setMessage(event.target.value)} />
          <button onClick={() => handleSendMessage()}>send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
