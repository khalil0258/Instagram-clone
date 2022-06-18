
import React from "react";
import { Outlet, Route, Routes } from "react-router";

import Message from "../../components/messages/Message";

function Messages() {
  return (
    <div>
      messages
      <Outlet />
    </div>
  );
}

export default Messages;
