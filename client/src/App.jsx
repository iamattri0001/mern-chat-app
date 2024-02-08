import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { Toaster } from "react-hot-toast";
import Home from "./components/Home";

const App = () => {
  return (
    <div
      data-theme="night"
      className="min-h-screen flex items-center justify-center"
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
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
