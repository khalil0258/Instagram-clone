import React, { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";
import { db } from "../../Firebase/Firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";

function IconsSection(props) {
  //   console.log("likes props", props);
  const [likes, setLikes] = useState([...props?.likes]);

  const [firstLike, setFirstLike] = useState({});
  const user = useSelector(userDetail);
  const [liked, setLiked] = useState(props.likes.includes(user.id));
  useEffect(() => {
    onSnapshot(
      doc(db, "users", props.id, "posts", props.postId),
      (querySnapshot) => {
        setLikes(querySnapshot?.data().likes);
        setLiked(querySnapshot?.data().likes.includes(user.id));
        // console.log("includes", querySnapshot.data());
        // console.log(querySnapshot.data());
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
  //   console.log("time", props.time);
  return (
    <div className="px-3 ">
      <div className="flex  items-center justify-between py-2 gap-1">
        {/* this is where we can like the image or give it comment or share it   */}
        <div>
          <FavoriteBorderOutlinedIcon
            className={`mr-2 cursor-pointer ${liked && "text-red-600"} `}
            onClick={async () => {
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
            }}
          />
          <ChatBubbleOutlineOutlinedIcon className="mr-2 cursor-pointer " />
          <SendOutlinedIcon className="mr-2 cursor-pointer transform -rotate-12 " />
        </div>
        <div>
          <BookmarkAddedOutlinedIcon className="cursor-pointer" />
        </div>
      </div>
      {/* people liked this post  */}
      <div className="text-left pb-1 mt-3">
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
        <p className="text-global text-[12px]   font-normal uppercase ">
          Il Y a
          <span>
            {!!props.time &&
            Math.floor((new Date() - new Date(props?.time?.toDate())) / 60000) >
              60
              ? Math.floor(
                  (new Date() - new Date(props?.time?.toDate())) / 3600000
                )
              : Math.floor(
                  (new Date() - new Date(props?.time?.toDate())) / 60000
                )}
            {Math.floor(
              (new Date() - new Date(props?.time?.toDate())) / 60000
            ) > 60
              ? "hours"
              : "minutes"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default IconsSection;
