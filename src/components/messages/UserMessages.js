import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { storage } from "../../Firebase/Firebase";

function UserMessages(props) {
  const [show, setShow] = useState(false);
  const [seen, setSeen] = useState(false);
  const messageLast = useRef("");

  useEffect(() => {
    console.log(props.index, props.length, props.seen);
    if (props.index === props.length) {
      setSeen(props.seen);

    //   messageLast.current.scrollIntoView({
    //     behavior: "smooth",
    //   });
    }
  }, [show]);
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
  const [img, setImg] = useState("");
  if (props.type === "text") {
    return (
      <div className="self-end mb-2  " ref={messageLast}>
        <div
          className="bg-gray-300 text-black p-2 text-sm font-normal rounded-full border rounded-br-none "
          onClick={() => {
            setShow(!show);
          }}
        >
          {props.message}
        </div>
        {show && (
          <>
            <span className="text-gray-400 text-xs mt-2 mr-2 flex justify-end">
              {props.time}
            </span>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div
        className="self-end mb-2 mr-2  flex items-end flex-col"
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
          <>
            <span className="text-gray-400 text-xs mt-2  flex justify-end">
              {props.time}
            </span>
          </>
        )}
      </div>
    );
  }
}

export default React.memo(UserMessages);
