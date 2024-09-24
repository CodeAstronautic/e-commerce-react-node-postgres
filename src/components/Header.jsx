import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import SocketNotifications from "./SocketNotifications";
import { useSelector } from "react-redux";
import ProfileDropdown from "./Profile/ProfileDropdown";
import closeIcon from "../asset/img/svg/close.svg";
import menuIcon from "../asset/img/svg/menu.svg";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const cart = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const pageList = [
    { id: 0, link: "/", label: "Home", show: true },
    {
      id: 1,
      link: "/track-order",
      label: "Track Order",
      show: !!localStorage.getItem("token"),
    },
  ];

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <Link to="/">LOGO</Link>

        {localStorage.getItem("token") && (
          <div
            id="collapseMenu"
            className={`${
              openSidebar ? "" : "max-lg:hidden lg:!block"
            } max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}
          >
            <button
              onClick={() => setOpenSidebar(!openSidebar)}
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            >
             <img src={closeIcon} alt="close icon" width={"15px"}/>
            </button>

            <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              <li className="mb-6 hidden max-lg:block">
                LOGO
              </li>
              {pageList
                .filter((item) => item.show)
                .map((item) => (
                  <li
                    key={item.id}
                    className="max-lg:border-b border-gray-300 max-lg:py-3 px-3"
                  >
                    <Link
                      to={item.link}
                      className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div className="flex max-lg:ml-auto space-x-3">
          {localStorage.getItem("token") &&
            localStorage.getItem("userInfo") && <SocketNotifications />}
          <Link
            to="/cart"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-[#007bff] rounded-full hover:bg-[#007bff]"
          >
            <FaShoppingCart />
            <span className="sr-only">Shopping</span>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {totalQuantity}
            </div>
          </Link>

          {!localStorage.getItem("token") && (
            <Link
              to="/login"
              className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {localStorage.getItem("token") && localStorage.getItem("userInfo") && (
        <ProfileDropdown />
      )}
      {localStorage.getItem("token") && (
        <button
          className="lg:hidden"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <img src={menuIcon} alt="menu" width={"30px"}/>
        </button>
      )}
    </header>
  );
};

export default Header;
