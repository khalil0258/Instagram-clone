import React from "react";
import addImg from "../../assets/icons/addImg.svg";

function AddingImg({ imageSetter }) {
  return (
    <div>
      <div className="text-center py-2 border-b border-b-black border-opacity-25 ">
        <h4 className="font-medium ">Créer une nouvelle publication</h4>
      </div>
      <div className=" pt-6 pb-2 flex flex-col items-center ">
        <img src={addImg} alt="imgIcon" className="h-32 mb-4 w-32" />
        <h2 className="font-thin text-2xl text-center ">
          Faites glisser les photos et les vidéos ici
        </h2>
      </div>
      <div className="pt-8 pb-24 flex justify-center  ">
        <button className="relative  bg-blue-500 py-1 px-2 rounded-md text-white texts-md font-medium  cursor-pointer ">
          Selectionner sur l ordinateur
          <input
            className="absolute top-0 left-0 opacity-0 w-full cursor-pointer"
            type="file"
            accept="video/*,image/*"
            id="fileAdder"
            onInput={(e) => {
              imageSetter(e.target.files[0]);
              console.log(e.target.files.fullName);

              //   if (img == null) return alert("error");

              //     const imageRef = ref(
              //       storage,
              //       `users/${user.uid}/posts/${img.name}`
              //     );
              //     uploadBytes(imageRef, img).then(() => {
              //       alert("image added");
              //     });
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default AddingImg;
