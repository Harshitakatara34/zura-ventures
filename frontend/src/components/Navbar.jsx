import React, { useState } from "react";
import notification from "../assets/notifications.svg";
import logo from "../assets/directright.svg";
import logoText from "../assets/LAMA..svg";
import settingsIcon from "../assets/settingsIcon.svg";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <>
      <div className="flex justify-between items-center px-20 py-4">
        <Link to="/">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-8 h-8 mr-2" />
            <img src={logoText} alt="logo-text" className="h-5" />
          </div>
        </Link>

        <div className="flex items-center">
          <img
            src={settingsIcon}
            alt="settings-icon"
            className="w-6 h-6 mr-6"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          <img
            src={notification}
            alt="notification-icon"
            className="w-6 h-6 mr-5"
          />
        </div>
      </div>
      <hr />

      {showDropdown && (
        <div className="absolute right-24 w-20 bg-purple-700 border rounded-lg shadow-lg">
          <button
            className="block w-full font-semibold text-center px-4 py-1  pb-2 text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
