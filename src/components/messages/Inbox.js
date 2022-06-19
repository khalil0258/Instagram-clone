import React from "react";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";

function Inbox() {
  return (
    <div className="w-[565px]  text-right flex items-center">
      <div className="w-[8=90%] mx-auto text-center ">
          {/* the icon must be changed  */}
        <ExploreOutlinedIcon sx={{ height: "110px", width: "110px" }} />
        <h2 className="font-light text-2xl mt-4">Vos messages</h2>
        <p className="text-global text-sm my-4 ">
          Envoyez des photos et des messages privés à un(e) ami(e) ou à un
          groupe.
        </p>
        <button className="bg-blue-400  text-sm hover:bg-blue-500   text-centre text-white font-medium h-8  px-3 rounded-lg cursor-pointer">
          Envoyer un message
        </button>
      </div>
    </div>
  );
}

export default Inbox;
