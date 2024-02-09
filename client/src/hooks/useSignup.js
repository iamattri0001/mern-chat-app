import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../contexts/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const valid = await validateInput({
      fullName,
      username,
      password,
      confirmPassword,
      password,
      gender,
    });
    if (!valid) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          confirmPassword,
          fullName,
          gender,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

const validateInput = async ({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) => {
  if (!password || !confirmPassword || !username || !fullName || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }
  if (password.length < 8) {
    toast.error("Password must be at least 8 characters");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passowords do not match");
    return false;
  }
  if (gender !== "male" && gender !== "female") {
    toast.error("Please select a gender");
    return false;
  }
  if (fullName.length < 3) {
    toast.error("Please provide your name");
    return false;
  }

  if (username.length < 3) {
    toast.error("Username is too short");
    return false;
  }

  try {
    const res = await fetch("/api/auth/available?username=" + username);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    if (data.available) {
      return true;
    } else {
      toast.error("Usernme is already taken");
      return false;
    }
  } catch (error) {
    toast.error(error.message);
  }
};
