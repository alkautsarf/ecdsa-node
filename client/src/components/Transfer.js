import { useState } from "react";
import server from "./server";
import { ArrowRightLeft } from 'lucide-react';


export default function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }
  return (
    <form
      className="bg-white flex-grow p-10 gap-5 rounded-xl shadow-lg "
    >
      <div className="flex items-center mb-10 gap-3">
      <ArrowRightLeft size={'48px'}/>
      <h2 className="text-4xl font-bold">Send Transaction</h2>
      </div>
      <label className="flex flex-col mb-4">
        Send Amount
        <input
          className="h-[35px] bg-zinc-50 p-5 rounded-lg border-solid border-2"
          placeholder="1,2,3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        />
      </label>
      <label className="flex flex-col mb-7">
        Recipient
        <input
          className="h-[35px] bg-zinc-50 p-5 rounded-lg border-solid border-2"
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        />
      </label>
      <div className="flex justify-center items-center bg-[#0285c7] bg-opacity-90 rounded-xl hover:scale-[101%] transform transition-transform cursor-pointer" onClick={(e) =>transfer(e)} >
        <h2 className="text-white p-3" >Transfer</h2>
      </div>
    </form>
  );
}
