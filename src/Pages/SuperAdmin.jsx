import React, { useEffect, useState } from "react";
import { useSocket } from "../ContextProvider/SocketProvider";
import { useNavigate } from "react-router-dom";

export default function SuperAdmin() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const socket = useSocket();

  const logoutSuperAdmin = () => {
    sessionStorage.removeItem("superAdminToken");
    navigate("/");
  };

  useEffect(() => {
    socket.on("adminNotification", (notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    return () => {
      socket.off("adminNotification");
    };
  }, [socket]);

  useEffect(() => {
    const token = sessionStorage.getItem("superAdminToken");

    if (token) {
      navigate("/super-admin");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div>
        <h1>Hello from Super Admin Page</h1>
        <button onClick={logoutSuperAdmin}>Logout</button>
      </div>
      <div>
        <h2>Notifications:</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
