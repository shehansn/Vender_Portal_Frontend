import React from "react";
import { Link } from "react-router-dom";
import { ArrowSVG } from "../assets/index";
const Header = () => {

  return (
    <header className="fixed w-full h-16 px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-end">
        <div className="flex items-center gap-4 md:gap-7 mt-2 mr-2">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex font-bold">
            <Link to={""} className=" flex flex-row"><p >Admin</p>  <img src={ArrowSVG} className="w-4 h-4 mt-2 ml-2 rotate-90" />
            </Link>

          </nav>
          <div className="w-10 h-10 rounded-full bg-blue-700 shadow-md cursor-pointer overflow-hidden flex items-center justify-center">

          </div>
          <div className="w-3 h-3 rounded-full bg-green-500 relative bottom-0 border-2 border-white mt-10 -ml-10" />

        </div>
      </div>

    </header>
  );
};

export default Header;
