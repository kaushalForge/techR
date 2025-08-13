"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { CiMobile1 } from "react-icons/ci";
import { AiOutlineLaptop } from "react-icons/ai";
import { FaTabletScreenButton } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoInformationCircle } from "react-icons/io5";
import { LuSlidersHorizontal } from "react-icons/lu";
import { easeInOut, motion } from "framer-motion";
import News from "./News";

function Navbar() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const searchRef = useRef();

  const handleChange = () => {
    setSearch(searchRef.current.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchRef.current.value);
    console.log("Searching for:", searchRef.current.value);
  };

  useEffect(() => {
    const handleFocus = (event) => {
      if (event.key === "/") {
        event.preventDefault();
        const x = document.querySelector("#searchedText");
        x?.focus();
      }
    };

    window.addEventListener("keydown", handleFocus);
    return () => {
      window.removeEventListener("keydown", handleFocus);
    };
  }, []);

  return (
    <div>
      <div className="navbar w-full z-50 fixed flex md:justify-center justify-between items-center h-12 bg-gradient-to-l from-zinc-900 via-gray-800 to-stone-600">
        <div className="fixed w-full backdrop-blur-md max-w-[1200px] flex items-center justify-center flex-col h-12 bg-transparent">
          <div className="flex items-center justify-between md:justify-around px-4 md:px-0 w-full flex-wrap gap-1">
            <div className="logo flex items-center justify-center gap-1 text-2xl">
              {!show ? (
                <IoMenu
                  className="text-white md:hidden rounded-full h-8 w-8 border-2 border-stone-400 p-[2px] flex items-center justify-center"
                  onClick={() => setShow(!show)}
                />
              ) : (
                <RxCross2
                  className="text-white md:hidden rounded-full h-8 w-8 border-2 border-stone-400 p-[2px] flex items-center justify-center"
                  onClick={() => setShow(!show)}
                />
              )}
              <a className="outline-none" href="/">
                <div className="flex items-center justify-start">
                  {["T", "e", "c", "h", "R"].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: "50%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.04,
                        ease: easeInOut,
                      }}
                      className="text-white font-extrabold tracking-wider select-none"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </a>
            </div>
            <div className="links flex gap-8 items-center justify-evenly text-[#cfd3e0] font-semibold text-xl flex-wrap">
              {["Home", "Phones", "Laptops", "Tablets", "Filter", "About"].map(
                (item, index) => (
                  <motion.div key={index} className="underline-animation">
                    <Link
                      href={
                        index === 0
                          ? "/"
                          : `/${item.toLowerCase().split(" ").join("")}`
                      }
                      className="flex items-center justify-center gap-1 outline-none"
                    >
                      {index === 0 && <FaHome />}
                      {index === 1 && <CiMobile1 />}
                      {index === 2 && <AiOutlineLaptop />}
                      {index === 3 && <FaTabletScreenButton />}
                      {index === 4 && <LuSlidersHorizontal />}
                      {index === 5 && <IoInformationCircle />}
                      {item}
                    </Link>
                  </motion.div>
                )
              )}
            </div>
            <form>
              <div className="hidden md:flex searchbar items-center bg-gray-600 rounded-md border-2 border-black">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search"
                  className="px-2 py-1 rounded-md w-32 sm:w-auto bg-gray-600 outline-none text-white placeholder:text-white/80"
                  value={search}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch(e);
                  }}
                  id="searchedText"
                />

                <button
                  type="submit"
                  className="searchBtn h-8 w-8 flex items-center justify-center p-2 outline-none"
                >
                  <FaSearch className="text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <News />
      </div>

      {show && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 14,
            duration: 1,
          }}
          className="fixed w-full z-20 min-h-screen bg-black text-white p-4"
        >
          {/* Menu is hidden on small/medium screens, flex only on large and above */}
          <div className="hidden lg:flex flex-col gap-12 items-start justify-evenly mt-24">
            <div className="flex flex-col gap-4 items-start justify-center flex-1 text-[#cfd3e0] font-semibold text-lg flex-wrap">
              {["Home", "Phones", "Laptops", "Tablets", "Filter", "About"].map(
                (item, index) => (
                  <motion.div key={index}>
                    <Link
                      href={
                        index === 0
                          ? "/"
                          : `/${item.toLowerCase().split(" ").join("")}`
                      }
                      className="flex items-center justify-center gap-1 outline-none"
                      onClick={() => setShow(false)}
                    >
                      {index === 0 && <FaHome />}
                      {index === 1 && <CiMobile1 />}
                      {index === 2 && <AiOutlineLaptop />}
                      {index === 3 && <FaTabletScreenButton />}
                      {index === 4 && <LuSlidersHorizontal />}
                      {index === 5 && <IoInformationCircle />}
                      {item}
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </motion.div>
      )}
      <div className="pb-14"></div>
    </div>
  );
}

export default Navbar;
