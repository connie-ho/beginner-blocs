# Beginner Blocs

An NFT Marketplace designed by beginners for beginners

# Getting Started

- Each package including the root has its own `.env` file. Follow `env.example` to ensure you have the right keys (TB listed here...)

## Blockchain (root)

- Install packages with `npm i`
- Once a smart contract is written, compile an ABI with `npx hardhat compile`
- Run the local test node with `npx hardhat node`
- Deploy a contract with `npm run deploy:ropsten`
- Run the test suite with `npm test`

## Server

- Enter the server in `packages/server`
- Install packages with `npm i`
- Start the server in dev mode with `npm run watch:dev` or regular mode with `npm start`. The server is hosted at `http://localhost:3001/`
- Run the test suite with `npm test`

## Frontend

- Enter the client in `packages/client/`
- Install packages with `npm i`
- Run `npm start` to launch the application, and visit `http://localhost:3000/` to see the application
- Run the test suite with `npm test`
