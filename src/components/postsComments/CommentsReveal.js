import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../Firebase/Firebase";

function CommentsReveal(props) {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  console.log("zz", props.main);
  const loadReplies = async () => {
    setShowReplies((prev) => {
      return !prev;
    });
    let cond = props?.main?.replies > (replies?.length || 0);
    console.log(!showReplies, cond);
    console.log(replies);
    if (!showReplies && cond) {
      let snapi = await getDocs(
        query(
          collection(
            db,
            "users",
            props?.main?.userId,
            "posts",
            props?.main?.postId,
            "comments",
            props?.main?.id,
            "subComments"
          ),
          orderBy("time", "asc")
        )
      );
      let rep = [];
      snapi?.forEach((s) => {
        rep.push({ replieId: s?.id, ...s?.data() });
      });
      console.log("piii", rep);
      return rep;
    }
  };
  return (
    <div className="mb-4">
      <div id="description" className="flex items-center gap-2">
        <img
          src={props?.main.profileURL || require("../../assets/profile.png")}
          alt="profile img"
          className="h-11 w-11 rounded-full"
        />
        <div>
          <div className="flex items-center justify-start gap-1 ">
            <p className="font-medium text-[17px]">{props.main.senderName}</p>
            <p className="text-global text-[16px]  ">{props.main.text}</p>
          </div>
          <div className="flex gap-3 justify-start">
            <span className="text-gray-500 text-sm">
              {!!props.main.time &&
              Math.floor(
                (new Date() - new Date(props.main.time?.toDate())) / 60000
              ) > 60
                ? Math.floor(
                    (new Date() - new Date(props.main.time?.toDate())) / 3600000
                  )
                : Math.floor(
                    (new Date() - new Date(props.main.time?.toDate())) / 60000
                  ) > 1
                ? Math.floor(
                    (new Date() - new Date(props.main.time?.toDate())) / 60000
                  )
                : "instant"}
              {Math.floor(
                (new Date() - new Date(props.main.time?.toDate())) / 60000
              ) > 60
                ? "h"
                : Math.floor(
                    (new Date() - new Date(props.main.time?.toDate())) / 60000
                  ) > 1
                ? "m"
                : ""}
            </span>
            <span
              className="text-gray-500 text-sm font-medium cursor-pointer"
              onClick={() => {
                props.tag("@" + props.main.senderName);
                props.setIndex(props.in - 1);
              }}
            >
              Repondre
            </span>
          </div>
        </div>
      </div>
      {/* this is the sub comments section  */}
      {props.main.replies && (
        <div
          className="text-gray-600 mt-2 ml-8 hover:text-gray-700 cursor-pointer  text-sm"
          onClick={() => {
            loadReplies().then((res) => {
              setReplies(res);
            });
          }}
        >
          {showReplies ? "Masquer" : "Afficher"} les reponses (
          {props?.main.replies})
        </div>
      )}
      {showReplies && !!replies?.length && (
        <div>
          {replies.map((rep, index) => (
            <div key={index} className="ml-12">
              <div className="flex gap-2">
                <div>
                  <img
                    src={rep?.senderImg || require("../../assets/profile.png")}
                    alt="profile img"
                    className="h-8 w-8 rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-start gap-1">
                    <p className="font-medium text-[17px]">{rep?.senderName}</p>
                    <p className="text-global text-[16px]  ">{rep?.text}</p>
                  </div>
                  <div className="flex gap-3 justify-start">
                    <p className="text-gray-500 text-sm">
                      {!!rep?.time &&
                      Math.floor(
                        (new Date() - new Date(rep?.time?.toDate())) / 60000
                      ) > 60
                        ? Math.floor(
                            (new Date() - new Date(rep?.time?.toDate())) /
                              3600000
                          )
                        : Math.floor(
                            (new Date() - new Date(rep?.time?.toDate())) / 60000
                          ) > 1
                        ? Math.floor(
                            (new Date() - new Date(rep?.time?.toDate())) / 60000
                          )
                        : "instant"}
                      {Math.floor(
                        (new Date() - new Date(rep?.time?.toDate())) / 60000
                      ) > 60
                        ? "h"
                        : Math.floor(
                            (new Date() - new Date(rep?.time?.toDate())) / 60000
                          ) > 1
                        ? "m"
                        : ""}
                    </p>
                    <p
                      className="text-gray-500 text-sm font-medium cursor-pointer"
                      onClick={() => {
                        props.tag("@" + rep?.senderName);
                        props.setIndex(props.in - 1);
                      }}
                    >
                      Repondre
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentsReveal;
