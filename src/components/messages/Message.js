import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
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

  useEffect(() => {
    // console.log(typeof messages);
    // const q = query(
    //   collection(db, "users", user.id, "rooms", pathName, "messages"),
    //   orderBy("time", "asc")
    // );
    // onSnapshot(q, (snapshot) => {
    //   userMessages.push(
    //     ...snapshot?.docs.map((doc) => {
    //       return doc.data();
    //     })
    //   );
    //   console.log("userMessages", userMessages);
    //   console.log("type of userMessages", typeof userMessages);
    //   setMessages(UserMessages);
    //   console.log(typeof messages);

    //   //   return userMessages;
    // });

    getUserRoom().then((res) => {
      setRoomInfo(res);
      // console.log(res);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "users", user.id, "rooms", pathName, "messages"),
      orderBy("time", "asc")
    );
    let unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msg = [];
      querySnapshot.forEach((doc) => {
        msg.push({ ...doc.data() });
      });
      setMessages(msg);
    });

    return unsubscribe;
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
            {Object.values(messages).map((message, index) => {
              console.log(message);

              if (message?.senderId === user.id) {
                return (
                  <UserMessages
                    key={index}
                    senderId={pathName}
                    type={message?.type}
                    userId={user.id}
                    message={message?.message}
                    time={new Date(message?.time?.toDate()).toUTCString()}
                  />
                );
              } else {
                return (
                  <FriendMessage
                    key={index}
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
