import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";
import { db } from "../../Firebase/Firebase";
import PostName from "../Posts/PostName";
import Friend from "./Friend";

function Friends() {
  const user = useSelector(userDetail);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchFriends = async () => {
      let rooms = [];
      const roomsDocuments = await getDocs(
        collection(db, "users", user.id, "rooms")
      );
      roomsDocuments.forEach((room) => {
        rooms.push(room.data());
      });
      return rooms;
    };
    fetchFriends().then((result) => {
      setRooms(result);
    });
  });
  return (
    <div className="w-[370px] h-full border-r ">
      <div className="text-center py-4 font-medium text-md border-b">
        <h3>{user.displayName}</h3>
      </div>
      <div className="overflow-y-scroll h-[460px]">
        {rooms.map((room) => (
          <Friend id={room.id} img={room.photoURl} userName={room.userName} />
        ))}
        {/* <Friend id={"123"} /> */}
      </div>
    </div>
  );
}

export default Friends;
