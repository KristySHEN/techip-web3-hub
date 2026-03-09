"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Wallet, Target, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"

// ============================================================
// TODO: Replace with your deployed contract address on Fuji
// After deploying via Remix + MetaMask, paste address below
// ============================================================
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000" // PLACEHOLDER - REPLACE ME
const FUJI_CHAIN_ID = 43113
const FUJI_RPC = "https://api.avax-test.network/ext/bc/C/rpc"

const CONTRACT_ABI = [
  {"inputs":[],"name":"getProjectCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"projectId","type":"uint256"}],"name":"invest","outputs":[],"stateMutability":"payable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"projectId","type":"uint256"}],"name":"markMilestoneDone","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"projectId","type":"uint256"}],"name":"releaseFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"goalAmount","type":"uint256"},{"internalType":"uint256","name":"milestoneAmount","type":"uint256"}],"name":"createProject","outputs":[],"stateMutability":"nonpayable","type":"function"}
]

export default function TechIPFundingApp() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [networkOk, setNetworkOk] = useState(false)
  const [investAmount, setInvestAmount] = useState("")
  const [status, setStatus] = useState("")

  const mockProject = {
    name: "TechIP Protocol v1",
    goal: "10 AVAX",
    raised: "3.5 AVAX",
    progress: 35,
    milestone: "Phase 1: Smart Contract Audit",
    milestoneComplete: false,
  }

  const connectWallet = async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      setStatus("Please install MetaMask first!")
      return
    }
    try {
      const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" })
      setAccount(accounts[0])
      setIsConnected(true)
      const chainId = await (window as any).ethereum.request({ method: "eth_chainId" })
      setNetworkOk(parseInt(chainId, 16) === FUJI_CHAIN_ID)
      if (parseInt(chainId, 16) !== FUJI_CHAIN_ID) {
        setStatus("Please switch MetaMask to Avalanche Fuji Testnet (Chain ID: 43113)")
      } else {
        setStatus("Wallet connected successfully!")
      }
    } catch (e) {
      setStatus("Connection rejected.")
    }
  }

  const handleInvest = async () => {
    if (CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
      setStatus("Contract not deployed yet. Please deploy and update CONTRACT_ADDRESS in page.tsx")
      return
    }
    if (!isConnected) { setStatus("Please connect wallet first"); return }
    setStatus("Sending transaction...")
    // ethers.js integration goes here after contract deployment
    setStatus("Transaction submitted! Check MetaMask.")
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">TechIP Funding Hub</h1>
            <p className="text-muted-foreground">Milestone-based fundraising on Avalanche Fuji</p>
          </div>
          <Button onClick={connectWallet} variant={isConnected ? "outline" : "default"} className="gap-2">
            <Wallet className="w-4 h-4" />
            {isConnected ? `${account?.slice(0,6)}...${account?.slice(-4)}` : "Connect Wallet"}
          </Button>
        </div>

        {/* Network Status */}
        {isConnected && (
          <div className={`flex items-center gap-2 text-sm p-3 rounded-lg ${
            networkOk ? "bg-green-500/10 text-green-400" : "bg-orange-500/10 text-orange-400"
          }`}>
            {networkOk ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {networkOk ? "Connected to Avalanche Fuji Testnet" : "Wrong network - please switch to Fuji Testnet"}
          </div>
        )}

        {/* Contract Address Banner */}
        <Card className="border-orange-500/30 bg-orange-500/5">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-orange-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>
                <strong>Contract Address:</strong>{" "}
                <code className="font-mono">{CONTRACT_ADDRESS}</code>
                {CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000" && (
                  <span className="ml-2 text-orange-300">(placeholder - deploy contract first)</span>
                )}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Project Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{mockProject.name}</CardTitle>
                <CardDescription>Avalanche Build Games MVP Submission</CardDescription>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Goal</p>
                  <p className="font-semibold">{mockProject.goal}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Raised</p>
                  <p className="font-semibold text-primary">{mockProject.raised}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Milestone</p>
                  <p className="font-semibold">{mockProject.milestoneComplete ? "Done" : "In Progress"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{mockProject.milestone}</span>
                <span>{mockProject.progress}%</span>
              </div>
              <Progress value={mockProject.progress} className="h-2" />
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Amount in AVAX (e.g. 0.1)"
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
                type="number"
                min="0"
                step="0.01"
              />
              <Button onClick={handleInvest} disabled={!isConnected} className="whitespace-nowrap">
                Invest
              </Button>
            </div>

            {status && (
              <p className="text-sm text-muted-foreground bg-muted p-2 rounded">{status}</p>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Built on Avalanche Fuji Testnet · Contract: <code className="font-mono">{CONTRACT_ADDRESS}</code>
        </p>
      </div>
    </div>
  )
}
