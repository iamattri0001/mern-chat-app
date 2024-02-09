import toast from "react-hot-toast";
import { useGetMessages } from "../hooks/useGetMessages";
import ChatContainer from "./Chat/ChatContainer";
import ChatSender from "./Chat/ChatSender";
const Chatbox = ({ selected }) => {
  if (!selected) return;

  const { messages, setMessages, loading } = useGetMessages({
    id: selected._id.toString(),
  });

  return (
    <div className="h-full flex flex-col">
      <ChatHeader selected={selected} />
      <ChatContainer
        messages={messages}
        setMessages={setMessages}
        loading={loading}
        selected={selected}
      />
      <ChatSender selected={selected} setMessages={setMessages} />
    </div>
  );
};
export default Chatbox;

const ChatHeader = ({ selected }) => {
  const handleCopy = () => {
    try {
      window.navigator.clipboard.writeText(selected.username);
      toast.success("Copied to Clipboard");
    } catch (error) {
      toast.error("Couldn't copy text");
      console.error(error.message);
    }
  };
  return (
    <div className="bg-secondary/30 p-3 rounded-md flex items-center justify-between">
      <div className="flex items-center justify-center gap-x-4">
        <img
          src={selected.profilePic}
          alt="profilePic"
          className="h-12 ring-4 rounded-full ring-secondary"
        />
        <div className="flex flex-col gap-y-0">
          <h3 className="text-lg text-primary">{selected.fullName}</h3>
          <h5
            className="text-accent cursor-pointer hover:text-accent/80 transition-all"
            title="Click to copy"
            onClick={handleCopy}
          >
            @{selected.username}
          </h5>
        </div>
      </div>
    </div>
  );
};

