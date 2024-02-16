import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "@emoji-mart/react";
import emojiPickerData from "@emoji-mart/data";
import { MdEmojiEmotions } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import toast from "react-hot-toast";

const ChatSender = ({ selected, setMessages, setContacts }) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [textContent, setTextContent] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));

    const emoji = String.fromCodePoint(...codeArray);
    setTextContent(textContent + emoji);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/message/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverId: selected._id,
          content: textContent,
          contentType: "text",
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setTextContent("");

      setMessages((prevState) => {
        return [data.message, ...prevState];
      });
      setContacts((prevState) => {
        const newState = prevState.filter(
          (e) => e._id.toString() !== selected._id.toString()
        );
        return [selected, ...newState];
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-secondary/30 h-16 max-h-36 flex items-center justify-center gap-x-3 px-5 py-3 relative rounded-lg">
      <button onClick={() => setPickerOpen(!pickerOpen)}>
        {pickerOpen && <IoClose className="text-2xl text-secondary" />}
        {!pickerOpen && <MdEmojiEmotions className="text-2xl text-primary" />}
      </button>

      <div
        className={`${
          pickerOpen ? `block` : `hidden`
        } absolute left-0 -top-[444px]`}
      >
        <EmojiPicker
          rows={5}
          emojiSize={20}
          className={"w-10"}
          data={emojiPickerData}
          onEmojiSelect={addEmoji}
          onClickOutside={() => (pickerOpen ? setPickerOpen(false) : {})}
        />
      </div>

      <form
        className="w-full flex items-center justify-center gap-x-3"
        onSubmit={handleSend}
      >
        <input
          ref={inputRef}
          value={textContent}
          autoComplete="off"
          onChange={(e) => setTextContent(e.target.value)}
          id="text-message"
          className="py-2 px-2 w-full transition-all bg-transparent ring-1 ring-gray-400 outline-none focus:ring-accent rounded-lg resize-none h-10 text-left"
        />
        <button className="text-2xl text-primary hover:text-accent transition-all">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatSender;
