import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";


const ChatBubble = ({ msg, selected, authUser, setMessages }) => {
  const [hovered, setHovered] = useState(false);

  const messageOwner = msg.senderId === authUser._id.toString();
  const edited = msg.createdAt !== msg.updatedAt;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`chat font-semibold  relative ${
        messageOwner ? `chat-end` : `chat-start`
      }`}
    >
      {hovered && (
        <span className="text-gray-400 absolute bottom-[-16px] text-xs">
          {getTimeStamp(msg.createdAt)}
        </span>
      )}

      <div className="chat-image avatar">
        <div className="w-8 h-8 rounded-full">
          <img
            alt="Avatar"
            src={messageOwner ? authUser.profilePic : selected.profilePic}
          />
        </div>
      </div>
      <div
        className={`relative chat-bubble max-w-[70%] font-light ${
          messageOwner
            ? `chat-bubble bg-secondary/60 text-gray-50`
            : `chat-bubble`
        }`}
      >
        {edited && (
          <div
            className={`badge badge-warning p-1 bottom-[-12px] text-xs font-semibold absolute ${
              messageOwner ? `left-1` : `right-1`
            }`}
          >
            Edited
          </div>
        )}
        <span>{msg.content}</span>
        {messageOwner && hovered && (
          <div className="absolute left-[-78px] top-2 flex items-center justify-center gap-x-3">
            <DeleteMessage msg={msg} setMessages={setMessages} />
            <EditMessage msg={msg} setMessages={setMessages} />
          </div>
        )}
      </div>
    </div>
  );
};

const EditMessage = ({ msg, setMessages }) => {
  const [textContent, setTextContent] = useState(msg.content);
  const handleEdit = async () => {
    try {
      const res = await fetch("/api/message/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg._id.toString(), content: textContent }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prevState) => {
        const newState = [...prevState];
        for (let i = 0; i < newState.length; i++) {
          if (newState[i]._id.toString() === data._id.toString()) {
            newState[i] = data;
            break;
          }
        }
        return newState;
      });
      toast.success("Message edited");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center relative">
      <button
        className=""
        onClick={() => document.getElementById("edit-message").showModal()}
      >
        <FaEdit className="text-success hover:text-success/80 transition-all text-2xl cursor-pointer" />
      </button>
      <dialog id="edit-message" className="modal">
        <div className="modal-box w-[26rem] max-w-5xl">
          <h3 className="font-semibold text ml-2 mb-4 text-primary">
            Edit the message
          </h3>
          <div className="flex items-center justify-center gap-x-4">
            <input
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? handleEdit() : {})}
              className="w-3/4 text-base bg-transparent ring-1 ring-gray-600 focus:ring-primary rounded-md py-2 text-gray-200 px-3 outline-none"
              placeholder="Edit the text here.."
            />
            <button
              className="bg-primary text-base-100 text-base px-4 py-2 rounded-md font-semibold"
              onClick={handleEdit}
            >
              Confirm
            </button>
          </div>
          <div className="modal-action absolute top-[-22px] right-1">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="p-2 bg-secondary/10 hover:bg-secondary/30 rounded-full text-xl">
                <IoClose />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

const DeleteMessage = ({ msg, setMessages }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch("/api/message/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg._id.toString() }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prevState) => {
        const newState = prevState.filter(
          (el) => el._id.toString() !== msg._id.toString()
        );
        return newState;
      });

      toast.success("Message deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={`flex items-center justify-center relative`}>
      <button
        className=""
        onClick={() => document.getElementById("delte-message").showModal()}
      >
        <MdDeleteOutline className="text-3xl text-error hover:text-error/80 transition-all cursor-pointer" />
      </button>
      <dialog id="delte-message" className={`modal`}>
        <div className={`modal-box w-[26rem] max-w-5xl `}>
          <h3 className="font-semibold text mb-4 text-white">
            Do you want to delete this message?
          </h3>
          <div className="flex items-center justify-center gap-x-10">
            <button
              className={`bg-error hover:bg-error/80 transition-all text-base-100 text-base px-4 py-1.5 rounded-md font-semibold`}
              onClick={handleDelete}
            >
              Delete
            </button>
            <form method="dialog" className="">
              {/* if there is a button, it will close the modal */}
              <button className="bg-neutral text-base px-4 py-2 rounded-md font-semibold text-white">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

const getTimeStamp = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();

  let stamp = "";

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    // If the timestamp is from today
    stamp = `${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;
  } else if (today.getDate() - date.getDate() === 1) {
    // If the timestamp is from yesterday
    stamp = `Yesterday ${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;
  } else {
    // For other dates
    stamp = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;
  }

  return stamp;
};

export default ChatBubble;
