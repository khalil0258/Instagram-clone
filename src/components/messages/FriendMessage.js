import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { storage } from "../../Firebase/Firebase";

function FriendMessage(props) {
  const [show, setShow] = useState(false);
  const [img, setImg] = useState("");
  const messageLast = useRef("");
  useEffect(() => {

    if (props.type === "image") {
      getDownloadURL(
        ref(
          storage,
          `users/${props.userId}/messages/${props.senderId}/${props.message}`
        )
      ).then((url) => {
        console.log(url);
        // Or inserted into an <img> elems
        setImg(url);
      });
    }
  }, []);
  if (props.type === "text") {
    return (
      <div className="self-start mb-2  " ref={messageLast}>
        <div className="flex gap-1">
          <img
            src={props.photoURl || require("../../assets/profile.png")}
            alt="orofile img "
            className="h-11 w-11 rounded-full"
          />
          <div
            className="bg-white text-black p-2 text-sm font-normal rounded-full border rounded-bl-none "
            onClick={() => {
              setShow(!show);
            }}
          >
            {props.message}
          </div>
        </div>

        {show && (
          <span className="text-gray-400 text-xs mt-2 mr-2 flex justify-end">
            {props.time}
          </span>
        )}
        {/* <span className="text-sm font-normal text-gray-500 "></span> */}
      </div>
    );
  } else {
    return (
      <div
        className="self-start mb-2 mr-2  flex items-start flex-col"
        ref={messageLast}
      >
        <img
          src={img}
          alt="message pic"
          className="h-40 w-32 rounded-md object-cover "
          onClick={() => {
            setShow(!show);
          }}
        />
        {show && (
          <span className="text-gray-400 text-xs mt-2  flex justify-end">
            {props.time}
          </span>
        )}
        {/* <span className="text-sm font-normal text-gray-500 text-right">gg</span> */}
      </div>
    );
  }
}

export default React.memo(FriendMessage);
