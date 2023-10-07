# ecdsa-node 

This repository contains the server and client projects for ecdsa node. The server is responsible for organizing wallets and trasactions, while the client provides the UI for it and some tx validation before it passes back to the server. This projects mimicking how the transactions on blockchain works in a simple way.

## Server

The server project is located in the `server` directory. It is built using Node.js and Express.js. The server provides the following features:

- Random address generator with initial balance of 1 ETH
- Login to your wallet using private key
- Check wallet balances
- Sending fund from one wallet to another

### Installation

1. Clone the repository: `git clone [repository URL]`
2. Navigate to the server directory: `cd server`
3. Install the dependencies: `npm install`

### Usage

1. Start the server: `nodemon index`
2. The server will be running at [localhost:3042](http://localhost:3042)

## Client

The client project is located in the `client` directory. It is built using Next.js. The client provides the following features:

- UI for Wallet, Transfer, Login and Random wallet generator.
- TX Validation before it passes down to the server

### Installation

1. Clone the repository: `git clone [repository URL]`
2. Navigate to the client directory: `cd client`
3. Install the dependencies: `npm install`

### Usage

1. Start the client: `npm run dev`
2. The client will be running at [localhost:3000](http://localhost:3000)
