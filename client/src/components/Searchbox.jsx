import React from "react";

const Searchbox = () => {
  return (
    <div className="h-[8%] p-1 mb-2">
      <input
        className="w-full h-full bg-transparent ring-1 ring-gray-600 focus:ring-accent rounded-xl py-2 text-gray-400 px-3 outline-none"
        placeholder="Search contacts"
      />
    </div>
  );
};

export default Searchbox;
