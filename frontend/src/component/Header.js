import React, { useState } from "react";
import logo from "../image/Logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { HiShoppingCart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user)
  // console.log(userData.email)
  const dispatch = useDispatch()

  const handleShowMenu = () =>{
    setShowMenu(preve => !preve)
  }

  const handleLogout = () =>{
    dispatch(logoutRedux())
    toast("Logout Successful")
  }

  const cartItemNumber = useSelector((state) => state.product.cartItem)

  // console.log(process.env.REACT_APP_ADMIN_EMAIL)

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-15">
            <img src={logo} alt='QuickPick' className="h-20 " />
          </div>
        </Link>

        <div className="flex item-center gap-4 md:gap-7">
          <nav className="flex gap-4 md:gap-7 text-base md:text-lg md:flex hidden">
            <Link to={""}>Home</Link>
            <Link to={"menu/64bbdc60e221178febdc3435"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="relative text-2xl text-slate-600">
            <Link to={"cart"} >
            <HiShoppingCart />
            <div className="absolute -top-2 -right-2 text-white bg-green-500 h-5 w-3 rounded-full m-0 p-0 text-sm text-center ">
              {cartItemNumber.length}
            </div>
            </Link>
          </div>
          <div className="text-slate-600 cursor-pointer" onClick={handleShowMenu}>
            <div className="text-2xl w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? <img src={userData.image} alt='User' className="h-full w-full"/> : <HiOutlineUserCircle />}              
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {
                  userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={'newproduct'} className="whitespace-nowrap cursor-pointer px-2">New Product</Link>
                }
                {
                  userData.image ? <p className="cursor-pointer text-white px-2 bg-green-500" onClick={handleLogout}>Logout ({userData.firstName}) </p> : <Link to={'login'} className="whitespace-nowrap cursor-pointer text-white px-2 bg-green-500">Login</Link>
                } 
                <nav className="flex text-base md:text-lg flex-col md:hidden">
                  <Link to={""} className="px-2 py-1 ">Home</Link>
                  <Link to={"menu/64bbdc60e221178febdc3435"} className="px-2 py-1 ">Menu</Link>
                  <Link to={"about"} className="px-2 py-1 ">About</Link>
                  <Link to={"contact"} className="px-2 py-1 ">Contact</Link>
              </nav>               
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
