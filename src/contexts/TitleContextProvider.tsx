"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { useTitle } from "@/app/hooks/useTitle";

const TitleContext = createContext<any>({});

export const TitleContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    titles,
    addToTitles,
    handleMetaMaskConnect,
    walletAddress,
    deleteTitle,
    accountBalance,
    walletConnected,
  } = useTitle();

  return (
    <TitleContext.Provider
      value={{
        titles,
        addToTitles,
        walletAddress,
        handleMetaMaskConnect,
        deleteTitle,
        accountBalance,
        walletConnected,
      }}
    >
      {children}
    </TitleContext.Provider>
  );
};

export const useTitleContext = () => useContext(TitleContext);
