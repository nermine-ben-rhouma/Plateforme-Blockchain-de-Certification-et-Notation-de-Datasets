Plateforme-Blockchain-de-Certification-et-Notation-de-Datasets

A decentralized web application (dApp) built with Ethereum, Solidity, Hardhat, React.js, and MetaMask for dataset certification, evaluation, and token-based rewards.

📌 Project Overview

This project provides a blockchain-based solution for managing and evaluating datasets in a transparent, secure, and immutable way.

The platform allows users to:

Connect securely using MetaMask
Add datasets to the blockchain
Consult registered datasets
Rate datasets from 1 to 5
Automatically calculate average ratings
Earn DST tokens as rewards for participation
Manage permissions using Role-Based Access Control (RBAC)

The application demonstrates how blockchain technology can improve trust and traceability in data science workflows.

🏗️ Architecture
Layer	Technology	Role
Smart Contract	Solidity 0.8.0	Blockchain business logic
Blockchain Network	Hardhat 2.22.0	Local Ethereum test network
Frontend	React.js + Ethers.js v5	User interface
Wallet	MetaMask	Authentication & transaction signing
✨ Features
✅ MetaMask wallet connection
✅ Dataset registration on blockchain
✅ Dataset rating system (1–5)
✅ Automatic average calculation
✅ Token reward mechanism (10 DST per rating)
✅ Duplicate rating protection
✅ Role-Based Access Control (RBAC)
✅ Real-time blockchain interaction
✅ Smart contract events for auditability
🔐 Role-Based Access Control (RBAC)

The platform integrates a hierarchical RBAC system:

Role	Permissions
NONE	Read-only access
EVALUATOR	Can rate datasets
CONTRIBUTOR	Can add and rate datasets
ADMINISTRATOR	Full management access
Protected Functions
Function	Required Role
ajouterDataset()	CONTRIBUTOR
noterDataset()	EVALUATOR
attribuerRole()	ADMINISTRATOR
modifierRecompense()	ADMINISTRATOR
🪙 Token System

Users receive 10 DST tokens each time they rate a dataset.

Security Rules
A user cannot rate the same dataset twice
Ratings must be between 1 and 5
Dataset IDs must exist
Updating a previous rating does not generate extra tokens
📂 Project Structure
mon-projet-blockchain/
├── contracts/          # Solidity smart contracts
├── scripts/            # Deployment scripts
├── test/               # Tests
├── frontend/           # React frontend
├── hardhat.config.js   # Hardhat configuration
└── README.md
⚙️ Prerequisites

Install the following tools before starting:

Node.js v24+
VS Code
MetaMask extension
Hardhat 2.22.0
🚀 Installation Guide
1️⃣ Clone the Repository
git clone https://github.com/your-username/your-repository.git
cd your-repository
2️⃣ Install Dependencies
npm install

Install Hardhat:

npm install --save-dev hardhat@2.22.0

Install Ethers.js:

npm install ethers@5.7.2
3️⃣ Compile Smart Contracts
npx hardhat clean
npx hardhat compile
4️⃣ Start Local Blockchain
npx hardhat node
5️⃣ Deploy Smart Contract

Open a new terminal:

npx hardhat run scripts/deploy.js --network localhost
6️⃣ Configure MetaMask

Add a custom network:

Parameter	Value
Network Name	Hardhat Local
RPC URL	http://127.0.0.1:8545
Chain ID	31337
Currency Symbol	ETH

Import one of the Hardhat test accounts using its private key.

7️⃣ Start Frontend
cd frontend
npm install
npm start

Application URL:

http://localhost:3000
📖 How to Use
Add a Dataset
Connect MetaMask
Fill dataset information
Confirm transaction
Dataset is stored on blockchain
Rate a Dataset
Enter dataset ID
Choose a rating from 1 to 5
Confirm transaction
Receive 10 DST tokens
📜 Smart Contract Functions
Function	Description
ajouterDataset()	Register a new dataset
noterDataset()	Rate a dataset
obtenirDataset()	Retrieve dataset information
obtenirTokens()	Get token balance
nombreDatasets()	Get total number of datasets
🛠️ Technologies Used
Solidity
Ethereum
Hardhat
React.js
Ethers.js
MetaMask
JavaScript
HTML/CSS
🔮 Future Improvements
Deployment on Sepolia testnet
User reputation system
Advanced admin dashboard
Voting mechanism for role promotion
Improved UI/UX
IPFS integration for decentralized storage
