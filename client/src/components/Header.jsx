import React from "react";
import { FaPowerOff } from "react-icons/fa6";
import { IoSparklesOutline } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";

const Header = () => {
  return (
    <div className="flex p-4 items-center justify-between">
      <div className="flex items-center gap-x-1">
        <IoSparklesOutline className="text-accent text-xl" />
        <h1 className="text-2xl text-transparent bg-gradient-to-br from-accent to-primary bg-clip-text font-bold text-center">
          MERN Chat
        </h1>
      </div>

      <div className="flex items-center justify-center gap-x-6 text-xl">
        <FaPowerOff className="text-xl transition-all cursor-pointer hover:text-primary" />
        <IoMdPersonAdd className="text-2xl transition-all cursor-pointer hover:text-primary" />
      </div>
    </div>
  );
};

export default Header;
