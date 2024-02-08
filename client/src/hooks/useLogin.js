import axios from "axios";
import { useState } from "react";
import { HOST } from "../routes";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const login = async ({ username, password }) => {
    setLoading(true);
    try {
      const resp = await axios.post(HOST + "/api/auth/login", {
        username,
        password,
      });
      console.log(resp);
      const { data, status } = resp;
      if (status === 200 && data) {
        localStorage.setItem("user", JSON.stringify(data));
        setAuthUser(data);
      } else {
        toast.error("An error occurred while logging in");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid username or password");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
