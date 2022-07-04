import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  limit,
  where,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { object } from "yup";
import { userDetail } from "../../features/auth-state/auth-slice";
import { db } from "../../Firebase/Firebase";
import FriendMessage from "./FriendMessage";
import MessageInput from "./MessageInput";
import UserMessages from "./UserMessages";

function Message() {
  let location = useLocation();
  const [roomInfo, setRoomInfo] = useState({});
  const [messages, setMessages] = useState([]);

  const [pathName, setPathName] = useState(location.pathname.split("/", 3)[2]);

  const user = useSelector(userDetail);

  const getUserRoom = useCallback(async () => {
    const room = await getDoc(doc(db, "users", user.id, "rooms", pathName));
    return room.data();
  }, [pathName]);

  //   this useEffect is for the messages rooms in the left
  useEffect(() => {
    getUserRoom().then((res) => {
      setRoomInfo(res);
    });
  }, []);
  //  and this useEffect is for the messages section .it listen to the changes of the db and run every time we change anything in db
  useEffect(() => {
    const q = query(
      collection(db, "users", user.id, "rooms", pathName, "messages"),
      orderBy("time", "asc")
    );
    let unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msg = [];
      querySnapshot.forEach((doc) => {
        msg.push({ ...doc.data(), id: doc.id });
      });
      setMessages(msg);
    });

    return unsubscribe;
  }, []);

  const addVueStatement = async () => {
    let q = query(
      doc(
        db,
        "users",
        user.id,
        "rooms",
        pathName,
        "messages",
        messages[messages.length - 1].id
      )
    );
    await updateDoc(q, {
      seen: true,
    });
  };
  addVueStatement();

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
            {Object.values(messages).map((message, index) => {
              console.log(message);

              if (message?.senderId === user.id) {
                return (
                  <UserMessages
                    key={index}
                    index={index}
                    seen={message?.seen}
                    senderId={pathName}
                    type={message?.type}
                    userId={user.id}
                    message={message?.message}
                    time={new Date(message?.time?.toDate()).toUTCString()}
                    length={messages?.length - 1}
                  />
                );
              } else {
                return (
                  <FriendMessage
                    key={index}
                    index={index}
                    seen={message?.seen}
                    photoURL={roomInfo?.photoURL}
                    userId={user.id}
                    senderId={pathName}
                    type={message?.type}
                    message={message?.message}
                    time={new Date(message?.time?.toDate()).toUTCString()}
                  />
                );
              }
            })}
          </div>
          <MessageInput user={user} pathName={pathName} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Message);

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
