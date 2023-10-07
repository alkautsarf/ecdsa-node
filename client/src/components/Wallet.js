import server from "@/components/server";
import { Wallet as WalletIcon } from "lucide-react";
import { useState } from "react";
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

export default function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  login,
  setModal,
  setLogin,
  loginModal,
  setLoginModal,
}) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
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
    <>
      <div className="bg-white flex-grow p-10 gap-5 rounded-xl shadow-lg ">
        <div className="flex items-center gap-3 mb-10">
          <WalletIcon size={"48px"} />
          <h2 className="text-4xl font-bold">Your Wallet</h2>
        </div>
        {!login ? (
          <label className="flex flex-col mb-7">
            Wallet Address
            <input
              className="h-[35px] bg-zinc-50 p-5 rounded-lg border-solid border-2"
              placeholder="Type an address, for example: 0x1"
              value={address}
              onChange={onChange}
            />
          </label>
        ) : (
          <label className="flex flex-col mb-7">
            Wallet Address
            <input
              className="h-[35px] bg-zinc-50 p-5 rounded-lg border-solid border-2"
              placeholder="Type an address, for example: 0x1"
              readOnly={true}
              value={`0x${toHex(keccak256(secp256k1.getPublicKey(localStorage.getItem("privateKey")).slice(1)).slice(-20))}`
            }
            />
          </label>
        )}
        <div className="bg-slate-100 p-3 rounded-lg">
          <h2>BALANCE : {balance} ETH</h2>
        </div>
        <h2 className="p-2 text-sm">
          Don't have wallet yet ?{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              setModal(true);
            }}
            className="text-blue-500 cursor-pointer"
          >
            Create one
          </a>
        </h2>
        {!login ? (
          <div className="flex justify-center items-center w-full hover:scale-[101%] transform transition-transform cursor-pointer">
            <button
              className="bg-[#0285c7] text-white font-bold py-3 px-10 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                setLoginModal(true);
              }}
            >
              Login
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full hover:scale-[101%] transform transition-transform cursor-pointer">
            <button
              className="bg-[#c70233] text-white font-bold py-3 px-10 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                setLogin(false);
                setBalance(0)
                localStorage.removeItem("privateKey");
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
