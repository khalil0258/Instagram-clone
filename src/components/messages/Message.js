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
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setProfileId } from "../../features/profileSlice/Profile-Slice";
import { auth, db } from "../../Firebase/Firebase";
import FriendMessage from "./FriendMessage";
import MessageInput from "./MessageInput";
import UserMessages from "./UserMessages";

function Message() {
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomInfo, setRoomInfo] = useState({});
  const [messages, setMessages] = useState([]);
  const [friendRoom, setFriendRoom] = useState({});
  console.log(location.pathname.split("/", 3)[2]);
  const [pathName, setPathName] = useState(location.pathname.split("/", 3)[2]);

  // const getRoom = async () => {
  //   const room = await getDoc(doc(db, "users", pathName, "rooms", user.id));
  //   return room.data();
  // };

  const getUserRoom = useCallback(async () => {
    const room = await getDoc(
      doc(db, "users", auth.currentUser.uid, "rooms", pathName)
    );
    return room.data();
  }, [pathName]);

  useEffect(() => {
    let unsubscribe = onSnapshot(
      doc(db, "users", pathName, "rooms", auth.currentUser.uid),
      (querySnapshot) => {
        setFriendRoom(querySnapshot.data());
      }
    );
    console.log(friendRoom);
    return unsubscribe;
  }, []);
  //   this useEffect is for the messages rooms in the left
  useEffect(() => {
    // document.getElementById("messages").firstElementChild.scrollTo(0, 400);

    getUserRoom().then((res) => {
      setRoomInfo(res);
    });
  }, []);
  //  and this useEffect is for the messages section .it listen to the changes of the db and run every time we change anything in db
  useEffect(() => {
    const q = query(
      collection(
        db,
        "users",
        pathName,
        "rooms",
        auth.currentUser.uid,
        "messages"
      ),
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

  useEffect(() => {
    addVueStatement();
  }, [messages?.length]);

  const addVueStatement = async () => {
    if (!!messages?.length) {
      let q = doc(db, "users", auth.currentUser.uid, "rooms", pathName);

      await updateDoc(q, {
        seen: true,
      });
    }
  };

  return (
    <div>
      <div className="w-[570px]  h-full relative">
        <div className="py-2 cursor-pointer border-b w-full">
          {/* ..................... */}
          {/* header section  */}

          <div
            className="flex px-3 gap-2 items-center "
            onClick={() => {
              dispatch(setProfileId({ id: roomInfo?.id }));
              navigate(`/${roomInfo?.userName}`);
            }}
          >
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
          <div className="flex flex-col justify-start p-2 overflow-scroll h-[75%] overflow-x-hidden ">
            {/* messages container */}
            {messages.length === 0 ? (
              <div className="relative top-32 ">
                <h2 className="text-2xl  font-medium font-sans space  ">
                  {roomInfo?.userName}
                </h2>
                <p className="font-thin text-sm text-global">
                  Start Conversation
                </p>
              </div>
            ) : (
              <>
                {Object.values(messages).map((message, index) => {
                  // console.log(message);

                  if (message?.senderId === auth.currentUser.uid) {
                    return (
                      <UserMessages
                        key={index}
                        index={index}
                        seen={message?.seen}
                        senderId={pathName}
                        type={message?.type}
                        userId={auth.currentUser.uid}
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
                        userId={auth.currentUser.uid}
                        senderId={pathName}
                        type={message?.type}
                        message={message?.message}
                        time={new Date(message?.time?.toDate()).toUTCString()}
                      />
                    );
                  }
                })}
              </>
            )}
            {friendRoom?.seen &&
            messages[messages?.length - 1]?.senderId ===
              auth.currentUser.uid ? (
              <span className="text-right pr-2 font-medium text-[12px] text-global">
                VU
              </span>
            ) : null}
          </div>
          <MessageInput user={auth.currentUser} pathName={pathName} />
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
