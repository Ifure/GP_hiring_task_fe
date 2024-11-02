"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { slideInFromLeft, slideInFromRight } from "../utils/motion";
import Button from "../button/Button";

export default function Hero() {
  return (
    <div className="h-screen w-full max-w-screen-xl mx-auto  flex justify-center items-center  md:mt-20">
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex md:flex-row flex-col justify-center items-center px-10 md:px-5 "
      >
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="  md:mt-0 flex flex-col   md:w-1/2  "
        >
          <p className="text-center text-gray-300 md:text-left md:leading-[60.48px] text-[23px] md:text-[48px] font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          </p>
          <motion.p
            variants={slideInFromLeft(0.7)}
            className="hidden md:block leading-[21.6px] text-gray-300  mt-[52px] font-primary mb-[24px] px-[60px] md:px-0 text-center md:text-start text-[18px] font-light"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur adipisicing elit.
          </motion.p>
          <motion.div
            variants={slideInFromLeft(0.9)}
            className="gap-10 hidden  md:flex  md:justify-normal justify-center items-center  "
          >
            <Link href="/login" className="">
              <Button title="Sign In " />
            </Link>
            <a href="" target="blank">
              <Button borderBtn title="Sig Up" />
            </a>
          </motion.div>
        </motion.div>
        <motion.div variants={slideInFromRight(1)} className="">
          <img src="/img/hero3.png" className="w-[800px] h-600 mt-10 md:mt-0" />
        </motion.div>
      </motion.div>
    </div>
  );
}
