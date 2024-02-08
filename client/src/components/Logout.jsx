import { useState } from "react";
import { FaPowerOff } from "react-icons/fa6";
import useLogout from "../hooks/useLogout";

export const Logout = () => {
  const { loading, logout } = useLogout();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={`flex items-center justify-center relative`}>
      <button
        className=""
        onClick={() => document.getElementById("logout").showModal()}
      >
        <FaPowerOff className="text-xl transition-all cursor-pointer hover:text-primary" />
      </button>
      <dialog id="logout" className={`modal`}>
        <div
          className={`modal-box w-[26rem] max-w-5xl ${
            loading ? `pointer-events-none opacity-60` : ``
          }`}
        >
          <h3 className="font-semibold text mb-4">Do you want to logout?</h3>
          <div className="flex items-center justify-center gap-x-10">
            <button
              className={`bg-error text-base-100 text-base px-4 py-1.5 rounded-md font-semibold`}
              onClick={handleLogout}
            >
              Logout
            </button>
            <form method="dialog" className="">
              {/* if there is a button, it will close the modal */}
              <button className="bg-neutral text-base px-4 py-2 rounded-md font-semibold">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
