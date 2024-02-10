import { useEffect } from "react";
import { useSocket } from "../contexts/SocketContext";

import notifSound from "../assets/notif.mp3";
import toast from "react-hot-toast";

const useListenMessages = ({
  messages,
  setMessages,
  selected,
  setContacts,
  setSelected,
}) => {
  const { socket } = useSocket();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId === selected._id) {
        const sound = new Audio(notifSound);
        sound.play();
        setMessages([newMessage, ...messages]);
      }
    });

    socket?.on("editMessage", (newMessage) => {
      if (newMessage.senderId === selected._id) {
        setMessages((prevState) => {
          const newState = [];
          prevState.forEach((msg) => {
            if (msg._id === newMessage._id) {
              newState.push(newMessage);
            } else {
              newState.push(msg);
            }
          });
          return newState;
        });
      }
    });

    socket?.on("deleteMessage", (message) => {
      if (message.senderId === selected._id) {
        setMessages((prevState) => {
          return prevState.filter((msg) => msg._id !== message._id);
        });
      }
    });

    socket?.on("clearConversation", (userId) => {
      if (userId === selected._id) {
        setMessages([]);
        toast.error("Conversation cleared by the contact");
      }
    });

    socket?.on("deleteContact", (userId) => {
      setContacts((prevState) => {
        return prevState.filter((el) => el._id !== userId);
      });
      if (selected?._id === userId) {
        setSelected(null);
      }
    });

    socket?.on("addContact", (user) => {
      setContacts((prevState) => {
        return [user, ...prevState];
      });
      toast.success(`@${user.username} addded you`);
    });

    return () => {
      socket?.off("newMessage");
      socket?.off("editMessage");
      socket?.off("deleteMessage");
      socket?.off("clearConversation");
      socket?.off("deleteContact");
      socket?.off("addContact");
    };
  }, [socket, messages, setMessages, selected]);
};
export default useListenMessages;
