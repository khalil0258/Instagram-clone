import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import React from "react";
import ReactDOM from "react-dom";
import { db } from "../../Firebase/Firebase";
import { BackDrop } from "../global/MenuModal";

function Unfollow(props) {
  if (!props.open) return null;
  else {
    return (
      <div>
        {ReactDOM.createPortal(
          <BackDrop clicked={props.clicked} open={props.open} back />,
          document.getElementById("backdrop")
        )}
        {ReactDOM.createPortal(
          <UnfollowModel
            img={props.img}
            FollowChanger={props.FollowChanger}
            id={props.id}
            user={props.user}
            clicked={props.clicked}
          />,
          document.getElementById("Othermodals")
        )}
      </div>
    );
  }
}
const UnfollowModel = (props) => {
  return (
    <div
      className="bg-white h-[50vh] w-1/3  fixed left-1/3 top-1/3 text-center rounded-md   "
      style={{ zIndex: 1200 }}
    >
      <div className="py-12">
        <img
          src={props.img}
          alt="profile img"
          className="h-24 w-24 rounded-full mx-auto  "
        />
      </div>
      <div className="w-full py-4 border-t border-opacity-10 ">
        <button
          className="text-red-600 font-medium h-full w-full "
          onClick={async () => {
            props.FollowChanger(false);
            await updateDoc(doc(db, "users", props.user.id), {
              followed: arrayRemove(props.id),
            }).then(async () => {
              await updateDoc(doc(db, "users", props.id), {
                followers: arrayRemove(props.user.id),
              });
            });
          }}
        >
          Unfollow
        </button>
      </div>
      <div className="w-full py-4 border-t border-opacity-10 ">
        <button
          className=" font-normal h-full w-full "
          onClick={() => {
            props.clicked();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Unfollow;
