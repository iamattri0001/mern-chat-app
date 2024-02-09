import  { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetContacts = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/contacts");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setContacts(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getContacts();
  }, []);

  return { loading, contacts, setContacts };
};

export default useGetContacts;
