const secp = require("ethereum-cryptography/secp256k1");
// import * as secp from "@noble/secp256k1";
const { toHex, utf8ToBytes, bytesToHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");


function generate() {
  const privateKey = toHex(secp.secp256k1.utils.randomPrivateKey());
  const rawPublicKey = secp.secp256k1.getPublicKey(privateKey);
  const publicKey = toHex(rawPublicKey);
  const address = `0x${toHex(keccak256(rawPublicKey.slice(1)).slice(-20))}`;
  return {
    privateKey,
    address,
  };
}

function login(privateKey, balances) {
  try {
    const address = `0x${toHex(keccak256(secp.secp256k1.getPublicKey(privateKey).slice(1)).slice(-20))}`
    console.log(address);
    const addresses = Object.keys(balances);
    if (addresses.includes(address)) {
      return true;
    }
  } catch (error) {
    console.log('Invalid Private Key');
    return false;
  }
}



module.exports = {
  generate,
  login,
};
