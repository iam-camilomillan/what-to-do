import { FaCog } from "react-icons/fa";

const Page = () => {
  return (
    <div className="flex w-full flex-col p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">Boards</h2>

        <button>
          <FaCog />
        </button>
      </div>
    </div>
  );
};

export default Page;
