import React from "react";

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null;
  }
  if (messageType === "error") {
    return <div className="error">{message}</div>;
  } else {
    return <div className="message">{message}</div>;
  }
};

export default Notification;
