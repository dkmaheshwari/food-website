import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signIn, signOut } from "../Utils/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const locDetails = useSelector((store) => store.location.locationDetails);
  const cartItemCount = useSelector((store) => store.cart.cartItems);
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    setActiveLink(path);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const isActive = (path) => {
    return path === activeLink;
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      // Sign out
      dispatch(signOut());
      localStorage.removeItem("user");
      navigate("/signin");
    } else {
      // Navigate to sign in
      navigate("/signin");
    }
  };

  useEffect(() => {
    // If user has address info, use it for location display
    if (isAuthenticated && user && user.address) {
      setArea(user.address);
      setCity(user.city);
      setState(user.state);
    } else if (locDetails[0]) {
      setArea(locDetails[0].area);
      setCity(locDetails[0].district);
      setState(locDetails[0].state);
    }
  }, [locDetails, isAuthenticated, user]);

  // Check for stored user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !isAuthenticated) {
      dispatch(signIn(JSON.parse(storedUser)));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <div className="header flex items-center justify-around z-20 fixed w-screen top-0 left-0 right-0 shadow-lg bg-white border-b border-gray-200">
        <div className="max-w-[25%] flex items-center gap-2">
          <Link to="/">
            <div
              onClick={() => handleNavClick("/")}
              className="pl-4 cursor-pointer"
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                Foodie
              </h1>
            </div>
          </Link>
          <div className="flex justify-center items-center gap-2 truncate self-center text-gray-700">
            <h2
              className="text-lg truncate"
              title={area + ", " + city + ", " + state}
            >
              <span className="text-md mr-1 leading tracking-tight font-bold text-gray-600">
                Delivering to:
              </span>
              {area + ", " + city + ", " + state}
            </h2>
          </div>
        </div>
        <>
          <ul className="list-none flex justify-center items-center text-xl text-gray-700">
            <li
              className="transition duration-250 ease-in-out m-3 flex items-center justify-center text-gray-700 hover:text-blue-600"
              onMouseOver={(e) => {
                e.currentTarget.querySelector("svg").style.fill = "#2563eb";
              }}
              onMouseOut={(e) => {
                e.currentTarget.querySelector("svg").style.fill = "";
              }}
            >
              <NavLink
                onClick={() => handleNavClick("/search")}
                className={`${
                  isActive("/search") ? "text-blue-600" : "text-inherit"
                }`}
                to="/search"
              >
                <span className="flex items-center justify-center truncate">
                  <svg
                    viewBox="5 -1 12 25"
                    className={`w-[17px] h-[17px] ${
                      isActive("/search") ? "fill-blue-600" : "fill-gray-500"
                    }`}
                  >
                    <path d="M17.6671481,17.1391632 L22.7253317,22.1973467 L20.9226784,24 L15.7041226,18.7814442 C14.1158488,19.8024478 12.225761,20.3946935 10.1973467,20.3946935 C4.56550765,20.3946935 0,15.8291858 0,10.1973467 C0,4.56550765 4.56550765,0 10.1973467,0 C15.8291858,0 20.3946935,4.56550765 20.3946935,10.1973467 C20.3946935,12.8789625 19.3595949,15.3188181 17.6671481,17.1391632 Z M10.1973467,17.8453568 C14.4212261,17.8453568 17.8453568,14.4212261 17.8453568,10.1973467 C17.8453568,5.97346742 14.4212261,2.54933669 10.1973467,2.54933669 C5.97346742,2.54933669 2.54933669,5.97346742 2.54933669,10.1973467 C2.54933669,14.4212261 5.97346742,17.8453568 10.1973467,17.8453568 Z"></path>
                  </svg>
                  &nbsp; <h2>Search</h2>
                </span>
              </NavLink>
            </li>
            <li
              className="transition duration-250 ease-in-out m-3 pl-8 flex items-center justify-center text-gray-700 hover:text-blue-600"
              onMouseOver={(e) => {
                e.currentTarget.querySelector("svg").style.fill = "#2563eb";
              }}
              onMouseOut={(e) => {
                e.currentTarget.querySelector("svg").style.fill = "";
              }}
            >
              <NavLink
                onClick={() => handleNavClick("/about")}
                className={`${
                  isActive("/about") ? "text-blue-600" : "text-inherit"
                }`}
                to="/about"
              >
                <span className="flex items-center justify-center truncate">
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-[18px] h-[19px] ${
                      isActive("/about") ? "fill-blue-600" : "fill-gray-500"
                    }`}
                  >
                    <path d="M12,2C6.48,2 2,6.48 2,12s4.48,10 10,10 10,-4.48 10,-10S17.52,2 12,2zM13,17h-2v-6h2v6zM13,9h-2L11,7h2v2z" />
                  </svg>
                  &nbsp; <h2>About Us</h2>
                </span>
              </NavLink>
            </li>
            {isAuthenticated && (
              <li
                className="transition duration-250 ease-in-out m-3 pl-8 flex items-center justify-center text-gray-700 hover:text-red-600 cursor-pointer"
                onMouseOver={(e) => {
                  e.currentTarget.querySelector("svg").style.fill = "#dc2626";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.querySelector("svg").style.fill = "";
                }}
                onClick={handleAuthClick}
              >
                <span className="flex items-center justify-center truncate">
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-[18px] h-[19px] fill-gray-500`}
                  >
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                  </svg>
                  &nbsp; <h2>Sign Out</h2>
                </span>
              </li>
            )}
            <li
              className="transition duration-250 ease-in-out m-3 pl-8 flex items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer"
              onMouseOver={(e) => {
                e.currentTarget.querySelector("svg").style.fill = "#2563eb";
              }}
              onMouseOut={(e) => {
                e.currentTarget.querySelector("svg").style.fill = "";
              }}
              onClick={() => !isAuthenticated && handleAuthClick()}
            >
              {!isAuthenticated && (
                <span className="flex items-center justify-center truncate">
                  <svg
                    viewBox="6 0 12 24"
                    className={`w-[18px] h-[19px] fill-gray-500`}
                  >
                    <path d="M11.9923172,11.2463768 C8.81761115,11.2463768 6.24400341,8.72878961 6.24400341,5.62318841 C6.24400341,2.5175872 8.81761115,0 11.9923172,0 C15.1670232,0 17.740631,2.5175872 17.740631,5.62318841 C17.740631,8.72878961 15.1670232,11.2463768 11.9923172,11.2463768 Z M11.9923172,9.27536232 C14.0542397,9.27536232 15.7257581,7.64022836 15.7257581,5.62318841 C15.7257581,3.60614845 14.0542397,1.97101449 11.9923172,1.97101449 C9.93039471,1.97101449 8.25887628,3.60614845 8.25887628,5.62318841 C8.25887628,7.64022836 9.93039471,9.27536232 11.9923172,9.27536232 Z M24,24 L0,24 L1.21786143,19.7101449 L2.38352552,15.6939891 C2.85911209,14.0398226 4.59284263,12.7536232 6.3530098,12.7536232 L17.6316246,12.7536232 C19.3874139,12.7536232 21.1256928,14.0404157 21.6011089,15.6939891 L22.9903494,20.5259906 C23.0204168,20.63057 23.0450458,20.7352884 23.0641579,20.8398867 L24,24 Z M21.1127477,21.3339312 L21.0851024,21.2122487 C21.0772161,21.1630075 21.0658093,21.1120821 21.0507301,21.0596341 L19.6614896,16.2276325 C19.4305871,15.4245164 18.4851476,14.7246377 17.6316246,14.7246377 L6.3530098,14.7246377 C5.4959645,14.7246377 4.55444948,15.4231177 4.32314478,16.2276325 L2.75521062,21.6811594 L2.65068631,22.0289855 L21.3185825,22.0289855 L21.1127477,21.3339312 Z"></path>
                  </svg>
                  &nbsp; <h2>Sign In</h2>
                </span>
              )}
            </li>
            <li
              className="transition duration-250 ease-in-out m-3 pl-8 flex items-center justify-center text-gray-700 hover:text-blue-600"
              onMouseOver={(e) => {
                e.currentTarget.querySelector("svg").style.fill = "#2563eb";
              }}
              onMouseOut={(e) => {
                e.currentTarget.querySelector("svg").style.fill = "";
              }}
            >
              <NavLink
                onClick={() => handleNavClick("/cart")}
                className={`${
                  isActive("/cart") ? "text-blue-600" : "text-inherit"
                }`}
                to="/cart"
              >
                <span className="flex items-center justify-center truncate">
                  {cartItemCount.length === 0 ? (
                    <>
                      <span className="relative top-1/2 group">
                        <svg
                          className="w-5 h-5 text-gray-500 group-hover:text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
                          />
                        </svg>
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItemCount.length}
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className="relative top-1/2">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        stroke="none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
                      </svg>
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                        {cartItemCount.length}
                      </span>
                    </span>
                  )}
                  &nbsp; <h2>Cart</h2>
                </span>
              </NavLink>
            </li>
          </ul>
        </>
      </div>
    </>
  );
};

export default Header;
