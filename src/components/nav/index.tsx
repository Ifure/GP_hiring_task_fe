"use client";
import React, { useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import MenuList from "./MenuList";
import MobileLinks from "./MobileLinks";
import Button from "../button/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-screen max-w-screen fixed top-0 z-10 mb-20 bg-blue-main text-gray-100 shadow-md">
      <section className=" w-full max-w-screen-xl flex justify-between items-center mx-auto px-5 py-3 md:px-0 ">
        <Link className="flex items-center font-medium gap-3 w-1/3" href={"/"}>
          <Image src="/svg/logo.svg" alt={""} width={50} height={50} />
          <p className="text-[15px] md:text-[24px] font-bold">TITLY</p>
        </Link>
        <div className="hidden md:flex items-center  justify-center w-1/3">
          <MenuList />
        </div>
        <div className="ml-10 leading-[20.4px]  w-1/3  gap-4 hidden md:flex">
          <Link href="login" className="">
            <Button title="Sign In" />
          </Link>
          <Link href="register" className="">
            <Button title="Sign Up" borderBtn />
          </Link>
        </div>
        <div className="md:hidden">
          <Image
            onClick={() => setIsOpen(!isOpen)}
            src="/svg/menu-burger.svg"
            height={24}
            width={24}
            alt={""}
          />
        </div>
        <AnimatePresence>
          {isOpen && <MobileLinks setIsOpen={setIsOpen} isOpen={isOpen} />}
        </AnimatePresence>
      </section>
    </nav>
  );
}
