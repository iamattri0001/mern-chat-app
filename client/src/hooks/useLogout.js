import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";
import { HOST } from "../routes";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const logout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(HOST + "/api/auth/logout");
      if (data) {
        localStorage.removeItem("user");
        setAuthUser(null);
      }
    } catch (error) {
      toast.error(error.messagge);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
