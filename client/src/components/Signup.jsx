import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    toast.error("Form Submitted");
    setTimeout(() => setLoading(false), 3000);
  };
  return (
    <div className="px-5 sm:px-10 py-8 bg-base-300 flex flex-col items-center justify-center gap-y-3">
      <h3 className="text-2xl sm:text-3xl mb-5">Signup Form</h3>
      <form
        onSubmit={submit}
        className={`flex flex-col gap-y-4 items-center justify-center ${
          loading ? `pointer-events-none opacity-50` : ``
        }`}
      >
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered input-secondary sm:w-[280px] max-w-xs"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Choose a username"
            className="input input-bordered input-secondary sm:w-[280px] max-w-xs"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Choose a password"
            className="input input-bordered input-secondary sm:w-[280px] max-w-xs"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Cofirm your password"
            className="input input-bordered input-secondary sm:w-[280px] max-w-xs"
          />
        </div>

        <div className="flex items-center justify-center gap-x-10">
          <div className="flex items-center gap-x-2">
            <input
              id="male"
              type="radio"
              name="gender"
              className="radio radio-primary"
              value={"male"}
              checked
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              id="female"
              value={"female"}
              type="radio"
              name="gender"
              className="radio radio-accent"
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>

        {!loading && (
          <button className="bg-accent px-6 py-2 rounded-lg text-neutral">
            Signup
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
        Already have an account?{" "}
        <Link to={"/login"} className="text-primary">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Signup;
