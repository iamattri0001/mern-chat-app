import React from "react";
import { useAuth } from "../contexts/AuthContext";

import { GrSend } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import Chatbox from "./Chatbox";

const Chat = ({ selected, setSelected }) => {
  const { authUser } = useAuth();
  return (
    <div className="h-full w-full ml-3">
      {!selected && <Welcome authUser={authUser} />}
      {selected && <Chatbox selected={selected} />}
    </div>
  );
};

export default Chat;

const Welcome = ({ authUser }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-y-2">
      <div className="flex items-center justify-center gap-x-1">
        <h3 className="text-3xl">
          Welcome,{" "}
          <span className="text-accent font-semibold text-4xl">
            {authUser.fullName}
          </span>
        </h3>
        <img src="/logo.gif" className="h-16" />
      </div>
      <p className="text-white/40 text-sm">
        Click on a contact to start chatting
      </p>
      <div className="mt-4 flex gap-x-5 items-center justify-center">
        <button className="flex items-center justify-center gap-x-1 bg-primary hover:bg-primary/80 transition-all text-base-100 font-semibold px-4 py-2 rounded-full">
          <span>Invite</span> <GrSend className="text-xl" />
        </button>
        <a href="https://github.com/iamattri0001/mern-chat-app" target="_blank">
          <button className="flex items-center justify-center gap-x-1 bg-secondary hover:bg-secondary/80 transition-all text-base-100 font-semibold px-4 py-2 rounded-full">
            <span>Github</span> <FaGithub className="text-xl" />
          </button>
        </a>
      </div>
    </div>
  );
};
