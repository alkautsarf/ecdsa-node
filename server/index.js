const express = require("express");
const app = express();
const cors = require("cors");
const { generate, login, recoverKey, verified } = require("./scripts");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x698bf7aa1497d93a02c66cd3f0659f9205c71edf": 100,
  "0x7c879fcdffb17561e20baec823caff418c058eb4": 50,
  "0x3ed368a2f4ae4ae6ef9c75164c956d04f87cd078": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  console.log(balances);
  res.send({ balance });
});

app.get('/create', (req, res) => {
  const { privateKey, address } = generate();
  balances[address] = 0;
  res.send({privateKey, address});
})

app.post("/send", (req, res) => {
  const { sender, recipient, amount} = req.body;


  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.post('/login', (req, res) => {
  if(login(req.body.privateKey, balances)) {
    res.send(true)
  } else res.status(401).send({message: "Invalid Private Key"})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

module.exports = {balances}
