import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useGetMessages = ({ id }) => {
  if (!id) return;
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const loadMore = async (id) => {
    try {
      const res = await fetch(
        `/api/message/${id}?from=${messages.length}&to=${messages.length + 20}`
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.length) {
        setMessages((prevState) => {
          return [...prevState, ...data];
        });
      } else {
        toast.error("No more messages");
      }
    } catch (error) {
      toast.error(data.error);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/message/${id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [id]);

  return { loading, setMessages, messages, loadMore };
};
