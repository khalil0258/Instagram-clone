import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../../Firebase/Firebase";

function UserMessages(props) {
  const [show, setShow] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    console.log(props.index, props.length, props.seen);
    if (props.index === props.length) {
      setSeen(props.seen);
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
      <div className="self-end mb-2  ">
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
            {seen && (
              <span className="text-sm font-normal text-gray-500 text-right">
                Vu
              </span>
            )}
          </>
        )}
      </div>
    );
  } else {
    return (
      <div className="self-end mb-2 mr-2  flex items-end flex-col">
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
            {seen && (
              <span className="text-sm font-normal text-gray-500 ">Vu</span>
            )}
          </>
        )}
      </div>
    );
  }
}

export default React.memo(UserMessages);
