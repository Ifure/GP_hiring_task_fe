"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@/components/button/Button";
import { useAuth } from "@/app/hooks/useAuth";
import { useTitleContext } from "@/contexts/TitleContextProvider";

interface LocalWalletData {
  address: string | null;
  balance: string | null;
  isConnected: boolean;
}

export default function Sidebar() {
  const { logout } = useAuth();
  const { handleMetaMaskConnect, walletConnected, walletAddress, balance } =
    useTitleContext();

  const [localWalletData, setLocalWalletData] = useState<LocalWalletData>({
    address: null,
    balance: null,
    isConnected: false,
  });
  useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    const storedBalance = localStorage.getItem("balance");
    const connectedStatus = JSON.parse(
      localStorage.getItem("walletConnected") || "false"
    );

    setLocalWalletData({
      address: storedAddress,
      balance: storedBalance,
      isConnected: connectedStatus,
    });
  }, []);

  const handleLogout = () => {
    logout();
    setLocalWalletData({ address: null, balance: null, isConnected: false });
  };
  const copyWalletAddress = () => {
    if (walletAddress || localWalletData.address) {
      navigator.clipboard.writeText(walletAddress || localWalletData.address);
      toast.success("Copied!");
    } else {
    }
  };

  return (
    <aside className="border-r border-gray-900 shadow-lg h-full flex flex-col justify-between px-5 md:px-10 py-10 md:pt-20">
      <div>
        <Link
          href="/"
          className="flex items-center justify-end md:justify-center font-medium gap-3 w-full md:w-1/3"
        >
          <div className="hidden md:flex items-center gap-3">
            <Image src="/svg/logo.svg" alt="Logo" width={50} height={50} />
            <p className="text-[15px] md:text-[24px] font-bold">TITLY</p>
          </div>

          <div className="md:hidden">
            <div className="md:hidden">
              <div className="flex">
                {!walletConnected && !localWalletData.isConnected ? (
                  <Button
                    title="Connect to Metamask"
                    onClick={handleMetaMaskConnect}
                    icon="/img/metamask.png"
                  />
                ) : (
                  <Button
                    title="LOGOUT"
                    bgColor="#E3735E"
                    onClick={handleLogout}
                  />
                )}
              </div>
            </div>
          </div>
        </Link>

        <div className="mt-10 bg-[#1d418a40] px-5 md:px-10 gap-8 md:gap-10 py-3 rounded-xl">
          <h4 className="font-semibold text-[14px] md:text-[18px] text-white">
            Balance
          </h4>
          <h4 className="text-[24px] font-bold">
            ${balance || localWalletData.balance || "0.00"}
          </h4>
        </div>

        <div className="mt-10 bg-[#1d418a40] px-5 md:px-10 gap-8 md:gap-10 py-3 rounded-xl">
          <h4 className="font-semibold text-[18px] text-white">
            Wallet Address
          </h4>
          <div className="flex justify-between items-center">
            <p className="text-[14px] font-bold truncate">
              {walletAddress || localWalletData.address || "Not Connected"}
            </p>
            <button onClick={copyWalletAddress}>
              <Image
                src="/svg/copy.svg"
                alt="Copy icon"
                width={30}
                height={30}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:block" data-testid="logout-div">
        <Button
          title="LOGOUT"
          textColor="#FFF"
          bgColor="#FF2400"
          onClick={handleLogout}
          data-testid="logout-button"
        />
      </div>
    </aside>
  );
}
