import { BadgePlus } from "lucide-react";
import { X } from "lucide-react";
import { useState } from "react";
import server from "./server";

export default function Generate({ setModal }) {
  const [showKey, setShowkey] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [address, setAddress] = useState("");
  const [clicked, setClicked] = useState(false);

  async function create() {
    try {
      const {data : {privateKey, address}} = await server.get(`create`);
      setPrivateKey(privateKey);
      setAddress(address);
    } catch (e) {
      alert(e.response.data.message)
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
      <div className="relative max-w-2xl mr-[100px] bg-white rounded-lg flex flex-col w-[50%] p-8">
        <div className="absolute top-0 right-0 m-2">
          <X
            className="w-6 h-6 text-gray-500 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              setModal(false)}}
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
              if (!clicked) {
                create()
                setShowkey(true);
                setClicked(true);
              }
            }}
            className={`bg-[#0285c7] bg-opacity-90 rounded-xl hover:scale-[101%] transform transition-transform cursor-pointer w-[80%] ${clicked ? "disabled:opacity-75 cursor-not-allowed" : ""}`}
            disabled={clicked}
          >
            <h2 className="text-white p-3">Create</h2>
          </button>
        </div>
        {showKey && (
          <div className="mt-5">
            <h2>Private Key : {privateKey}</h2>
            <h2>Address : {address} </h2>
            <br/>
            <h1 className="text-red-500 text-sm italic">This window will only show once.</h1>
            <h1 className="text-red-500 text-sm italic">Store this key in a save place !!!</h1>
          </div>
        )}
      </div>
    </div>
  );
}
