# TechIP Web3 Hub

> A blockchain-based micro-funding platform for early-stage tech IP projects, built on Avalanche.
> Submitted for **Avalanche Build Games — Stage 2 MVP**

---

## Overview

TechIP Web3 Hub is a decentralized fundraising platform designed for early-stage technology and intellectual property (IP) projects. It enables project founders to raise funds transparently on-chain and releases capital to founders only when pre-defined milestones are completed — protecting investors and incentivizing delivery.

Traditional early-stage funding is slow, opaque, and inaccessible for small or niche tech IP projects. TechIP Web3 Hub solves this by using smart contracts on the Avalanche network to automate trust, enforce milestone-based fund release, and give investors verifiable on-chain visibility.

---

## Problem

- Early-stage tech IP projects (patents, software, research tools) struggle to access seed funding through traditional channels.
- Investors have no transparent mechanism to track how their capital is used.
- Intermediaries (accelerators, banks) add friction, cost, and gatekeeping.

---

## Solution — MVP Scope

For this MVP, we demonstrate the core funding lifecycle:

1. **Project Creation** — A founder registers a project with a funding goal and milestone targets.
2. **Investment** — Investors contribute AVAX directly to the smart contract.
3. **Milestone Completion** — The project founder marks a milestone as done.
4. **Fund Release** — Funds held in escrow are released to the founder upon milestone completion.

All logic is enforced on-chain via a Solidity smart contract deployed to **Avalanche Fuji Testnet**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Blockchain | Avalanche C-Chain (Fuji Testnet) |
| Smart Contract | Solidity |
| Frontend | HTML / JavaScript / ethers.js |
| Wallet | MetaMask |
| Contract Deployment | Remix IDE |

---

## Smart Contract Functions

```solidity
creatProject(string name, uint256 goalAmount, uint256 milestoneAmount)
invest(uint256 projectId)
markMilestoneDone(uint256 projectId)
releaseFunds(uint256 projectId)
```

- Contract Address (Fuji): `[TO BE UPDATED AFTER DEPLOYMENT]`
- Explorer Link: `[TO BE UPDATED]`

---

## MVP Architecture

```
[User Browser]
     |
     v
[Frontend HTML/JS]  <-->  [MetaMask Wallet]
     |
     v
[Avalanche Fuji C-Chain]
     |
     v
[TechIPFunding.sol Smart Contract]
  - Project registry
  - Escrow logic
  - Milestone & fund release
```

---

## Why Avalanche?

- **EVM Compatible** — Solidity contracts deploy with no changes.
- **Low Fees** — Micro-funding transactions remain cost-effective for small investors.
- **Fast Finality** — Near-instant transaction confirmation improves UX.
- **Fuji Testnet** — Fully operational test environment for MVP demonstration.

---

## How to Run (Frontend)

1. Clone this repository
2. Open `frontend/index.html` in your browser
3. Connect MetaMask and switch to Avalanche Fuji Testnet
4. Interact with the platform: create a project, invest, mark milestone, release funds

**Fuji RPC:** `https://api.avax-test.network/ext/bc/C/rpc`
**Chain ID:** `43113`

---

## Project Structure

```
techip-web3-hub/
|-- contracts/
|   |-- TechIPFunding.sol
|-- frontend/
|   |-- index.html
|-- docs/
|   |-- technical-overview.md
|-- README.md
```

---

## Roadmap (Post-MVP)

- AI-powered project screening and due diligence (document OCR + risk scoring)
- Investor dashboard with portfolio tracking
- Secondary market for tokenized IP rights
- KYC/AML compliance layer
- Multi-milestone governance and voting

---

## Team

**TechIP Web3 Hub** — Built for Avalanche Build Games 2026

---

## Demo

- Walkthrough Video: `[TO BE UPDATED]`
- Live Demo: `[TO BE UPDATED]`
- Contract on Explorer: `[TO BE UPDATED]`
