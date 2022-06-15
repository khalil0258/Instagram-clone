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
  userId,
} from "../../features/profileSlice/Profile-Slice";

function Profile() {
  const [userState, setUserState] = useState(false);
  const [followed, setFollowed] = useState(false);
  const userId2 = useSelector(userId);

  const loading = useSelector(loading2);
  const user = useSelector(userDetail);
  console.log(userId2, loading);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      if (userId2 === user.uid) {
        setUserState(true);
        dispatch(setComponentLoading(false));
      } else {
        // here we see if the profile match one of the followed users
        
        setUserState(false);

        // setFollowed(true);
        dispatch(setComponentLoading(false));
      }
    } catch (err) {
      alert("ERROR");
    }

    // setTimeout(() => {
    //   dispatch(setComponentLoading(false));
    // }, 2000);
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <HeaderHolder>
          <InformationSection userState={userState} followed={followed} />
          {/* ............................... */}
          <ProfilePosts />
        </HeaderHolder>
      )}
    </Fragment>
  );
}

export default Profile;
