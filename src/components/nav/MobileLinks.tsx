import { motion } from "framer-motion";
import React, { useState } from "react";
import Link from "next/link";
import { containerVar, menuVariants, mobileMenuLinks } from "../utils/motion";
import { navItems } from "../utils/constants";
import Button from "../button/Button";

export default function MobileLinks({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toogleDopdown = (id: number) => {
    if (id === 1) {
      setOpenDropdown(!openDropdown);
    } else {
      setIsOpen(!isOpen);
    }
  };
  return (
    <motion.aside
      variants={menuVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed origin-top right-0 bottom-0 top-0 left-0  w-full max-w-screen overflow-x-hidden  h-screen  bg-white  text-black lg:hidden"
    >
      <div className="mt-20">
        <div className="flex justify-end pr-5">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-10 h-10 "
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="#BCC3DC"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <motion.ul
          variants={containerVar}
          initial="initial"
          animate="open"
          exit="initial"
          className=" flex  overflow-hidden flex-col relative "
        >
          {navItems.map((item, id) => (
            <motion.li
              variants={mobileMenuLinks}
              className="p-7 shadow-sm relative"
              key={id}
              onClick={() => toogleDopdown(id)}
            >
              <Link href={item.link}>
                <p>{item.text}</p>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        <div className="px-5 flex flex-col gap-10 mt-10">
          <Link href="login" className="">
            <Button title="Sign In" />
          </Link>
          <Link href="register" className="">
            <Button title="Sign Up" bgColor="#041E42" textColor="#FFF" />
          </Link>
        </div>
      </div>
    </motion.aside>
  );
}
