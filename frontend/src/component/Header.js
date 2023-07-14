import React, { useState } from "react";
import logo from "../image/Logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { HiShoppingCart } from "react-icons/hi";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () =>{
    setShowMenu(preve => !preve)
  }

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-15">
            <img src={logo} className="h-20 " />
          </div>
        </Link>

        <div className="flex item-center gap-4 md:gap-7">
          <nav className="flex gap-4 md:gap-7 text-base md:text-lg">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600">
            <HiShoppingCart />
            <div className="absolute top-2 right-14 text-white bg-green-500 h-5 w-3 rounded-full m-0 p-0 text-sm text-center ">
              0
            </div>
          </div>
          <div className="text-slate-600 cursor-pointer" onClick={handleShowMenu}>
            <div className="text-2xl">
              <HiOutlineUserCircle />
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                <Link to={'newproduct'} className="whitespace-nowrap cursor-pointer">New Product</Link>
                <Link to={'login'} className="whitespace-nowrap cursor-pointer">Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
