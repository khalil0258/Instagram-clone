import React, { useEffect, useState } from "react";
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
  const [likes, setLikes] = useState([]);

  const [firstLike, setFirstLike] = useState({});
  const user = useSelector(userDetail);
  let cc = props.likes[0] == user.id;
  useEffect(() => {
    onSnapshot(
      doc(db, "users", props.id, "posts", props.postId),
      (querySnapshot) => {
        setLikes(querySnapshot?.data().likes);
        setLiked(querySnapshot?.data().likes.includes(user.id));
        // console.log("includes", querySnapshot.data());
        // console.log(querySnapshot.data());
        console.log(liked);
      }
    );
  }, []);

  useEffect(() => {
  
    const getProfile = async () => {
      const get = await getDoc(doc(db, "users", props.likes[0]));
      return get.data();
    };
    getProfile().then((res) => {
      setFirstLike(res);
    });
  }, []);
  return (
    <div className="px-3 ">
      <div className="flex  items-center justify-between py-2">
        {/* this is where we can like the image or give it comment or share it   */}
        <div>
          <FavoriteBorderOutlinedIcon
            className={`mr-2 cursor-pointer ${liked && "text-red-500"} `}
            onClick={async () => {
              if (liked != undefined) {
                if (!liked) {
                  setLiked((prevState) => {
                    return !prevState;
                  });
                  await updateDoc(
                    doc(db, "users", props?.id, "posts", props?.postId),
                    {
                      likes: arrayUnion(user.id),
                    }
                  );
                } else {
                  setLiked((prevState) => {
                    return !prevState;
                  });
                  await updateDoc(
                    doc(db, "users", props?.id, "posts", props?.postId),
                    {
                      likes: arrayRemove(user.id),
                    }
                  );
                }
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
        {!!likes?.length && (
          <p>
            Aime par
            <span className="text-[15px] font-medium cursor-pointer mx-1">
              {/* {firstLikes} */}
              {!!firstLike && liked ? "Moi" : firstLike?.userName}
            </span>
            {likes?.length != 1 && (
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
