import React, { Fragment, useEffect, useMemo, useState } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import emogis from "../../textAssets/emogis.json";

function MessageInput(props) {
  const [text, setText] = useState("");
  const [showEmogy, setShowEmogy] = useState(false);

  const pushMessage = async () => {
    addDoc(
      collection(
        db,
        "users",
        props.user.id,
        "rooms",
        props.pathName,
        "messages"
      ),
      {
        type: "text",
        message: text,
        time: new serverTimestamp(),
        senderId: props.user.id,
        senderImg: props.user.photoURL,
      }
    ).then(() => {
      setText("");
    });
  };
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div className="absolute bottom-4 w-[92%] mx-auto px-4 right-[4%] py-3   bg-white border rounded-full flex items-start justify-start gap-4 shadow-sm">
      <div className="relative">
        <SentimentSatisfiedAltIcon
          onClick={() => {
            setShowEmogy((prev) => {
              return !prev;
            });
          }}
        />
        {showEmogy && (
          <div className="flex h-48 absolute bottom-11 -left-4 w-48 bg-white border shadow-sm flex-wrap overflow-scroll overflow-x-hidden">
            {emogis.emojis.map((e, index) => (
              <span
                key={index}
                onClick={() => {
                  setText((prev) => {
                    return prev + e.emoji;
                  });
                }}
              >
                {e.emoji}
              </span>
            ))}
          </div>
        )}
      </div>
      <textarea
        value={text}
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="w-[75%] outline-none h-4   resize-none text-sm font-normal text-global "
      />
      <div className="flex items-center gap-3 justify-center">
        {text ? (
          <p className="text-blue-500 font-medium " onClick={pushMessage}>
            send
          </p>
        ) : (
          <Fragment>
            <div className="flex items-center ">
              <label htmlFor="file-input" className="cursor-pointer">
                <CollectionsIcon />
              </label>
              <input type="file" className="hidden" id="file-input" />
            </div>
            <div className="flex items-center ">
              <FavoriteBorderIcon
                onClick={() => {
                  console.log("clicked");
                  setText((prev) => {
                    return prev + emogis.emojis[25].emoji;
                  });
                }}
              />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default React.memo(MessageInput);
