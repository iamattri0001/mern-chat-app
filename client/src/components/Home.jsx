import React from "react";
import Contacts from "./Contacts";
import Chat from "./Chat";
import Searchbox from "./Searchbox";
import Header from "./Header";

const Home = () => {
  return (
    <div className="w-full sm:w-[80vw] bg-base-300 h-[90vh] px-2 py-2 rounded flex items-center">
      <div className="w-2/5 h-full flex flex-col">
        <Header />
        <Searchbox />
        <Contacts />
      </div>
      <Chat />
    </div>
  );
};

export default Home;
