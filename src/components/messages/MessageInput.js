import React, { Fragment, useState } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

function MessageInput(props) {
  const [text, setText] = useState("");
  return (
    <div className="absolute bottom-4 w-[92%] mx-auto px-4 right-[4%] py-3   bg-white border rounded-full flex items-start justify-start gap-4 shadow-sm">
      <div>
        <SentimentSatisfiedAltIcon />
      </div>
      <textarea
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="w-[75%] outline-none h-4   resize-none text-sm font-normal text-global "
      />
      <div className="flex items-center gap-3 justify-center">
        {text ? (
          <p
            className="text-blue-500 font-medium "
            onClick={async () => {
              addDoc(
                collection(
                  db,
                  "users",
                  props.user.id,
                  "rooms",
                  props.pathname,
                  "messages"
                ),
                {
                  type: "text",
                  message: text,
                  time: new serverTimestamp(),
                  senderId: props.user.id,
                  senderImg: props.user.photoURL,
                }
              );
            }}
          >
            send
          </p>
        ) : (
          <Fragment>
            <div className="flex items-center ">
              <label for="file-input" className="cursor-pointer">
                <CollectionsIcon />
              </label>
              <input type="file" className="hidden" id="file-input" />
            </div>
            <FavoriteBorderIcon />
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default MessageInput;
