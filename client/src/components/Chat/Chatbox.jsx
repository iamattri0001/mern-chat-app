import { useGetMessages } from "../../hooks/useGetMessages";
import ChatContainer from "./ChatContainer";
import ChatSender from "./ChatSender";

import { motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import useListenMessages from "../../hooks/useListenMessages";

const Chatbox = ({ selected, setContacts, setSelected }) => {
  const { messages, setMessages, loading, loadMore } = useGetMessages({
    id: selected?._id.toString(),
  });

  useListenMessages({
    setMessages,
    messages,
    selected,
    setContacts,
    setSelected,
  });

  return (
    <motion.div
      key={selected?._id} // Add a key prop dependent on 'selected' to trigger animation on change
      className="h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ChatHeader
        selected={selected}
        setMessages={setMessages}
        setContacts={setContacts}
        setSelected={setSelected}
      />
      <ChatContainer
        messages={messages}
        setMessages={setMessages}
        loading={loading}
        selected={selected}
        loadMore={loadMore}
      />
      <ChatSender
        selected={selected}
        setMessages={setMessages}
        setContacts={setContacts}
      />
    </motion.div>
  );
};

export default Chatbox;
