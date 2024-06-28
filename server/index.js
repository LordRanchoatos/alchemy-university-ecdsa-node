const express = require('express');
const app = express();
const cors = require('cors');
const secp = require('ethereum-cryptography/secp256k1');
const {
  toHex,
  utf8ToBytes,
  hexToBytes,
} = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  '04ef04af4e6cc96061dfe41ae2b128e5bc46c161ac6d3327ae4718327ecd31111d3d5cb250a8c7d26fd4b3d48e9bc6dbd967b981f2ea0ad8959ce0c05af2be5f21': 100,
  '04ad055a1b0c486ff01b453b81bd0b9f404cbe0bb7ffa9739d315f69a72169d0628b1e46c0c315959b98dcb5287d23320a045544b60b34c2a205a809eefc0b89a2': 50,
  '04ac5bb3f034f7e3b5d255714fef07639f75bb50042d62dac564a6d1c78a506a34c14c259c0da01a2dea70bf0515b47d1e14480d83423ed6552ba2b57216ef7282': 75,
};

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const { message, signature, recoveryBit } = req.body;
  const { recipient, amount } = message;
  const messageHash = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
  const publicKey2 = secp.recoverPublicKey(
    messageHash,
    hexToBytes(signature),
    recoveryBit
  );
  const sender = toHex(publicKey2);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: 'Not enough funds!' });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
