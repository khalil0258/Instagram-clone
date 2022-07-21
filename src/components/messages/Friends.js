import { collection, doc, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";

import { useLocation } from "react-router";

import { auth, db } from "../../Firebase/Firebase";
import PostName from "../Posts/PostName";
import Friend from "./Friend";

function Friends() {
  const [rooms, setRooms] = useState([]);

  // function to fetch rooms
  const fetchFriends = useCallback(async () => {
    let rooms = [];
    const roomsDocuments = await getDocs(
      collection(db, "users", auth.currentUser.uid, "rooms")
    );
    roomsDocuments.forEach((room) => {
      rooms.push(room.data());
    });
    return rooms;
  }, []);
  // function to fetch wether the message is seen or not

  useEffect(() => {
    fetchFriends().then((result) => {
      setRooms(result);
      // console.log(result);
    });
  }, []);
  return (
    <div className="w-[370px] h-full border-r ">
      <div className="text-center py-4 font-medium text-md border-b">
        <h3>{auth.currentUser.displayName}</h3>
      </div>
      <div className="overflow-y-scroll h-[453px]">
        {rooms.map((room) => (
          <Friend
            key={room.id}
            id={room.id}
            img={room.photoURl}
            userName={room.userName}
            lastMessage={room.lastMessage}
          />
        ))}
        {/* <Friend id={"123"} /> */}
      </div>
    </div>
  );
}

export default React.memo(Friends);
