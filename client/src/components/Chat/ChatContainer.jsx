import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import ChatBubble from "./ChatBubble";

const ChatContainer = ({ messages, setMessages, loading, selected }) => {
  const { authUser } = useAuth();
  return (
    <div className="flex-grow flex justify-start gap-y-3 px-2 py-3 flex-col-reverse overflow-y-scroll">
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
