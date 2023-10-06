const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
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

module.exports = {
  generate
};
