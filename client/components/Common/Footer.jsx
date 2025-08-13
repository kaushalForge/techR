import React from "react";
import { motion } from "framer-motion";
function Footer() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <footer className="relative bottom-0 px-4 py-2 text-sm md:text-lg w-full h-auto bg-black text-gray-400 flex items-center justify-center">
          &copy; {new Date().getFullYear()} TechR. All rights reserved.
        </footer>
      </motion.div>
    </>
  );
}

export default Footer;
