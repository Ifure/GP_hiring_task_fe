"use client";

import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/button/Button";
import CustomInput from "@/components/input/CustomInput";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useTitleContext } from "@/contexts/TitleContextProvider";
import { ITitleData } from "@/api/title/api.title";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function TitleList() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      newTitle: "",
    },
  });
  const {
    titles,
    addToTitles,
    handleMetaMaskConnect,
    deleteTitle,
    walletConnected,
  } = useTitleContext();
  const [isWalletConnected, setIsWalletConnected] = useState(null);

  useEffect(() => {
    const connected = JSON.parse(
      localStorage.getItem("walletConnected") || "false"
    );
    setIsWalletConnected(connected);
  }, []);

  function submitNewTitle(data: any) {
    if (data.newTitle !== "") {
      addToTitles(data.newTitle);
    } else {
      toast.info("Enter a Valid Title");
    }
  }
  return (
    <div className="w-full ">
      <div className="mb-5 md:mb-10 flex justify-between items-center">
        <h6 className="hidden md:block font-bold text-blue-main text-[38px] ">
          Welcome
        </h6>
        <div className="hidden md:block w-2/5">
          {!walletConnected && !isWalletConnected && (
            <Button
              title="Connect to Metamask"
              onClick={handleMetaMaskConnect}
              icon="/img/metamask.png"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:mt-20 w-full justify-between items-center gap-2 md:gap-6">
        <div className=" w-full md:w-5/6 ">
          <CustomInput
            placeholder="Add title"
            name="newTitle"
            control={control}
            bg="#FFF"
          />
        </div>
        <div className="w-full md:w-1/6">
          <Button
            title="Add Title"
            size="sm"
            bgColor="#041E42"
            textColor="#FFF"
            onClick={handleSubmit(submitNewTitle)}
          />
        </div>
      </div>
      <div className="mt-10">
        <h4 className="font-bold text-gray-800 text-[28px]  pb-6">
          Titles List
        </h4>

        <div className="space-y-8  ">
          <AnimatePresence>
            {titles.map(({ title, uuid, createdAt }: ITitleData) => (
              <motion.div
                key={uuid}
                className="bg-[#fcf5f5dd] rounded-sm py-5 px-10 flex justify-between items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col gap-2">
                  <h6 className="text-gray-700 text-[16px] font-semibold capitalize">
                    {title}
                  </h6>
                  <p className="text-gray-500">
                    Created:{" "}
                    {createdAt
                      ? new Date(createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <button onClick={() => deleteTitle(uuid)}>
                  <Image src="/svg/bin.svg" alt="" width={30} height={30} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
