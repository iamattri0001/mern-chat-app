import React from "react";
import { IoSparklesOutline } from "react-icons/io5";
import AddContact from "./AddContact";
import { Logout } from "./Logout";

const Header = ({ setSelected, setContacts }) => {
  return (
    <div className="flex p-4 items-center justify-between">
      <div className="flex items-center gap-x-1">
        <IoSparklesOutline className="text-accent text-xl" />
        <h1 className="text-2xl text-transparent bg-gradient-to-br from-accent to-primary bg-clip-text font-bold text-center">
          MERN Chat
        </h1>
      </div>

      <div className="flex items-center justify-center gap-x-6 text-xl">
        <Logout />
        <AddContact setContacts={setContacts} setSelected={setSelected} />
      </div>
    </div>
  );
};

export default Header;
