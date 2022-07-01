import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userDetail } from "../../features/auth-state/auth-slice";
import { db } from "../../Firebase/Firebase";

function Message() {
  let location = useLocation();
  const [roomInfo, setRoomInfo] = useState({});
  //   console.log(location);
  //   geting the room id
  let pathName = location.pathname.split("/", 3)[2];
  const user = useSelector(userDetail);
  //   console.log(pathName);

  useEffect(() => {
    const getUserRoom = async () => {
      const room = await getDoc(doc(db, "users", user.id, "rooms", pathName));
      return room.data();
    };
    const getFriendRoom = async () => {
      const room = await getDoc(doc(db, "users", pathName, "rooms", user.id));
      return room.data();
    };
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
    getUserRoom()
      .then((res) => {
        setRoomInfo(res);
      })
      .then(() => {
        console.log(roomInfo);
      });
  }, []);

  return (
    <div>
      <div className="w-[570px]">
        <div className="py-2 cursor-pointer border-b w-full">
          <div className="flex px-3 gap-2 items-center ">
            <img
              src={require("../../assets/profile.png")}
              alt="profile img"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h2 className=" text-md">Khalil____hjz</h2>
              <span> </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
