import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userDetail } from "../../features/auth-state/auth-slice";
import { db } from "../../Firebase/Firebase";
import MessageInput from "./MessageInput";

function Message() {
  let location = useLocation();
  const [roomInfo, setRoomInfo] = useState({});
  //   console.log(location);
  //   geting the room id
  let pathName = location.pathname.split("/", 3)[2];
  const user = useSelector(userDetail);
  console.log(pathName);

  const getUserRoom = useCallback(async () => {
    const room = await getDoc(doc(db, "users", user.id, "rooms", pathName));
    return room.data();
  }, [pathName]);

  const getFriendRoom = useCallback(async () => {
    const room = await getDoc(doc(db, "users", pathName, "rooms", user.id));
    return room.data();
  }, [pathName]);
  const getUserMessages = async () => {
    let messages = [];
    const messagesDocs = await getDocs(
      collection(db, "users", user.id, "rooms", pathName, "messages")
    );
    messagesDocs?.forEach((mess) => {
      messages.push(mess.docs);
    });
    return messages.length !== 0 ? messages : {};
  };
  const getFriendMessages = async () => {
    let messages = [];
    const messagesDocs = await getDocs(
      collection(db, "users", pathName, "rooms", user.id, "messages")
    );
    messagesDocs?.forEach((mess) => {
      messages.push(mess.docs);
    });
    return messages.length !== 0 ? messages : {};
  };
  useEffect(() => {
    getUserRoom()
      .then((res) => {
        setRoomInfo(res);
        console.log(res);
      })
      .then(() => {});
  }, []);

  return (
    <div>
      <div className="w-[570px]  h-full relative">
        <div className="py-2 cursor-pointer border-b w-full">
          {/* ..................... */}
          {/* header section  */}
          <div className="flex px-3 gap-2 items-center ">
            <img
              src={require("../../assets/profile.png")}
              alt="profile img"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h2 className=" text-md">Khalil____hjz</h2>
              {/* <span> </span> */}
            </div>
          </div>
          {/* messages section  */}
          <div id="messages" className="">
            <div>{/* messages container */}</div>
            <MessageInput user={user} pathName={pathName} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
