import { toast } from "react-hot-toast";
import useGetContacts from "../hooks/useGetContacts";

const Contacts = ({ selected, setSelected }) => {
  const { loading, contacts, setContacts } = useGetContacts();
  return (
    <div className="flex flex-col gap-y-2 pr-1 h-[85%] overflow-y-scroll">
      {!loading &&
        contacts.map((user, i) => (
          <Contact
            key={i}
            user={user}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      {loading &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
          <ContactSkeleton key={i} />
        ))}
    </div>
  );
};

export default Contacts;

const Contact = ({ user, selected, setSelected }) => {
  const { fullname, _id: userId, username, profilePic } = user;
  const handleCopy = (e) => {
    e.stopPropagation();
    try {
      window.navigator.clipboard.writeText(username);
      toast.success("Copied to Clipboard");
    } catch (error) {
      toast.error("Couldn't copy text");
      console.error(error.message);
    }
  };

  return (
    <div
      onClick={() => {
        setSelected(user);
      }}
      className={`flex items-center gap-x-5 py-4 px-6 rounded-md cursor-pointer ${
        selected?._id === userId
          ? `bg-gradient-to-tr from-secondary to-accent text-black`
          : `hover:bg-primary/40 bg-neutral`
      }`}
    >
      <div>
        <img
          className="h-10"
          src={
            profilePic ? profilePic : "https://avatar.iran.liara.run/public/boy"
          }
        />
      </div>
      <div>
        <h4 className="font-semibold">
          {fullname ? fullname : "Deepanshu Attri"}
        </h4>
        <span
          className={`text-sm font-bold ${
            selected && selected._id === userId
              ? `text-black/50 hover:text-black`
              : `text-gray-400 hover:text-accent`
          }`}
          onClick={handleCopy}
        >
          @{username ? username : "iamattri0001"}
        </span>
      </div>
    </div>
  );
};

const ContactSkeleton = () => {
  return (
    <div
      className={`flex items-center gap-x-5 py-4 px-4 rounded-md bg-neutral`}
    >
      <div>
        <div className="h-12 w-12 rounded-full skeleton" />
      </div>
      <div className="flex flex-col gap-y-3">
        <h4 className="skeleton h-4 w-32"></h4>
        <h6 className={`text-sm font-bold skeleton h-3 w-28`}></h6>
      </div>
    </div>
  );
};
