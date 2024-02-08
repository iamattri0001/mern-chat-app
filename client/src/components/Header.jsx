import React from "react";
import { CgOptions } from "react-icons/cg";
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
      <div className="flex items-center justify-center gap-x-3">
        <IoMdPersonAdd className="text-2xl transition-all hover:text-primary cursor-pointer" />
        <CgOptions className="text-2xl transition-all hover:text-primary cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
