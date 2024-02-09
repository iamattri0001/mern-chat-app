import { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";

const AddContact = () => {
  const [username, setUsername] = useState("");
  const handleAdd = async () => {
    try {
      const res = await fetch(`/api/contacts/get?username=${username}`);
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }


      // SEND MESSAGE TO THE FOUND USER

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center relative">
      <button
        className=""
        onClick={() => document.getElementById("add-contact").showModal()}
      >
        <IoMdPersonAdd className="text-2xl transition-all cursor-pointer hover:text-primary" />
      </button>
      <dialog id="add-contact" className="modal">
        <div className="modal-box w-[26rem] max-w-5xl">
          <h3 className="font-semibold text mb-4">Add a new contact</h3>
          <div className="flex items-center justify-center gap-x-4">
            <input
              className="w-3/4 text-base bg-transparent ring-1 ring-gray-600 focus:ring-primary rounded-md py-2 text-gray-200 px-3 outline-none"
              placeholder="Enter the username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="bg-primary text-base-100 text-base px-4 py-2 rounded-md font-semibold"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
          <div className="modal-action absolute top-[-22px] right-1">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="p-2 bg-secondary/10 hover:bg-secondary/30 rounded-full text-xl">
                <IoClose />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default AddContact;
