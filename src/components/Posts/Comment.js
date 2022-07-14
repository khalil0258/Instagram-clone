import React, { useState } from "react";
import emogis from "../../textAssets/emogis.json";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";

function Comment(props) {
  const [text, setText] = useState("");
  const [showEmogy, setShowEmogy] = useState(false);
  const user = useSelector(userDetail);

  const pushComment = async () => {
    if (text.trim() != "")
      addDoc(
        collection(db, "users", props.id, "posts", props.postId, "comments"),
        {
          text: text,
          time: new serverTimestamp(),
          senderId: user.id,
          senderName: user.displayName,
          senderImg: user.photoURL,
        }
      ).then(() => {
        setText("");
      });
  };

  return (
    <div className=" w-full mx-auto  py-3 px-2   bg-white border-t  flex items-center justify-start gap-4 shadow-sm">
      <div className="relative">
        <SentimentSatisfiedAltIcon
          onClick={() => {
            setShowEmogy((prev) => {
              return !prev;
            });
          }}
        />
        {showEmogy && (
          <div className="flex h-48 absolute bottom-11 -left-4 w-48 bg-white border shadow-sm flex-wrap overflow-scroll overflow-x-hidden cursor-pointer">
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
      <input
        value={text}
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="w-[75%] outline-none h-3/5   resize-none text-sm font-normal text-global "
      />
      <div className="flex items-center gap-3 justify-center">
        <p
          className="text-blue-500 font-medium cursor-pointer"
          onClick={pushComment}
        >
          send
        </p>
      </div>
    </div>
  );
}

export default Comment;
