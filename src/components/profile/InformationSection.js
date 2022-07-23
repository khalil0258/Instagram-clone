import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import { HeaderContainer } from "../global/ContainerSignup";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../Firebase/Firebase";

import Unfollow from "./Unfollow";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

// ...........................
function InformationSection({ userState, followed, infos, FollowChanger }) {
  console.log(infos);
  const [postss, setPostss] = useState([]);
  document.title = infos.userName;
  useEffect(() => {
    const fetchPosts = async () => {
      let postsArray = [];
      const posts = await getDocs(
        collection(db, "users", infos?.userId, "posts")
      );
      posts.forEach((post) => {
        postsArray.push({ id: post.id, ...post.data() });
      });
      return postsArray;
    };
    fetchPosts().then((res) => {
      setPostss(res);
      console.log(res);
    });
  }, [infos]);
  return (
    <div>
      <HeaderContainer>
        <div className="flex  max-h-[170px] w-full ">
          {/* the right section of the information section which shows the profile pic */}
          <div className="min-w-[100px] md:w-1/3  flex justify-center items-center">
            <img
              src={
                (infos && infos?.profileImage) ||
                require("../../assets/profile.png")
              }
              alt="profile image"
              className=" h-3/5  object-cover rounded-full md:h-full"
            />
          </div>
          {/* the left secion of the information section which shows the profile information and some extra features */}
          <div className="text-left pl-4 ">
            {/* the above section that shows the profile name */}
            <div className="flex justify-start items-center mb-6">
              <h2 className="text-lg mr-12 ">{infos && infos?.userName}</h2>
              {userState ? (
                // profile of the user
                <CurrentUser />
              ) : followed ? (
                // profile of followed user
                <Followed
                  img={
                    (infos && infos?.profileImage) ||
                    require("../../assets/signupAssets/my.jpg")
                  }
                  FollowChanger={FollowChanger}
                  infos={infos}
                  user={auth.currentUser}
                />
              ) : (
                // profile of not followed user
                <NotFollowed
                  id={infos.userId}
                  user={auth.currentUser}
                  FollowChanger={FollowChanger}
                />
              )}
            </div>
            {/* section that shows the followers and the following and the posts number */}
            <div className="flex items-center">
              {/* posts number  */}
              <div className="font-normal text-md mr-14">
                <span className="font-medium text-[16px] mr-1">
                  {postss?.length}
                </span>
                posts
              </div>
              {/* followers number  */}
              <div className="font-normal text-md mr-14">
                <span className="font-medium text-[16px] mr-1">
                  {infos && infos?.followers?.length}
                </span>
                followers
              </div>
              {/* following number  */}
              <div className="font-normal text-md mr-14">
                <span className="font-medium text-[16px] mr-1">
                  {infos && infos?.followed?.length}
                </span>
                following
              </div>
            </div>
            {/* ////////////////////////////////////// */}
            {/* now the description section */}
            <div className="mt-6">
              <p className="text-md ">{infos?.profileDescription}</p>
            </div>
          </div>
        </div>
        {/* now saved stories section  */}

        <div>now saved stories section</div>
      </HeaderContainer>
    </div>
  );
}

const Followed = (props) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const clicked = () => {
    setShowMenu(false);
  };

  return (
    <div className="flex ">
      <button
        className="px-1 capitalize  mr-2 text-sm font-medium  border border-black border-opacity-20 rounded-sm "
        onClick={async () => {
          console.log(auth.currentUser.uid, "fffff", props.infos.userId);
          await setDoc(
            doc(db, "users", auth.currentUser.uid, "rooms", props.infos.userId),
            {
              id: props.infos.userId,
              userName: props.infos.userName,
              photoURL: props.infos.profileImage,
              time: new serverTimestamp(),
            }
          )
            .then(async () => {
              await setDoc(
                doc(
                  db,
                  "users",
                  props.infos.userId,
                  "rooms",
                  auth.currentUser.uid
                ),
                {
                  id: auth.currentUser.uid,
                  userName: props.user.displayName,
                  photoURL: props.user.photoURL,
                  time: new serverTimestamp(),
                }
              );
            })
            .then(() => {
              navigate(`/direct/${props.infos?.userId}`);
            });
        }}
      >
        Message
      </button>
      <button className="px-1 capitalize  mr-2 text-sm font-medium  border border-black border-opacity-20 rounded-sm ">
        <PersonIcon
          sx={{ height: "23px", width: "27px" }}
          onClick={() => {
            setShowMenu(true);
          }}
        />
      </button>
      <button className="px-1 capitalize  mr-2 text-sm font-medium  border border-black border-opacity-20 rounded-sm ">
        <CheckIcon />
      </button>
      <button className="px-1 capitalize  mr-2 text-sm font-medium    ">
        <MoreHorizIcon />
      </button>
      <Unfollow
        open={showMenu}
        clicked={clicked}
        img={props.img}
        FollowChanger={props.FollowChanger}
        id={props.infos.userId}
        user={props.user}
      />
    </div>
  );
};
const CurrentUser = () => {
  return (
    <div>
      <Link to="/account/edit">
        <button className="px-1 capitalize  mr-2 text-sm font-medium  border border-black border-opacity-20 rounded-sm cursor-pointer ">
          edit Profile
        </button>
      </Link>
      <SettingsIcon className="cursor-pointer" />
    </div>
  );
};
const NotFollowed = (props) => {
  const [follow, setFollow] = useState();
  const fetchFollow = async () => {
    const docum = await getDoc(doc(db, "users", props.user.uid));
    return docum.data();
  };

  // useEffect(() => {
  //   fetchFollow().then((res) => {
  //     if (res?.followers.includes(props.id)) {
  //       setFollow(true);
  //     } else {
  //       setFollow(false);
  //     }
  //   });
  // }, []);
  return (
    <div className="flex  ">
      <button
        className={`capitalize  mr-2 text-xs px-4 font-medium   rounded-sm outline-none ${
          follow
            ? "bg-white text-black border border-opacity-20"
            : "bg-blue-500 text-white"
        }`}
        onClick={async () => {
          props.FollowChanger(true);
          // update doc .array de followers
          await updateDoc(doc(db, "users", props.user.uid), {
            followed: arrayUnion(props.id),
          }).then(async () => {
            await updateDoc(doc(db, "users", props.id), {
              followers: arrayUnion(props.user.uid),
            });
          });

          // console.log("clickd");
        }}
      >
        Follow
      </button>

      <button className="px-1 capitalize  mr-2 text-sm font-medium bg-blue-500 text-white  rounded-sm ">
        <CheckIcon />
      </button>
      <button className="px-1 capitalize  mr-2 text-sm font-medium    ">
        <MoreHorizIcon />
      </button>
    </div>
  );
};
export default InformationSection;
