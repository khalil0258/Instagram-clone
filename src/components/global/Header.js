import React, { useState } from "react";
import { HeaderContainer } from "./ContainerSignup";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ProfileIcon from "./ProfileIcon";
import AddPost from "./AddPost";
import { Link } from "react-router-dom";
import Search from "./Search";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

function Header() {
  const [img, setImg] = useState(true);
  const [showImgAdder, setshowImgAdder] = useState(false);
  const [search, setSearch] = useState(false);
  const [inpute, setInpute] = useState("");
  const [users, setUsers] = useState();

  const clicked = () => {
    setshowImgAdder(false);
  };
  const SearchShowe = () => {
    setSearch(false);
  };

  const fetchSearched = async () => {
    const q = query(collection(db, "users"), where("userName", ">=", inpute));
    let users = [];
    const data = await getDocs(q);
    // console.log(data);
    data.forEach((res) => {
      users.push(res.data());
    });
    return users;
  };

  return (
    <nav
      className="bg-white py-1 px-[20px] border border-b-[2px] border-slate-200 fixed top-0 left-0 right-0 "
      style={{ zIndex: 1200 }}
    >
      {/* header container that making him in the middle */}
      <HeaderContainer>
        <div className="flex items-center justify-between relative ">
          {/* logo section  */}
          <div className="flex-grow">
            <img
              className="h-8"
              src={require("../../assets/logo.png")}
              alt=""
            />
          </div>
          {/* input section  */}
          <div className="hidden md:flex bg-[#efefef] py-2 px-3 w-64 rounded-md items-center flex-shrink">
            {img && (
              <img
                src={require("../../assets/icons/searchIcon.png")}
                alt=""
                className="h-5 mr-2"
              />
            )}
            <input
              type="text"
              className="bg-transparent placeholder:font-light outline-none text-sm font-light "
              onFocus={() => {
                setSearch(true);
                setImg(false);
              }}
              onBlur={() => {
                // setSearch(false);
                setImg(true);
              }}
              onChange={(e) => {
                setSearch(true);
                setInpute(e.target.value);
                fetchSearched().then((res) => {
                  // console.log(res);
                  setUsers([...res]);
                });
              }}
              placeholder="Rechercher"
            />
          </div>
          {/* navigation icons section  */}
          <div id="navIcons" className="flex items-center ml-20">
            <div className="mr-6 cursor-pointer">
              <Link to="/feed">
                <HomeIcon sx={{ height: "27px", width: "27px" }} />
              </Link>
            </div>

            <Link to="/direct/inbox">
              <div className="mr-6 cursor-pointer relative ">
                <img
                  src={require("../../assets/icons/messengerIcon.png")}
                  alt="messenger"
                  className="transform scale-50"
                />
                <span className="spanIcon">1</span>
              </div>
            </Link>
            <div
              className="mr-6 cursor-pointer"
              onClick={() => {
                setshowImgAdder(true);
              }}
            >
              <AddBoxOutlinedIcon sx={{ height: "27px", width: "27px" }} />
            </div>
            <div className="mr-6 cursor-pointer">
              <ExploreOutlinedIcon sx={{ height: "27px", width: "27px" }} />
            </div>
            <div className="mr-6 cursor-pointer">
              <FavoriteBorderOutlinedIcon
                sx={{ height: "27px", width: "27px" }}
              />
            </div>
            <div>
              <ProfileIcon />
            </div>
          </div>
        </div>
        <AddPost clicked={clicked} open={showImgAdder} />
        <Search clicked={SearchShowe} open={search} users={users} />
      </HeaderContainer>
    </nav>
  );
}

export default Header;
