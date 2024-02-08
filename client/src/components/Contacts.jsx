import React from "react";
import { toast } from "react-hot-toast";

const Contacts = () => {
  return (
    <div className="flex flex-col gap-y-2 h-[85%] overflow-y-scroll">
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
    </div>
  );
};

export default Contacts;

const Contact = ({ fullname, userId, username, profilePic }) => {
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
    <div className="flex items-center gap-x-5 py-4 px-6 rounded-md bg-neutral hover:bg-primary/40 cursor-pointer">
      <div>
        <img
          className="h-10"
          src={
            profilePic ? profilePic : "https://avatar.iran.liara.run/public/boy"
          }
        />
      </div>
      <div>
        <h4>{fullname ? fullname : "Deepanshu Attri"}</h4>
        <span className="text-gray-400 hover:text-accent" onClick={handleCopy}>
          @{username ? username : "iamattri0001"}
        </span>
      </div>
    </div>
  );
};
