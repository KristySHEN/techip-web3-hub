# TechIP Web3 Hub - Demo Video Script (5 min)

## BEFORE RECORDING - Open these 4 tabs:
- Tab 1: https://github.com/KristySHEN/techip-web3-hub
- Tab 2: https://testnet.snowtrace.io/address/0x25044a6e0b2652feAA72D284400C86863a4d9885
- Tab 3: https://remix.ethereum.org (TechIPFunding.sol open)
- Tab 4: MetaMask extension (click fox icon top right)

## Press Win + Alt + R to START recording

---

## PART 1 - Intro [0:00 - 0:30]
### ACTION: Switch to Tab 1 - GitHub repo homepage

SAY:
"Hi, my name is Kristy Shen, and this is TechIP Web3 Hub.
This is a milestone-based crowdfunding platform for intellectual property projects, built on the Avalanche blockchain.

The problem: in Hong Kong, over 4,600 university IP projects struggle to get early-stage funding.
TechIP Web3 Hub uses smart contracts to enable transparent, milestone-gated fundraising -
investors only release funds when project milestones are verified on-chain."

---

## PART 2 - Show GitHub Repo [0:30 - 1:30]
### ACTION: Stay on Tab 1 - GitHub, scroll slowly to show folder structure

SAY:
"Here is our public GitHub repository.
You can see the project structure:
- The contracts folder contains our Solidity smart contract TechIPFunding.sol
- The app folder contains our Next.js frontend
- We have components, hooks, and lib folders for the UI layer"

### ACTION: Click into contracts folder, then click TechIPFunding.sol to open it

SAY:
"Let me open the smart contract.
This is a 143-line Solidity contract deployed on Avalanche Fuji Testnet.

The four key functions are:
first - createProject: founders register their IP project with a funding goal and milestone amount.
second - invest: investors send AVAX directly to a project.
third - markMilestoneDone: the founder marks a milestone as complete.
fourth - releaseFunds: funds are released after milestone is verified.

This milestone-gating mechanism protects investors and incentivizes founders to deliver results."

---

## PART 3 - Show On-Chain Contract Proof [1:30 - 2:30]
### ACTION: Switch to Tab 2 - Snowtrace block explorer

SAY:
"Now let me show the deployed contract on Avalanche Fuji Testnet.

Here on Snowtrace, the Avalanche block explorer, you can see our contract is live at address:
0x25044a6e0b2652feAA72D284400C86863a4d9885

You can see the Contract Creator here - that is our deployment wallet.
This confirms the contract is publicly verifiable on-chain."

### ACTION: Click the Transactions tab on Snowtrace

SAY:
"Under the Transactions tab, we can see the contract creation transaction.
It is confirmed on-chain at block number 52,543,586.
Anyone can verify this on the public blockchain - fully transparent, no trust required."

---

## PART 4 - Show Remix Contract Code [2:30 - 3:30]
### ACTION: Switch to Tab 3 - Remix IDE
### Scroll to line 61 (createProject function)

SAY:
"Here in Remix IDE you can see the compiled and deployed contract.
Let me highlight the core logic."

### ACTION: Slowly hover mouse over createProject function (line 61-70)

SAY:
"createProject takes a project name, a goal amount in AVAX, and a milestone amount.
The require statements enforce business rules - for example, the milestone cannot exceed the total goal.
This protects both investors and founders from bad configuration."

### ACTION: Scroll down to line 89 - invest function

SAY:
"The invest function is payable - meaning it accepts AVAX directly from investors.
Funds are locked in the contract until milestones are completed and verified."

### ACTION: Scroll to the bottom of Remix - show the green tick deployment record

SAY:
"At the bottom you can see the deployment transaction result:
Status - Transaction mined and execution succeed.
This is proof our contract is successfully live on Fuji Testnet."

---

## PART 5 - Show Frontend + MetaMask [3:30 - 4:15]
### ACTION: Switch to Tab 1 - GitHub, navigate to app/page.tsx file

SAY:
"Our frontend is built with Next.js and connects directly to this smart contract.

The main page has three core features:
First - a Connect Wallet button using MetaMask
Second - a project funding card showing goal, amount raised, and milestone progress
Third - an invest input where users enter their AVAX amount and send it to the contract"

### ACTION: Click the MetaMask fox icon in the top-right corner of the browser

SAY:
"Here is our MetaMask wallet, connected to Avalanche Fuji C-Chain, Chain ID 43113.
When a user visits our dApp and clicks Connect Wallet, MetaMask asks them to authorize.
When they click Invest, a signed transaction goes directly to our smart contract on Fuji.
No intermediary, no bank, fully on-chain."

---

## PART 6 - Closing Summary [4:15 - 4:30]
### ACTION: Switch back to Tab 1 - GitHub repo homepage

SAY:
"To summarize, TechIP Web3 Hub delivers a working MVP with three verifiable components:

First - a deployed and verified smart contract on Avalanche Fuji Testnet
Second - a public GitHub repository with full source code and documentation
Third - a Next.js frontend with MetaMask wallet integration

Our next phase will add AI-powered IP document verification using OCR,
and direct integration with Hong Kong's Intellectual Property Department.

Thank you for watching. The GitHub link and contract address are in our submission."

## Press Win + Alt + R to STOP recording

---
## KEY INFO (copy into submission form)
- GitHub: https://github.com/KristySHEN/techip-web3-hub
- Contract: https://testnet.snowtrace.io/address/0x25044a6e0b2652feAA72D284400C86863a4d9885
- Network: Avalanche Fuji Testnet, Chain ID 43113
- Contract Address: 0x25044a6e0b2652feAA72D284400C86863a4d9885
