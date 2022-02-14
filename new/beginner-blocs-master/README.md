# Beginner Blocs

An NFT Marketplace designed by beginners for beginners

# Getting Started

- Make sure to put your meta mask account PRIVATE KEY in your own .env file and do not share this with anyone else

# Server

- Once a smart contract is written, compile an ABI with `npx hardhat compile`
- In one terminal, run the local test node with `npx hardhat node`
- In another terminal, deploy the contract to the block chain with `npx hardhat run scripts/deploy.js --network ropsten`

## Hardhat development examples

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Frontend

1. Enter the `/frontend/` folder and type npm i to install dependencies
2. run `npm start` to launch the application, and visit `http://localhost:3000/` to see the application
