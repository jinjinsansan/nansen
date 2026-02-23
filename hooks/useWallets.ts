"use client";

import { useState } from "react";
import { WatchedWallet } from "@/types";
import { mockWallets } from "@/lib/data/mockData";

export function useWallets() {
  const [wallets, setWallets] = useState<WatchedWallet[]>(mockWallets);

  const toggleWallet = (id: string, active: boolean) => {
    setWallets((prev) => prev.map((w) => (w.id === id ? { ...w, isActive: active } : w)));
  };

  const deleteWallet = (id: string) => {
    setWallets((prev) => prev.filter((w) => w.id !== id));
  };

  const addWallet = (wallet: WatchedWallet) => {
    setWallets((prev) => [...prev, wallet]);
  };

  return { wallets, toggleWallet, deleteWallet, addWallet };
}
