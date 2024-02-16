import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Contacts = ({ selected, setSelected, loading, contacts }) => {
  return (
    <div className="flex flex-col gap-y-2 pr-1 h-[85%] overflow-y-scroll overflow-x-hidden">
      {!loading &&
        contacts.map((user, i) => (
          <Contact
            key={i}
            user={user}
            selected={selected}
            setSelected={setSelected}
            indexInArray={i}
          />
        ))}
      {loading &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
          <ContactSkeleton key={i} />
        ))}
      {!loading && contacts?.length === 0 && (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          You don't have any contacts{" "}
        </div>
      )}
    </div>
  );
};

export default Contacts;

const Contact = ({ user, selected, setSelected, indexInArray }) => {
  const { fullName, _id: userId, username, profilePic } = user;
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
    <motion.div
      key={user._id}
      initial={{ opacity: 0, x: -100 - 100 * indexInArray }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      onClick={() => {
        if (!selected || selected._id.toString() !== user._id.toString()) {
          setSelected(user);
        } else {
          setSelected(null);
        }
      }}
      className={`flex items-center gap-x-5 py-4 px-6 rounded-md cursor-pointer ${
        selected?._id === userId
          ? `bg-gradient-to-tr from-secondary to-accent text-black`
          : `hover:bg-primary/40 bg-neutral`
      }`}
    >
      <div className="h-12 w-12">
        <img
          className="h-full border-2 rounded-full border-accent"
          src={
            profilePic ? profilePic : "https://avatar.iran.liara.run/public/boy"
          }
        />
      </div>
      <div>
        <h4 className="font-semibold line-clamp-1 max-w-[320px]">
          {fullName ? fullName : "No name"}
        </h4>
        <span
          className={`text-sm font-bold line-clamp-1 max-w-[320px] ${
            selected && selected._id === userId
              ? `text-black/50 hover:text-black`
              : `text-gray-400 hover:text-accent`
          }`}
          onClick={handleCopy}
        >
          @{username ? username : "iamattri0001"}
        </span>
      </div>
    </motion.div>
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
