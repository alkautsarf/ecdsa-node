import server from "@/components/server";
import { Wallet as WalletIcon } from 'lucide-react';

export default function Wallet({ address, setAddress, balance, setBalance, modal, setModal }) {
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
        <div className="flex  items-center gap-3 mb-10">
        <WalletIcon size={'48px'}/>
        <h2 className="text-4xl font-bold">Your Wallet</h2>
        </div>
        <label className="flex flex-col mb-7">
          Wallet Address
          <input
            className="h-[35px] bg-zinc-50 p-5 rounded-lg border-solid border-2"
            placeholder="Type an address, for example: 0x1"
            value={address}
            onChange={onChange}
          />
        </label>
        <div className="bg-slate-100 p-3 rounded-lg">
          <h2>BALANCE : {balance} ETH</h2>
        </div>
        <h2 className="p-2 text-sm">Don't have wallet yet ? <a onClick={e => {
          e.preventDefault();
          setModal(true);
        }} className="text-blue-500 cursor-pointer">Create one</a></h2>
      </div>
    </>
  );
}
