import { useAuth } from "../../contexts/AuthContext";
import { IoReloadOutline } from "react-icons/io5";

import ChatBubble from "./ChatBubble";

const ChatContainer = ({
  messages,
  setMessages,
  loading,
  selected,
  loadMore,
}) => {
  const { authUser } = useAuth();
  return (
    <div className="flex-grow chat-container flex justify-start gap-y-3 px-6 py-5 flex-col-reverse overflow-y-auto overflow-x-hidden">
      {!loading &&
        messages.map((msg, i) => (
          <ChatBubble
            msg={msg}
            key={i}
            selected={selected}
            authUser={authUser}
            setMessages={setMessages}
          />
        ))}
      {!loading && messages.length == 0 && (
        <div className="w-full h-full flex items-center justify-center">
          No messages here.
        </div>
      )}
      {loading && (
        <>
          <ChatBubbleSkeleton dir={"end"} />
          <ChatBubbleSkeleton dir={"start"} />
          <ChatBubbleSkeleton dir={"end"} />
          <ChatBubbleSkeleton dir={"end"} />
          <ChatBubbleSkeleton dir={"start"} />
          <ChatBubbleSkeleton dir={"end"} />
          <ChatBubbleSkeleton dir={"start"} />
        </>
      )}
      {messages?.length >= 20 && (
        <div
          className="flex items-center justify-center text-accent hover:text-secondary transition-all cursor-pointer gap-x-2"
          onClick={() => loadMore(selected._id.toString())}
        >
          <span>Load older messages</span>
          <IoReloadOutline className="text-xl" />
        </div>
      )}
    </div>
  );
};
export default ChatContainer;

const ChatBubbleSkeleton = ({ dir }) => {
  const randomWidths = ["w-1/2", "w-1/3", "w-2/5", "w-3/4"];
  return (
    <div className={`chat chat-${dir}`}>
      <div
        className={`chat-bubble ${
          randomWidths[Math.floor(Math.random() * randomWidths.length)]
        } skeleton bg-neutral chat-start`}
      ></div>
    </div>
  );
};
