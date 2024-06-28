const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();

console.log("private key:", toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);

console.log("\n ");
console.log("public key:", toHex(publicKey));

// private key: 0eef57b179b3ec9dc8cbd750629552d62190f5a6994cbd6a338edd946f577c71
// public key: 04ef04af4e6cc96061dfe41ae2b128e5bc46c161ac6d3327ae4718327ecd31111d3d5cb250a8c7d26fd4b3d48e9bc6dbd967b981f2ea0ad8959ce0c05af2be5f21

// private key: 7849f6d635fdc2b40e90a4f5d121701dfc8c30de68659d0fdd8ccda795081d00
// public key: 04ad055a1b0c486ff01b453b81bd0b9f404cbe0bb7ffa9739d315f69a72169d0628b1e46c0c315959b98dcb5287d23320a045544b60b34c2a205a809eefc0b89a2

// private key: 38b8cad6e7a27aacf4cecd90b77021b2e49ef9ec0766ea8ffe2fb801e862db26
// public key: 04ac5bb3f034f7e3b5d255714fef07639f75bb50042d62dac564a6d1c78a506a34c14c259c0da01a2dea70bf0515b47d1e14480d83423ed6552ba2b57216ef7282
