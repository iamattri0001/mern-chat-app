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
    <div className="w-full sm:w-[80vw] bg-base-300 h-[90vh] px-2 py-2 rounded flex items-center">
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
