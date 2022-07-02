import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userDetail } from "../../features/auth-state/auth-slice";
import { db } from "../../Firebase/Firebase";
import FriendMessage from "./FriendMessage";
import MessageInput from "./MessageInput";
import UserMessages from "./UserMessages";

function Message() {
  let location = useLocation();
  const [roomInfo, setRoomInfo] = useState({});
  const [messages, setMessages] = useState([]);
  //   console.log(location);
  //   geting the room id
  const [pathName, setPathName] = useState(location.pathname.split("/", 3)[2]);
  //   let pathName = location.pathname.split("/", 3)[2];
  const user = useSelector(userDetail);
  //   console.log(pathName);

  const getUserRoom = useCallback(async () => {
    const room = await getDoc(doc(db, "users", user.id, "rooms", pathName));
    return room.data();
  }, [pathName]);

  //   const getFriendRoom = useCallback(async () => {
  //     const room = await getDoc(doc(db, "users", pathName, "rooms", user.id));
  //     return room.data();
  //   }, [pathName]);
  //   const getUserMessages = useCallback(async () => {
  //     let messages = [];
  //     const messagesDocs = await getDocs(
  //       collection(db, "users", user.id, "rooms", pathName, "messages")
  //     );
  //     messagesDocs?.forEach((mess) => {
  //       messages.push(mess.docs);
  //     });
  //     return messages.length !== 0 ? messages : {};
  //   }, [pathName]);
  //   const getFriendMessages = async () => {
  //     let messages = [];
  //     const messagesDocs = await getDocs(
  //       collection(db, "users", pathName, "rooms", user.id, "messages")
  //     );
  //     messagesDocs?.forEach((mess) => {
  //       messages.push(mess.docs);
  //     });
  //     return messages.length !== 0 ? messages : {};
  //   };
  let userMessages = [];
  let friendMessages = [];
  useEffect(() => {
    Promise.all([
      onSnapshot(
        collection(db, "users", user.id, "rooms", pathName, "messages"),
        (snapshot) => {
          userMessages.push(...snapshot?.docs);
          //   console.log("uawe", userMessages);
          //   console.log(userMessages)
        }
      ),
      onSnapshot(
        collection(db, "users", pathName, "rooms", user.id, "messages"),
        (snapshot) => {
          friendMessages.push(...snapshot?.docs);
          //   console.log("ana", friendMessages);
        }
      ),
    ])
      .then((res) => {
        let messagesAll = userMessages.concat(friendMessages);

        console.log("messagesall", messagesAll);
        messagesAll.sort((a, b) => a.time - b.time);
      })
      .then(() => {
        // setMessages(...userMessages);
        // console.log("NAA", messages);
      });
    getUserRoom()
      .then((res) => {
        setRoomInfo(res);
        // console.log(res);
      })
      .then(() => {});
    // return unsub();
  }, []);

  return (
    <div>
      <div className="w-[570px]  h-full relative">
        <div className="py-2 cursor-pointer border-b w-full">
          {/* ..................... */}
          {/* header section  */}
          <div className="flex px-3 gap-2 items-center ">
            <img
              src={roomInfo?.photoURL || require("../../assets/profile.png")}
              alt="profile img"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h2 className=" text-md">{roomInfo?.userName}</h2>
              {/* <span> </span> */}
            </div>
          </div>
        </div>
        {/* messages section  */}
        <div id="messages" className="h-full">
          <div className="flex flex-col justify-start p-2 overflow-scroll h-[75%] overflow-x-hidden">
            {/* messages container */}

            {/* <UserMessages />
            <UserMessages />
            <UserMessages />
            <UserMessages />
            <UserMessages />
            <UserMessages />
            <FriendMessage />
            <FriendMessage />
            <FriendMessage />
            <FriendMessage />
            <FriendMessage />
            <FriendMessage />
            <UserMessages />
            <UserMessages />
            <UserMessages />
            <UserMessages />
            <UserMessages />
            <UserMessages />
            <UserMessages />
            <UserMessages /> */}
          </div>
          <MessageInput user={user} pathName={pathName} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Message);
