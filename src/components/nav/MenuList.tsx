import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { navItems } from "../utils/constants";

const MenuList = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.ul className="flex md:flex-row flex-col gap-10">
      {navItems.map((item, id) => (
        <motion.li
          animate={open ? "open" : "closed"}
          onMouseEnter={() => setOpen((pv) => !pv)}
          onMouseLeave={() => setOpen((pv) => !pv)}
          className=" group "
          key={id}
        >
          <Link
            href={item.link}
            className="justify-center group flex flex-col items-center  relative"
          >
            <p>{item.text}</p>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
};
export default MenuList;
