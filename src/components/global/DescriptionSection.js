import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function DescriptionSection(props) {
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
  return (
    <div className=" w-[90%] sm:w-[712px] mx-auto bg-white h-[75vh] overflow-hidden rounded-2xl">
      <div className="  bg-white p-3 flex justify-between items-center">
        <ArrowBackIcon className="cursor-pointer" onClick={() => {}} />
        <h3 className="font-medium text-md cursor-pointer">
          Créer une publication
        </h3>
        <h3
          className="font-medium text-md cursor-pointer text-blue-500"
          onClick={() => {}}
        >
          Partager
        </h3>
      </div>
      <div className="flex gap-2 h-[70vh] overflow-hidden ">
        <div className="h-[70vh] w-[50%] sm:w-[512px]">
          <img src={imgg} alt="" className="h-full  " />
        </div>
        <div className="w-1/2 border-l border-l-black border-opacity-10"></div>
      </div>
    </div>
  );
}

export default DescriptionSection;
