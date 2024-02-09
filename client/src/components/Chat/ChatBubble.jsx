import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ChatBubble = ({ msg, selected, authUser, setMessages }) => {
  const messageOwner = msg.senderId === authUser._id.toString();
  const edited = msg.createdAt !== msg.updatedAt;
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`chat font-semibold  ${
        messageOwner ? `chat-end hover:bg-neutral` : `chat-start`
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Avatar"
            src={messageOwner ? authUser.profilePic : selected.profilePic}
          />
        </div>
      </div>
      <div
        className={`relative chat-bubble ${
          messageOwner ? `chat-bubble-primary` : `chat-bubble-secondary`
        }`}
      >
        {edited && (
          <div
            className={`badge badge-warning p-1 bottom-[-12px] text-xs absolute ${
              messageOwner ? `left-0` : `right-0`
            }`}
          >
            Edited
          </div>
        )}
        <span>{msg.content}</span>

        {messageOwner && hovered && (
          <div className="absolute left-[-78px] top-2 flex items-center justify-center gap-x-3">
            <MdDeleteOutline className="text-3xl text-error hover:text-error/80 transition-all cursor-pointer" />
            <FaEdit className="text-success hover:text-success/80 transition-all text-2xl cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatBubble;
