# Beginner Blocs

Welcome to Beginner Blocs!
An NFT is a digital asset that represents real-world art. Beginner Blocs is an NFT Marketplace, designed by beginners for beginners, is a platform for people to create, buy, sell, and transfer NFTs around the world. Click on the get started button to learn more details about the NFT world and how to use the marketplace!

Buy:
Use Metamask wallet to log in and choose your favorite NFT through our Marketplace homepage. Make sure your wallet has enough ETH to buy the NFT. After the transaction is complete, you can view this NFT on your profile page.

Create:
Click on Create button to mint your own NFT. Upload your art and input the name and description. The link appears below shows the status of the transaction. Wait for a few seconds to complete. Go to your profile page to see your owned NFTs.

Sell:
Click on the NFT you want to sell someone. Click the list button to put your NFT into the NFT marketplace. Set the price and confirm the transaction in your Metamask.

Transfer:
Click on the NFT you want to transfer to someone. Click the transfer button to transfer your NFT to other people. Set the receiver's address and confirm the transaction in your Metamask. By clicking on another receiver's address you can view the receiver's profile to check the owned NFTs to see if the NFT is transferred to this person.

This project was developed by Connie Ho, Justin Ly, Sufiyan Gani, Yulin Wan, Akshay Rakheja

[![codecov](https://codecov.io/gh/connie-ho/beginner-blocs/branch/master/graph/badge.svg?token=UUTWLI92H5)](https://codecov.io/gh/connie-ho/beginner-blocs)

# Getting Started

- Each package including the root has its own `.env` file. Follow `env.example` to ensure you have the right keys (TB listed here...)

# Final Product

## Homepage

!["GIF of Home Page"](https://raw.githubusercontent.com/Justin1002/scheduler/e7edc741aee253addca0d465ad13a408dc12ffb1/docs/homepage.gif)

## Mint NFT

!["GIF of create your own NFT"](https://raw.githubusercontent.com/Justin1002/scheduler/e7edc741aee253addca0d465ad13a408dc12ffb1/docs/create.gif)

## List NFT

!["GIF of listing NFT"](https://raw.githubusercontent.com/Justin1002/scheduler/e7edc741aee253addca0d465ad13a408dc12ffb1/docs/list.gif)

## Buy NFT

!["GIF of purchasing NFT"](https://raw.githubusercontent.com/Justin1002/scheduler/e7edc741aee253addca0d465ad13a408dc12ffb1/docs/purchase.gif)

## Blockchain (root)

- Install packages with `npm i`
- Once a smart contract is written, compile an ABI with `npx hardhat compile`
- Run the local test node with `npx hardhat node`
- Deploy a contract with `npm run deploy:ropsten`
- Run the test suite with `npm test`

## Server Setup

- Enter the server in `packages/server`
- Install packages with `npm i` or skip it if you ran `npm run install:all` in the root folder.
- Start the server in dev mode with `npm run watch:dev` or regular mode with `npm start`. The server is hosted at `http://localhost:3001/`
- Run the test suite with `npm test`

## Frontend

- Enter the client in `packages/client/`
- Install packages with `npm i` or skip it if you ran `npm run install:all` in the root folder.
- Run `npm start` to launch the application, and visit `http://localhost:3000/` to see the application
- Run the test suite with `npm test`

## Future Features

- Adding royalty distribution capability
- Delist an NFT
- Deploying on mainnet
- Auction Functionality
- Capability to view/list/create music and or video NFT's

## Known bugs

- Explore page takes time if too many NFTs are listed
- If the user is not logged in then they cannot see owner on details page
- If the user refreshes while a transaction is being processed then there is no way of knowing that a transaction was processing
- The create page allows files other than images even though we only supprt image NFT
