import { getTitles } from "@/api/title/api.title";
import { useEffect, useState } from "react";
import { ITitleData, addTitle } from "@/api/title/api.title";
import { toast } from "react-toastify";
import { connectToMetaMask } from "@/services/wallet.service";

export const useTitle = () => {
  const [titles, setTitles] = useState<ITitleData[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState(null);
  const [accountBalance, setAccountBalance] = useState<string | null>(null);
  const [walletConnected, setwalletConnected] = useState(false);

  useEffect(() => {
    getAllTitles();
  }, []);

  const getAllTitles = async () => {
    const response = await getTitles();
    const deletedTitles = JSON.parse(
      localStorage.getItem("deletedTitles") || "[]"
    );

    if (response) {
      setTitles(
        response.filter((title) => !deletedTitles.includes(title.uuid))
      );
    } else {
      setTitles([]);
    }
  };

  const handleMetaMaskConnect = async () => {
    const data = await connectToMetaMask();
    if (data) {
      setWalletAddress(data.address);
      setAccountBalance(data.balance);
      setwalletConnected(true);
      localStorage.setItem("walletAddress", data.address);
      localStorage.setItem("walletConnected", JSON.stringify(true));
      localStorage.setItem("balance", data.balance);
    }
  };

  const addToTitles = async (title: string) => {
    if (!walletAddress) return toast.error("Please connect MetaMask");
    const data = await addTitle({ title });
    setTitles((prevState: ITitleData[]) => [
      ...(prevState || []),
      { title: data.title, createdAt: data.createdAt, uuid: data.uuid },
    ]);
    setNewTitle("");
  };

  const deleteTitle = (id: string) => {
    if (!id) return;
    const address = localStorage.getItem("walletAddress");
    if (!address) return toast.error("Please connect to MetaMask");
    const deletedTitles = JSON.parse(
      localStorage.getItem("deletedTitles") || "[]"
    );
    deletedTitles.push(id);
    localStorage.setItem("deletedTitles", JSON.stringify(deletedTitles));
    setTitles((prevTitles) => prevTitles.filter((title) => title.uuid !== id));
    toast.success("Title deleted successfully");
  };

  return {
    titles,
    newTitle,
    walletAddress,
    accountBalance,
    setNewTitle,
    addToTitles,
    getAllTitles,
    handleMetaMaskConnect,
    deleteTitle,
    walletConnected,
  };
};
