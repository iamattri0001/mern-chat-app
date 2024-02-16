import toast from "react-hot-toast";
import { SlOptionsVertical } from "react-icons/sl";

const ChatHeader = ({ selected, setMessages, setContacts, setSelected }) => {
  const handleCopy = () => {
    try {
      window.navigator.clipboard.writeText(selected.username);
      toast.success("Copied to Clipboard");
    } catch (error) {
      toast.error("Couldn't copy text");
      console.error(error.message);
    }
  };
  return (
    <div className="bg-secondary/30 p-3 flex items-center justify-between rounded-lg">
      <div className="flex items-center justify-center gap-x-4">
        <img
          src={selected.profilePic}
          alt="profilePic"
          className="h-12 ring-4 rounded-full ring-secondary"
        />
        <div className="flex flex-col gap-y-0">
          <h3 className="text-lg text-primary truncate max-w-[560px]">{selected.fullName}</h3>
          <h5
            className="text-accent cursor-pointer hover:text-accent/80 transition-all max-w-[460px] truncate"
            title="Click to copy"
            onClick={handleCopy}
          >
            @{selected.username}
          </h5>
        </div>
      </div>
      <div className="dropdown">
        <div tabIndex={0} role="button">
          <SlOptionsVertical className="text-xl text-accent hover:text-accent/70 transition-all" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44  right-0"
        >
          <li>
            <ClearConversation selected={selected} setMessages={setMessages} />
          </li>
          <li>
            <DeleteContact
              selected={selected}
              setContacts={setContacts}
              setSelected={setSelected}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatHeader;

const DeleteContact = ({ selected, setSelected, setContacts }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch("/api/contacts/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected._id.toString() }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.success) {
        setContacts((prevState) => {
          return prevState.filter(
            (e) => e._id.toString() !== selected._id.toString()
          );
        });
        
        setSelected(null);
        toast.success("Delete from your contacts");
      } else {
        toast.error("Failed to delete the contact");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={`flex items-center justify-center relative`}>
      <button
        className="w-full text-left"
        onClick={() => document.getElementById("delete-contact").showModal()}
      >
        Delete contact
      </button>
      <dialog id="delete-contact" className={`modal`}>
        <div className={`modal-box w-[26rem] max-w-5xl`}>
          <h3 className="font-semibold text-base mb-4">
            Do you want to delete this contact?
            <span className="text-sm text-warning/60">
              All the messages will be deleted
            </span>
          </h3>
          <div className="flex items-center justify-center gap-x-10">
            <button
              className={`bg-error text-base-100 text-base px-4 py-1.5 rounded-md font-semibold`}
              onClick={handleDelete}
            >
              Delete
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

const ClearConversation = ({ selected, setMessages }) => {
  const handleClear = async () => {
    try {
      const res = await fetch("/api/message/clear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected._id.toString() }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.success) {
        setMessages([]);
        toast.success("Cleared all the messages");
      } else {
        toast.error("Failed to clear the conversation");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={`flex items-center justify-center relative`}>
      <button
        className="w-full text-left"
        onClick={() =>
          document.getElementById("clear-conversation").showModal()
        }
      >
        Clear conversation
      </button>
      <dialog id="clear-conversation" className={`modal`}>
        <div className={`modal-box w-[26rem] max-w-5xl`}>
          <h3 className="font-semibold text-base mb-4">
            Do you want to clear all the messages?
          </h3>
          <div className="flex items-center justify-center gap-x-10">
            <button
              className={`bg-error text-base-100 text-base px-4 py-1.5 rounded-md font-semibold`}
              onClick={handleClear}
            >
              Clear
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
