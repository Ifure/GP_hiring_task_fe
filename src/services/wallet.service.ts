import { ethers } from "ethers";

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface IMetaMaskData {
  address: any;
  balance: string;
  chainId: string;
  network: string;
}

export const connectToMetaMask = async (): Promise<
  IMetaMaskData | undefined
> => {
  const ethereum = window.ethereum;
  if (!ethereum) {
    alert("MetaMask is not installed");
    return;
  }

  if (typeof ethereum !== "undefined") {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      const provider = new ethers.BrowserProvider(ethereum);
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();
      const data: IMetaMaskData = {
        address,
        balance: ethers.formatEther(balance),
        chainId: network.chainId.toString(),
        network: network.name,
      };
      return data;
    } catch (error: Error | any) {
      alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
    }
  } else {
    alert("MetaMask not installed");
  }
};
