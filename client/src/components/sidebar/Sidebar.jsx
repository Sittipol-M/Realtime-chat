import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { getUsers } from "../../api/user";

const Sidebar = ({ onSelectRoom }) => {
  const userId = localStorage.getItem("userId");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then(({ status, body }) => {
      const { users } = body;
      if (status === 200) setUsers(users);
    });
  }, []);

  const fakeGroups = [
    {
      id: 1,
      name: "group1",
    },
  ];

  const displayUsers = () => {
    return users.map(({ id, name }) =>
      id !== userId ? (
        <div key={`${id}${name}`} onClick={() => onSelectRoom({ id, name, type: "PRIVATE" })} className="sidebar-user-list">
          {name}
        </div>
      ) : null
    );
  };

  const displayGroups = () => {
    return fakeGroups.map(({ id, name }) => (
      <div key={`${id}${name}`} onClick={() => onSelectRoom({ id, name, type: "GROUP" })} className="sidebar-room-list">
        {name}
      </div>
    ));
  };

  return (
    <div className="sidebar-container">
      <h1>Chat App</h1>
      <div className="sidebar-users">
        <h3>users</h3>
        <div className="sidebar-search-users">
          <label>search</label>
          <input />
        </div>
        <div className="sidebar-user-lists">{displayUsers()}</div>
      </div>
      <div className="sidebar-rooms">
        <h3>rooms</h3>
        <div className="sidebar-search-rooms">
          <label>search</label>
          <input />
        </div>
        <div className="sidebar-search-rooms">
          <button>Add Room</button>
        </div>
        <div className="sidebar-room-lists">{displayGroups()}</div>
      </div>
    </div>
  );
};

export default Sidebar;
