import React from "react";
import { FiUsers, FiSettings } from "react-icons/fi";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

const Header = (): React.JSX.Element => {
  const navigate = useNavigate();
  return (
    <header className="bg-slate-700 text-white lg:px-16 md:px-8 px-4 py-5 mb-4 text-xl shadow-md flex justify-between items-center">
      <span
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IconContext.Provider value={{ size: "1.5em", className: "mr-2" }}>
          <FiUsers />
        </IconContext.Provider>
        Basic Recruiter Tool
      </span>
      <span className="flex items-center">
        <IconContext.Provider value={{ size: "1.5em", className: "mr-4" }}>
          <FiSettings />
        </IconContext.Provider>
        <button className="focus:outline-none"></button>
      </span>
    </header>
  );
};

export default Header;
