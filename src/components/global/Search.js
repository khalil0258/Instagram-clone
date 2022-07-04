import React, { Fragment, useEffect } from "react";
import { BackDrop } from "../global/MenuModal";
import ReactDOM from "react-dom";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import { useDispatch } from "react-redux";
import { setProfileId } from "../../features/profileSlice/Profile-Slice";
import { useNavigate } from "react-router";

const Profiles = ({ users }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      className="w-[400px] h-[300px]  rounded-md  top-14 fixed left-1/3 bg-white"
      style={{ zIndex: 1300 }}
    >
      {users?.map((user) => (
        <div
          key={user.userId}
          className="w-full h-14 flex items-center justify-start gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 "
          onClick={() => {
            // set the id to the user  id
            dispatch(setProfileId({ id: user?.userId }));
            navigate(`/${user?.name}`);
          }}
        >
          <img
            src={
              user.profileImage || require("../../assets/signupAssets/my.jpg")
            }
            alt=""
            className="h-10 w-10 rounded-full "
          />
          <h3 className="font-medium text-black">{user.userName}</h3>
        </div>
      ))}
    </div>
  );
};

function Search(props) {
  if (!props.open) {
    return;
  }

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop clicked={props.clicked} open={props.open} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <Profiles users={props.users} />,
        document.getElementById("Othermodals")
      )}
    </Fragment>
  );
}

export default Search;
