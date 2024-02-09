import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "applicationjson" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.messagge);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
