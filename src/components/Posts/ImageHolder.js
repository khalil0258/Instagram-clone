import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";
import { db } from "../../Firebase/Firebase";

function ImageHolder(props) {
  const [showHeart, setShowHeart] = useState(false);
  const user = useSelector(userDetail);
  return (
    <div className="w-full h-[400px] overflow-hidden">
      <div
        className="h-full cursor-pointer relative "
        onDoubleClick={async () => {
          console.log("here we go again");
          setShowHeart(true);
          setTimeout(() => {
            setShowHeart(false);
          }, 200);
          await updateDoc(doc(db, "users", props.id, "posts", props.postId), {
            likes: arrayUnion(user.id),
          });
        }}
      >
        <img
          src={props.imageURL}
          alt="postImage"
          className="w-full h-full object-cover"
        />
        {showHeart && (
          <img
            src={require("../../assets/Heart.png")}
            className="absolute top-40 left-44 h-24 w-24"
          />
        )}
      </div>
      {/* <div></div> */}
    </div>
  );
}

export default ImageHolder;
