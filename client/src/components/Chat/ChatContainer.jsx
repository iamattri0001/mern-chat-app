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
    <div className="flex-grow flex justify-start gap-y-3 px-6 py-5 flex-col-reverse overflow-y-scroll overflow-x-hidden">
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
  return (
    <div className={`chat chat-${dir}`}>
      <div className={`chat-bubble w-1/3 skeleton bg-neutral chat-start`}></div>
    </div>
  );
};
