import React, { Fragment } from "react";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import ReactDOM from "react-dom";
import { HeaderContainer } from "./ContainerSignup";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { setLoading } from "../../features/auth-state/auth-slice";

const BackDrop = (props) => {
  return (
    <div
      className="h-screen w-screen  absolute top-0 "
      style={{ display: props.open ? "block" : "none", zIndex: 100 }}
      onClick={() => {
        props.clicked();
      }}
    ></div>
  );
};
function MenuModal(props) {
  if (!props.open) return null;
  else {
    return (
      <Fragment>
        {ReactDOM.createPortal(
          <BackDrop clicked={props.clicked} open={props.open} />,
          document.getElementById("backdrop")
        )}
        {ReactDOM.createPortal(
          <HeaderContainer>
            <div className="modal">
              <div
                style={{ zIndex: 1200 }}
                className=" absolute -right-8 -top-1 -shadow-md  shadow-gray-400 drop-shadow-md  overflow-hidden w-56 rounded-md "
              >
                <div className="bg-white ">
                  <ul>
                    <li className="flex p-2 hover:bg-gray-200 cursor-pointer">
                      <PermIdentityOutlinedIcon />
                      <p className="ml-3 font-light ">Profile</p>
                    </li>
                    <li className="flex p-2 hover:bg-gray-200 cursor-pointer">
                      <BookmarkBorderOutlinedIcon />
                      <p className="ml-3 font-light  ">Enregistre</p>
                    </li>
                    <li className="flex p-2 hover:bg-gray-200 cursor-pointer">
                      <SettingsOutlinedIcon />
                      <p className="ml-3 font-light  ">Parametre</p>
                    </li>
                    <li className="flex p-2 hover:bg-gray-200 cursor-pointer">
                      <ExitToAppOutlinedIcon />
                      <p className="ml-3 font-light  ">Changer de compte</p>
                    </li>
                    <li
                      className="flex p-2 hover:bg-gray-200 cursor-pointer border-t border-gray-300"
                      onClick={() => {
                        signOut(auth);
                        setLoading();
                      }}
                    >
                      <p className="ml-2 font-light  ">Deconnection</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </HeaderContainer>,
          document.getElementById("modal")
        )}
      </Fragment>
    );
  }
}

export default MenuModal;
