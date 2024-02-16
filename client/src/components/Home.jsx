import React, { useState } from "react";
import Contacts from "./Contacts";
import Chat from "./Chat";
import Searchbox from "./Searchbox";
import Header from "./Header";
import useGetContacts from "../hooks/useGetContacts";

const Home = () => {
  const [selected, setSelected] = useState(null);
  const { loading, contacts, setContacts } = useGetContacts();
  return (
    <div className="w-full sm:w-[85vw] bg-base-300 h-[95vh] p-4 rounded-lg flex items-center">
      <div className="w-2/5 h-full flex flex-col">
        <Header setContacts={setContacts} setSelected={setSelected} />
        <Searchbox />
        <Contacts
          selected={selected}
          setSelected={setSelected}
          contacts={contacts}
          setContacts={setContacts}
          loading={loading}
        />
      </div>
      <Chat
        selected={selected}
        setSelected={setSelected}
        setContacts={setContacts}
      />
    </div>
  );
};

export default Home;
