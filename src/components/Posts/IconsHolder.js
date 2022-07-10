import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";

function IconsHolder(props) {
  const [liked, setLiked] = useState(false);

  const [firstLike, setFirstLike] = useState({});
  const user = useSelector(userDetail);
  let cc = props.likes[0] == user.id;
  useState(() => {
    // const fetchLikesPrifile = async () => {
    //   const dat = await getDoc(
    //     doc(db, "users", cc ? props.likes[1] : props.likes[0])
    //   );
    //   return dat.data();
    // };
    // fetchLikesPrifile().then((res) => {
    //   setFirstLike(res);
    // });
    console.log(cc);
    let unsubscribe = onSnapshot(
      doc(
        db,
        "users",
        cc && props.likes.length === 2 ? props.likes[1] : props?.likes[0]
      ),
      (querySnapshot) => {
        setFirstLike(querySnapshot.data());
        setLiked(props.likes.includes(props.id));
        console.log("includes", props.likes.includes(props.id));
      }
    );

    return unsubscribe;
  }, []);

  return (
    <div className="px-3 ">
      <div className="flex  items-center justify-between py-2">
        {/* this is where we can like the image or give it comment or share it   */}
        <div>
          <FavoriteBorderOutlinedIcon
            className={`mr-2 cursor-pointer ${liked && "text-red-500"} `}
            onClick={async () => {
              setLiked((prevState) => {
                return !prevState;
              });
              if (liked) {
                await updateDoc(
                  doc(db, "users", props.id, "posts", props.postId),
                  {
                    likes: arrayUnion(user.id),
                  }
                );
              } else {
                await updateDoc(
                  doc(db, "users", props.id, "posts", props.postId),
                  {
                    likes: arrayRemove(user.id),
                  }
                );
              }
            }}
          />
          <ChatBubbleOutlineOutlinedIcon className="mr-2 cursor-pointer " />
          <SendOutlinedIcon className="mr-2 cursor-pointer transform -rotate-12 " />
        </div>
        <div>
          <MoreVertIcon className="cursor-pointer" />
        </div>
      </div>
      {/* people liked this post  */}
      <div className="text-left pb-1">
        {!!props?.likes?.length && (
          <p>
            Aime par
            <span className="text-[15px] font-medium cursor-pointer mx-1">
              {/* {firstLikes} */}
              {!props?.likes?.length
                ? ""
                : props?.likes?.length === 1 && cc
                ? "Moi"
                : firstLike?.userName}
            </span>
            {props?.likes?.length != 1 && (
              <>
                et
                <span className="text-[15px] font-medium cursor-pointer mx-1">
                  autre personnes
                </span>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export default IconsHolder;
