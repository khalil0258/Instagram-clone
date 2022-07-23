import { doc, updateDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import React, { useRef, useState } from "react";

import { useDispatch } from "react-redux";

import { auth, db, storage } from "../../../Firebase/Firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

function EditPro() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const idGenerated = uuidv4();
  const changeThing = async (thing, element) => {
    if (thing === "image") {
      await uploadBytes(
        ref(
          storage,
          `users/ ${auth.currentUser.uid}/ profile/ ${idGenerated}.jpg`
        ),
        element
      ).then(async () => {
        getDownloadURL(
          ref(
            storage,
            `users/ ${auth.currentUser.uid}/ profile/ ${idGenerated}.jpg`
          )
        )
          .then(async (url) => {
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
              profileImage: url,
            });
          })
          .then(() => {
            alert("done");
          });
      });
    } else {
      // updating the users infos

      if (name != "" && userName != "") {
        updateDoc(doc(db, "users", auth.currentUser.uid), {
          profileDescription: bio,
          name: name,
          userName: userName,
        }).then(() => {
          navigate("/feed");
        });
      } else {
        alert("enter the name or the userName");
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-[100vh] bg-gray-100  w-full ">
      <div className="h-[75vh] w-[42%] bg-white rounded-2xl py-10 ">
        {/* profile image container  */}
        <div className="flex items-center justify-center gap-6 text-left">
          <img
            src={
              auth.currentUser.photoURL ||
              require("../../../assets/profile.png")
            }
            alt="profile img"
            className="h-12 w-12 rounded-full "
          />
          <div>
            <h4 className="text-lg font-medium ">Brahim </h4>

            <label htmlFor="file-input" className="cursor-pointer">
              <p className="text-blue-500 text-md cursor-pointer font-medium">
                Change the profile picture
              </p>
            </label>
            <input
              type="file"
              className="hidden"
              id="file-input"
              onInput={(e) => {
                // setImg(e.target.files[0]);
                if (e.target.files[0] != undefined) {
                  // console.log("iiiiiiiiiiiih", img);
                  changeThing("image", e.target.files[0]);
                }
              }}
            />
          </div>
        </div>
        {/* profile name changer  */}
        <div className="flex items-center justify-center gap-4 text-left py-8 ">
          <p className="font-medium text-md ">Name</p>
          <input
            onInput={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder={auth.currentUser.displayName}
            className="border border-black text-lg px-1 w-[210px]"
          />
        </div>
        {/* profile userName changer  */}
        <div className="flex items-center justify-center gap-2  -ml-4 text-left py-8 ">
          <p className="font-medium text-md ">userName</p>
          <input
            onInput={(e) => {
              setUserName(e.target.value);
            }}
            type="text"
            placeholder={auth.currentUser.displayName}
            className="border border-black text-lg px-1 w-[210px]"
          />
        </div>
        {/* profile name changer  */}
        <div className="flex items-center justify-center gap-4 text-left py-8 ">
          <p className="font-medium text-md ">Bio</p>
          <textarea
            onInput={(e) => {
              setBio(e.target.value);
            }}
            type="text"
            placeholder=""
            className="border border-black  px-1 ml-6 w-[210px]"
          />
        </div>
        <div>
          <button
            className="bg-blue-400 hover:bg-blue-500 text-center  text-white px-4 py-1 rounded-md"
            onClick={() => {
              changeThing("else");
            }}
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPro;
