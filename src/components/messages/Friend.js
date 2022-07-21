import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { auth, db } from "../../Firebase/Firebase";

function Friend(props) {
  const [friendRoom, setFriendRoom] = useState({});

  useEffect(() => {
    let unsubscribe = onSnapshot(
      doc(db, "users", auth.currentUser.uid, "rooms", props.id),
      (querySnapshot) => {
        setFriendRoom(querySnapshot.data());
        console.log(querySnapshot.data());
      }
    );
    console.log("hello", friendRoom);
    return unsubscribe;
  }, []);
  return (
    <Link to={props.id}>
      <div className="py-2 cursor-pointer">
        <div className="flex px-3 gap-2  ">
          <img
            src={props.photoUrl || require("../../assets/profile.png")}
            alt="profile img"
            className="h-14 w-14 rounded-full"
          />
          <div className="text-left pt-2">
            <h2 className={`text-md ${!friendRoom?.seen && "font-medium"}`}>
              {props.userName}
            </h2>
            <span> </span>
            <span className="text-gray-400 font-medium text-sm ">
              {props.lastMessage || ""}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default React.memo(Friend);
