import { BadgePlus } from "lucide-react";
import { X } from "lucide-react";
import { useState } from "react";

export default function Generate({ setModal }) {
  const [showKey, setShowkey] = useState(false);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
      <div className="relative max-w-2xl mr-[100px] bg-white rounded-lg flex flex-col w-[40%] p-8">
        <div className="absolute top-0 right-0 m-2">
          <X
            className="w-6 h-6 text-gray-500 cursor-pointer"
            onClick={() => setModal(false)}
          />
        </div>
        <div className="flex items-center justify-center gap-3 mb-10 mt-5">
          <BadgePlus size={"32px"} />
          <h2 className="text-2xl font-bold">Create Wallet</h2>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowkey(true);
            }}
            className="bg-[#0285c7] bg-opacity-90 rounded-xl hover:scale-[101%] transform transition-transform cursor-pointer w-[80%]"
          >
            <h2 className="text-white p-3">Create</h2>
          </button>
        </div>
        {showKey && (
          <div className="mt-5">
            <h2>Private Key : 1234567890asdfghjkl</h2>
            <h2>Public Key : aesxcygvhbnjj9532e32</h2>
          </div>
        )}
      </div>
    </div>
  );
}
