import { doc, getDoc } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderHolder from "../../components/global/HeaderHolder";
import Loading from "../../components/global/Loading";
import InformationSection from "../../components/profile/InformationSection";
import ProfilePosts from "../../components/profile/ProfilePosts";
import { userDetail } from "../../features/auth-state/auth-slice";
import {
  loading2,
  setComponentLoading,
  setProfileId,
  userId,
} from "../../features/profileSlice/Profile-Slice";
import { db } from "../../Firebase/Firebase";

function Profile() {
  const [userState, setUserState] = useState(false);
  const [userInfos, setUserInfos] = useState({});
  const [followed, setFollowed] = useState(false);
  const userId2 = useSelector(userId);

  const loading = useSelector(loading2);
  const user = useSelector(userDetail);
  // console.log(userId2, loading);
  const dispatch = useDispatch();
  // ................
  const fetchUsers = async (id) => {
    const docum = await getDoc(doc(db, "users", id));
    return { ...docum?.data() };
  };
  const FollowChanger = (value) => {
    setFollowed(value);
  };
  // this use effect to know if the profile we are in is the userProfile or an other profile ( followed /infollowed)
  useEffect(() => {
    if (userId2 === user.id) {
      // here we see if the profile match the user
      setUserState(true);

      fetchUsers(user.id).then((res) => {
        setUserInfos(res);
        // console.log(userInfos);

        dispatch(setComponentLoading(false));
      });
    } else {
      // here we see if the profile match one of the followed users
      setUserState(false);

      // console.log(userId2);
      console.log("from profile");
      fetchUsers(userId2).then((res) => {
        setUserInfos(res);
        console.log(userInfos);

        // checking if  the user followers includes the user id
        if (res?.followers.includes(user.id)) {
          setFollowed(true);
          console.log("true");
        } else {
          setFollowed(false);
        }
        dispatch(setComponentLoading(false));
      });
      // cleanup function
      return () => {
        setUserInfos({});
      };

      // setFollowed(true);
    }
  }, [userId2, loading]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <HeaderHolder>
          <InformationSection
            userState={userState}
            followed={followed}
            infos={userInfos}
            FollowChanger={FollowChanger}
          />
          {/* ............................... */}
          <ProfilePosts infos={userInfos} userState={userState} />
        </HeaderHolder>
      )}
    </Fragment>
  );
}

export default Profile;
