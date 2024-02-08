import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Contacts = ({ selected, setSelected }) => {
  const contacts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex flex-col gap-y-2 h-[85%] overflow-y-scroll">
      {contacts.map((user, i) => (
        <Contact
          key={i}
          userId={user}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </div>
  );
};

export default Contacts;

const Contact = ({
  fullname,
  userId,
  username,
  profilePic,
  selected,
  setSelected,
}) => {
  const handleCopy = () => {
    try {
      window.navigator.clipboard.writeText(username);
      toast.success("Copied to Clipboard");
    } catch (error) {
      toast.error("Couldn't copy text");
      console.error(error.message);
    }
  };

  return (
    <div
      onClick={() => {
        setSelected(userId);
        console.log(userId);
      }}
      className={`flex items-center gap-x-5 py-4 px-6 rounded-md cursor-pointer ${
        selected === userId ? `bg-gradient-to-tr from-secondary to-accent text-black` : `hover:bg-primary/40 bg-neutral`
      }`}
    >
      <div>
        <img
          className="h-10"
          src={
            profilePic ? profilePic : "https://avatar.iran.liara.run/public/boy"
          }
        />
      </div>
      <div>
        <h4 className="font-semibold">{fullname ? fullname : "Deepanshu Attri"}</h4>
        <span className={`text-sm font-bold ${selected === userId ? `text-black/50 hover:text-black` : `text-gray-400 hover:text-accent`}`} onClick={handleCopy}>
          @{username ? username : "iamattri0001"}
        </span>
      </div>
    </div>
  );
};