import { KeyRound } from "lucide-react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import server from "./server";
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

export default function Login({ setLoginModal, setLogin, setBalance, setAddress, address}) {
  const [privateKey, setPrivateKey] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function getAddy() {
    const address = `0x${toHex(keccak256(secp256k1.getPublicKey(localStorage.getItem("privateKey")).slice(1)).slice(-20))}`
    console.log(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
      <div className="relative max-w-2xl mr-[100px] bg-white rounded-lg flex flex-col w-[50%] p-8">
        <div className="absolute top-0 right-0 m-2">
          <X
            className="w-6 h-6 text-gray-500 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setLoginModal(false);
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-3 mb-7 mt-5">
          <KeyRound size={"32px"} />
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        <label className="flex flex-col mb-7">
          Private Key
          <input
            className="h-[35px] bg-zinc-50 p-5 rounded-lg border-solid border-2"
            placeholder="df7cec6760a3..."
            value={privateKey}
            onChange={setValue(setPrivateKey)}
          />
        </label>
        <div className="flex justify-center items-center">
          <button
            onClick={async (e) => {
              e.preventDefault();
              try {
                await server.post("/login", { privateKey });
                setLoginModal(false);
                setLogin(true);
                localStorage.setItem("privateKey", privateKey);
                getAddy();
              } catch (ex) {
                alert(ex.response.data.message);
              }
            }}
            className={`bg-[#0285c7] bg-opacity-90 rounded-xl hover:scale-[101%] transform transition-transform cursor-pointer w-[30%]`}
          >
            <h2 className="text-white p-3">Login</h2>
          </button>
        </div>
      </div>
    </div>
  );
}
