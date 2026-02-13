"use client";

import {
  useAccount,
  useConnect,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from "wagmi";
import { injected } from "wagmi/connectors";
import {
  Loader2,
  CheckCircle2,
  Stamp,
  Wallet,
  AlertTriangle,
} from "lucide-react";

// 1. YOUR DEPLOYED CONTRACT ADDRESS (BNB Testnet)
const CONTRACT_ADDRESS = "0x51868Fd46910adb4772Ef42CC7D8e426bebCA13e";
const TARGET_CHAIN_ID = 97; // BNB Smart Chain Testnet ID

// 2. THE ABI (Interface to talk to the contract)
const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "_status", type: "string" },
      { internalType: "string", name: "_score", type: "string" },
      { internalType: "string", name: "_roast", type: "string" },
    ],
    name: "mintDiagnosis",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

interface MintButtonProps {
  status: string;
  score: number;
  roast: string;
}

export function MintButton({ status, score, roast }: MintButtonProps) {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { connect, isPending: isConnecting } = useConnect();
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleConnect = () => {
    connect({ connector: injected() });
  };

  const handleMint = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "mintDiagnosis",
      args: [status, score.toString(), roast],
    });
  };

  const handleSwitch = () => {
    switchChain({ chainId: TARGET_CHAIN_ID });
  };

  // Case 1: Not Connected -> Show Connect Button
  if (!isConnected) {
    return (
      <div className="flex justify-center py-6">
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full max-w-md flex items-center justify-center gap-3 bg-[#F0B90B] hover:bg-[#d9a506] text-black text-sm font-black uppercase tracking-widest py-4 px-6 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(240,185,11,0.3)] cursor-pointer"
        >
          {isConnecting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Wallet className="w-4 h-4" />
          )}
          {isConnecting ? "CONNECTING..." : "CONNECT WALLET TO MINT"}
        </button>
      </div>
    );
  }

  // Case 2: Wrong Network -> Show Switch Button
  if (chainId !== TARGET_CHAIN_ID) {
    return (
      <div className="flex justify-center">
        <button
          onClick={handleSwitch}
          className="w-full max-w-md bg-red-600 hover:bg-red-700 text-white text-sm font-black uppercase tracking-widest py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer"
        >
          <AlertTriangle className="w-4 h-4" />
          WRONG NETWORK (SWITCH TO BNB)
        </button>
      </div>
    );
  }

  // Case 3: Successfully Minted -> Show NFT Visual Proof
  if (isSuccess && hash) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-md p-6 bg-green-500/10 border border-green-500/40 rounded-xl flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://i.imgur.com/3PXR3nD.jpeg"
            alt="Wagmi Clinic Soulbound Diagnosis NFT"
            className="h-[150px] w-auto rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] object-cover"
          />
          <div className="flex items-center gap-2 text-green-500 font-bold text-base">
            <CheckCircle2 className="w-5 h-5" />
            DIAGNOSIS MINTED
          </div>
          <p className="text-xs text-slate-400 font-mono text-center">
            This permanent record is now in your wallet.
          </p>
          <a
            href={`https://testnet.bscscan.com/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-green-400 hover:text-green-300 underline underline-offset-4 font-mono cursor-pointer"
          >
            View on BscScan →
          </a>
        </div>
      </div>
    );
  }

  // Case 4: Ready to Mint (Correct Network)
  return (
    <div className="flex justify-center">
      <button
        onClick={handleMint}
        disabled={isPending || isConfirming}
        className="w-full max-w-md group relative overflow-hidden bg-[#F0B90B] hover:bg-[#d9a506] text-black text-sm font-black uppercase tracking-widest py-4 px-6 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(240,185,11,0.3)] hover:shadow-[0_0_40px_rgba(240,185,11,0.5)] cursor-pointer"
      >
        <div className="relative z-10 flex items-center justify-center gap-3">
          {isPending || isConfirming ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {isPending ? "CONFIRM IN WALLET..." : "MINTING TO BLOCKCHAIN..."}
            </>
          ) : (
            <>
              <Stamp className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              MINT SOULBOUND DIAGNOSIS
            </>
          )}
        </div>

        {/* Cool Shine Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
      </button>
    </div>
  );
}
