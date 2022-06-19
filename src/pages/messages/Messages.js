import React from "react";
import { Outlet, Route, Routes } from "react-router";
import HeaderHolder from "../../components/global/HeaderHolder";
import { HeaderContainer } from "../../components/global/ContainerSignup";
import Friends from "../../components/messages/Friends";

function Messages() {
  return (
    <HeaderHolder>
      {/* the main section that combine the two routes  */}
      <HeaderContainer>
        <div className="w-full bg-white h-[510px] transform -translate-y-4 border  mx-auto rounded-lg flex">
          <Friends />
          <Outlet />
        </div>
      </HeaderContainer>
    </HeaderHolder>
  );
}

export default Messages;
