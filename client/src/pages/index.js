import { Space_Grotesk } from "next/font/google";
import Wallet from "@/components/Wallet";
import Transfer from "@/components/Transfer";
import { useEffect, useState } from "react";
import Generate from "@/components/Generate";
import Login from "@/components/Login";

const space = Space_Grotesk({ subsets: ["latin"] });

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  return (
    <div
      className={`${space.className} h-screen flex justify-center items-center`}
    >
      <div className="flex flex-grow gap-10 mx-10">
        <Wallet
          balance={balance}
          setBalance={setBalance}
          address={address}
          setAddress={setAddress}
          modal={modal}
          setModal={setModal}
          setLogin={setLogin}
          login={login}
          setLoginModal={setLoginModal}
          loginModal={loginModal}
        />
        <Transfer setBalance={setBalance} address={address} />
        {modal && ( <Generate
        setModal={setModal}/>
        )}
        {loginModal && (
          <Login setLogin={setLogin} setLoginModal={setLoginModal} setBalance={setBalance} setAddress={setAddress} address={address}/>
        )}
      </div>
    </div>
  );
}
