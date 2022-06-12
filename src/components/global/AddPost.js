import React, { useEffect, useState } from "react";
import { BackDrop } from "./MenuModal";
import ReactDOM from "react-dom";
import { ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../Firebase/Firebase";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";
import AddingImg from "./AddingImg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionSection from "./DescriptionSection";

// show img section
const ShowImg = (props) => {
  const [imgg, setImgg] = useState();
  //   in this useEffect i convert file fake path to file
  useEffect(() => {
    var fReader = new FileReader();
    fReader.onload = function (event) {
      setImgg(fReader.result);

      // img.src = event.target.result;
    };
    fReader.readAsDataURL(props.img);
  }, []);
  console.log(imgg);
  return (
    <div className="w-[70%] sm:w-[420px] bg-white">
      <div className="p-3 flex justify-between items-center">
        <ArrowBackIcon
          className="cursor-pointer"
          onClick={() => {
            props.imageSetter(null);
          }}
        />
        <h3 className="font-medium text-md cursor-pointer">Rogner</h3>
        <h3
          className="font-medium text-md cursor-pointer text-blue-500"
          onClick={() => {
            props.lastSetter(true);
          }}
        >
          Suivant
        </h3>
      </div>
      <div className="w-full h-[60vh] ">
        {imgg && (
          <img
            className="h-full w-4/5 object-cover mx-auto"
            src={imgg}
            alt="img entered"
          />
        )}
      </div>
    </div>
  );
};

// add img section
const AddImg = () => {
  const [img, setImg] = useState();
  const [last, setLast] = useState(false);
  const user = useSelector(userDetail);
  //   console.log(user.uid);
  const imageSetter = (value) => {
    setImg(value);
  };
  const lastSetter = (value) => {
    setLast(value);
  };
  return (
    <div
      className=" fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]  rounded-md "
      style={{ zIndex: 200 }}
    >
      {!img ? (
        <AddingImg imageSetter={imageSetter} />
      ) : !last ? (
        <ShowImg img={img} imageSetter={imageSetter} lastSetter={lastSetter} />
      ) : (
        <DescriptionSection img={img} />
      )}
    </div>
  );
};

function AddPost(props) {
  console.log(props.open, props.clicked);

  if (!props.open) {
    document.body.style.overflowY = "scroll";
  } else {
    document.body.style.overflowY = "hidden";
    return (
      <div>
        {ReactDOM.createPortal(
          <BackDrop clicked={props.clicked} open={props.open} back />,
          document.getElementById("backdrop")
        )}
        {ReactDOM.createPortal(
          <AddImg />,
          document.getElementById("Othermodals")
        )}
      </div>
    );
  }
}

export default AddPost;
