import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { getUsers } from "../../api/user";
import { getGroupRooms } from "../../api/groupRoom";

const Sidebar = ({ onSelectRoom }) => {
  const userId = localStorage.getItem("userId");
  const [users, setUsers] = useState([]);
  const [groupRooms, setGroupRooms] = useState([]);
  useEffect(() => {
    getUsers().then(({ status, body }) => {
      if (status === 200) {
        const { users } = body;
        setUsers(users);
      }
    });
    getGroupRooms().then(({ status, body }) => {
      if (status === 200) {
        const { groupRooms } = body;
        setGroupRooms(groupRooms);
      }
    });
  }, []);

  const displayUsers = () => {
    return users.map(({ id, name }) =>
      id !== userId ? (
        <li key={`${id}${name}`} onClick={() => onSelectRoom({ id, name, type: "PRIVATE" })} className="sidebar-user-list">
          {name}
        </li>
      ) : null
    );
  };

  const displayGroups = () => {
    return groupRooms.map(({ _id, name }) => (
      <li key={`${_id}`} onClick={() => onSelectRoom({ id: _id, name, type: "GROUP" })} className="sidebar-room-list">
        {name}
      </li>
    ));
  };

  return (
    <div className="sidebar-container">
      <h1>Chat App</h1>
      <div className="sidebar-users">
        <h3>users</h3>
        <div className="sidebar-search-users">
          {/* <label>search</label> */}
          {/* <input /> */}
        </div>
        <div className="sidebar-user-lists">{displayUsers()}</div>
      </div>
      <div className="sidebar-rooms">
        <h3>rooms</h3>
        <div className="sidebar-search-rooms">
          {/* <label>search</label>
          <input /> */}
        </div>
        <div className="sidebar-search-rooms">{/* <button>Add Room</button> */}</div>
        <div className="sidebar-room-lists">{displayGroups()}</div>
      </div>
    </div>
  );
};

export default Sidebar;
