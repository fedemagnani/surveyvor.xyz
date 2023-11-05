# Surveyvor
Surveyvor is a Web3 based survey platform that allows users to create and participate in surveys, preserving their privacy and monetizing their data in an secure and anonymous fashion.
The uniqueness of this protocol is accomplished thanks to the following integrations:
- iExec: allowing the respondents to submit their answers to surveys in private vaults (DataProtector) making them accessible only to the survey creator via predetermined and exclusive methods suchs as Web3Mail 
- Gnosis: a blazing fast and secure decentralized network handling the treasury system of the platform, allowing survey creators to manage their survey campaigns and respondents to redeem economic rewards and on-chain reputation 
- WalletConnect: to allow users to interact with the platform using their own wallets via Web3Wallet 
# Setup
In order to run the project locally, you need to launch both the frontend and the backend.
```
git clone https://github.com/fedemagnani/surveyvor.xyz
npm i ethers@6.8.1
```
### Backend
Once that you clone the repository, you need to navigate to the frontend folder and install the dependencies, and then run the backend:
```
cd backend
npm install
nodemon server.js
```

### Frontend
Once that you clone the repository, you need to navigate to the frontend folder and install the dependencies, and then run the frontend:
```
cd frontend/surveyvor-app
npm install
npm run serve
```

In case of problems when answering to surveys, try the following
```
npm i @iexec/dataprotector
npm i iexec@8.4.0
npm i ethers@5.7.2
```

