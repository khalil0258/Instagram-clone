import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../Firebase/Firebase";
import { v4 as uuidv4 } from "uuid";

function DescriptionSection(props) {
  const [imgg, setImgg] = useState();
  const [inputPlace, setInputPlace] = useState();
  const [description, setDescription] = useState("");

  const idGenerated = uuidv4();
  //   in this useEffect i convert file fake path to file

  useEffect(() => {
    var fReader = new FileReader();
    fReader.onload = function (event) {
      setImgg(fReader.result);

      // img.src = event.target.result;
    };
    fReader.readAsDataURL(props.img);
  }, []);
  const uploadImg = async () => {
    if (props.img == null) return alert("error");
    // alert("imgAded");

    const imageRef = ref(
      storage,
      `users/${auth.currentUser.uid}/posts/${idGenerated}.jpg`
    );
    await uploadBytes(imageRef, props.img)
      .then(() => {
        getDownloadURL(
          ref(storage, `users/${auth.currentUser.uid}/posts/${idGenerated}.jpg`)
        ).then(async (url) => {
          console.log(url);
          await setDoc(
            doc(db, "users", auth.currentUser.uid, "posts", idGenerated),
            {
              userName: auth.currentUser.displayName,
              userId: auth.currentUser.uid,
              profileImg: auth.currentUser.photoURL,
              likes: [],
              imageUrl: url || "",
              description: description || "",
              location: inputPlace || "",
              time: new serverTimestamp(),
              comments: 0,
            }
          ).then(() => {
            alert("imgAdded");
            props.clicked();
          });
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className=" w-[90%] sm:w-[730px] mx-auto bg-white h-[70vh] overflow-hidden rounded-2xl">
      {/* the card header  */}
      <div className="  bg-white p-3 flex justify-between items-center">
        <ArrowBackIcon
          className="cursor-pointer"
          onClick={() => {
            props.lastSetter(false);
          }}
        />
        <h3 className="font-medium text-md cursor-pointer">
          Créer une publication
        </h3>
        <h3
          className="font-medium text-md cursor-pointer text-blue-500"
          onClick={uploadImg}
        >
          Partager
        </h3>
      </div>
      <div className="flex gap-2 h-[65vh] overflow-hidden ">
        <div className="h-[65vh] w-[50%] sm:w-[470px]">
          <img src={imgg} alt="" className="h-full mx-auto " />
        </div>
        {/* the card main section  */}
        <div className="w-1/2 border-l border-l-black border-opacity-10 overflow-y-scroll ">
          {/* div that display profile  */}
          <div className="flex justify-start items-center gap-2  pt-4 px-3">
            <img
              src={require("../../assets/signupAssets/pic2.png")}
              alt=""
              className="h-10 w-10 rounded-3xl "
            />
            <h3 className="text-[15px] font-medium text-global cursor-pointer">
              {auth.currentUser.displayName}
            </h3>
          </div>
          {/* div that display the input
           */}
          <div className="mt-4 relative  px-3">
            <textarea
              disabled={description.length == 2200}
              cols="37"
              rows="8"
              placeholder="Ajouter une legende..."
              className="outline-none border-none text-global font-sans placeholder:text-md placeholder:text-global"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <span className="absolute right-0 bottom-0 text-global font-normal">
              {description.length}/2,200
            </span>
          </div>
          {/* div that display the settings  */}
          <div>
            <div className="px-2 h-11  border-t border-t-black border-opacity-20">
              <input
                type="text"
                placeholder="Ajoutez un lieu"
                className="h-full w-full outline-none text-md text-global "
                onChange={(e) => {
                  setInputPlace(e.target.value);
                }}
              />
            </div>
            <div className="px-2 h-11  border-t border-t-black border-opacity-20 flex items-center">
              <h3 className=" text-[16px] ">Accessibilite</h3>
            </div>
            <div className="px-2 h-11  border-t border-t-black border-opacity-20 flex items-center">
              <h3 className=" text-[16px] ">Parametre Avance</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionSection;
