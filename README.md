# Plateforme-Blockchain-de-Certification-et-Notation-de-Datasets

A decentralized web application (dApp) built with Ethereum blockchain technology for dataset certification, evaluation, and token-based rewards.

📌 Overview

This project aims to ensure transparency, traceability, and immutability in dataset evaluation using blockchain technology.

The platform allows users to:

Connect securely using MetaMask
Add datasets to the blockchain
View registered datasets
Rate datasets from 1 to 5
Automatically calculate average ratings
Earn DST tokens for participation
Manage permissions with Role-Based Access Control (RBAC)
🏗️ Technologies Used
Solidity 0.8.0
Hardhat 2.22.0
React.js
Ethers.js v5
MetaMask
Ethereum Blockchain
JavaScript
HTML/CSS
✨ Features
🔐 Authentication
Secure wallet connection using MetaMask
📂 Dataset Management
Add datasets with metadata
Store datasets on blockchain
Real-time dataset consultation
⭐ Dataset Rating
Rate datasets from 1 to 5
Automatic average calculation
Protection against duplicate ratings
🪙 Token Reward System
Users receive 10 DST tokens after rating a dataset
👥 RBAC Permission System

Different roles are supported:

Role	Permissions
NONE	Read only
EVALUATOR	Can rate datasets
CONTRIBUTOR	Can add and rate datasets
ADMINISTRATOR	Full access
📁 Project Structure
mon-projet-blockchain/
├── contracts/
├── scripts/
├── test/
├── frontend/
├── hardhat.config.js
└── README.md
⚙️ Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/your-repository.git
cd your-repository
2️⃣ Install dependencies
npm install

Install Hardhat:

npm install --save-dev hardhat@2.22.0

Install Ethers.js:

npm install ethers@5.7.2
🚀 Run the Project
Start Hardhat local blockchain
npx hardhat node
Compile smart contracts
npx hardhat compile
Deploy the smart contract
npx hardhat run scripts/deploy.js --network localhost
Start frontend
cd frontend
npm install
npm start

Application URL:

http://localhost:3000
🦊 MetaMask Configuration

Add a custom network:

Parameter	Value
Network Name	Hardhat Local
RPC URL	http://127.0.0.1:8545
Chain ID	31337
Currency Symbol	ETH

Import one Hardhat test account into MetaMask.

📜 Smart Contract Functions
Function	Description
ajouterDataset()	Register a dataset
noterDataset()	Rate a dataset
obtenirDataset()	Get dataset information
obtenirTokens()	Get token balance
nombreDatasets()	Get total datasets
🔒 Security Rules
One user cannot rate the same dataset twice
Ratings must be between 1 and 5
Dataset ID must exist
Role verification before sensitive actions
🔮 Future Improvements
Deploy on Sepolia testnet
User reputation system
Advanced admin dashboard
Voting mechanism for role promotion
IPFS integration
