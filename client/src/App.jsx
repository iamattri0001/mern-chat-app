import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const { authUser } = useAuth();
  return (
    <div
      data-theme="night"
      className="min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Routes>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster
        toastOptions={{
          style: {
            background: "#374151",
            borderRadius: "32px",
            color: "#f3e8ff",
          },
        }}
      />
    </div>
  );
};

export default App;
