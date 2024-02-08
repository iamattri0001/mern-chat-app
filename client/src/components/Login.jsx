import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    toast.error("Form Submitted");
    setTimeout(() => setLoading(false), 3000);
  };
  return (
    <div className="px-5 sm:px-10 py-8 bg-base-300 flex flex-col items-center justify-center gap-y-3">
      <h3 className="text-2xl sm:text-3xl mb-5">Login Form</h3>
      <form
        onSubmit={submit}
        className={`flex flex-col gap-y-4 items-center justify-center ${
          loading ? `pointer-events-none opacity-50` : ``
        }`}
      >
        <div>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered input-secondary sm:w-[280px] max-w-xs"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Eneter your password"
            className="input input-bordered input-secondary sm:w-[280px] max-w-xs"
          />
        </div>

        {!loading && (
          <button className="bg-accent px-6 py-2 rounded-lg text-neutral">
            Login
          </button>
        )}
        {loading && (
          <button className="bg-accent px-3 py-2 rounded-lg text-neutral flex items-center justify-center gap-x-3">
            <span className="loading loading-spinner"></span>
            Loading
          </button>
        )}
      </form>
      <div className="mt-2 text-sm">
        Don't have an account? {" "}
        <Link to={"/signup"} className="text-primary">
          Signup here
        </Link>
      </div>
    </div>
  );
};

export default Login;
