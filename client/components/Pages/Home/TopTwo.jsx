"use client";

import React, { useState } from "react";
import Trending from "./Trending";
import { motion } from "framer-motion";

const Landing = () => {
  const hotDrop1 = {
    image:
      "https://res.cloudinary.com/dsvlevzds/image/upload/v1728104678/n1rtqevggzkw91opb0dw.avif",
    note: "iPhone 16 Pro Max delivers top display and performance",
    link: "/phone/iphone16promax",
  };
  const hotDrop2 = {
    image:
      "https://res.cloudinary.com/dsvlevzds/image/upload/v1731343195/fsju9euc7urdhtn638tx.jpg",
    note: "Samsung’s S25 Ultra promises cutting edge tech and flagship dominance.",
    link: "/phone/samsungs25ultra",
  };

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  return (
    <div className="h-auto text-white w-full max-w-[1300px] z-0">
      <section className="flex flex-col items-center justify-center text-center h-auto mt-8">
        <div>
          <Trending />
        </div>
        <div className="flex items-center justify-center w-auto md:w-full flex-col">
          <h2 className="stroke text-3xl md:text-3xl font-bold mb-1 text-center cursor-pointer">
            HOT DROP
          </h2>
        </div>
      </section>
      <section className="w-full md:px-8 flex items-center flex-col justify-center mt-2 md:mt-4">
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col md:flex-row items-center w-full md:h-80 justify-center gap-2 mb-12 flex-wrap relative">
            <div className="text-center w-full bg-no-repeat bg-center md:w-full relative">
              <a href={hotDrop1.link} className="outline-none w-auto">
                <div
                  onMouseEnter={() => setShow1(true)}
                  onMouseLeave={() => setShow1(false)}
                  className="flex items-center w-full justify-center h-auto md:h-auto md:w-auto flex-col relative"
                >
                  <div>
                    <img
                      src={hotDrop1.image || "Phone"}
                      alt="iPhone details"
                      className="mb-4 w-full h-full md:w-[800px] md:h-[300px] object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  {show1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="hidden lg:flex absolute left-80 top-32 justify-center w-full z-50">
                        {[
                          "i",
                          "P",
                          "h",
                          "o",
                          "n",
                          "e",
                          "16",
                          "P",
                          "r",
                          "o",
                          "M",
                          "a",
                          "x",
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: -10 }}
                            transition={{ duration: 0.2, delay: index * 0.01 }}
                            className="text-4xl text-[#00FFA3] mx-[1px]"
                          >
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </a>
              <div className="absolute text-sm font-semibold leading-3 tracking-tighter md:text-base bottom-4 md:bottom-[16px] w-full z-30 bg-black/60 text-white p-2">
                <h1>{hotDrop1.note}</h1>
              </div>
            </div>
          </div>
          <div className="hidden flex-col md:flex items-center w-full md:h-80 justify-center gap-2 mb-12 flex-wrap relative">
            <div className="text-center w-full md:w-full relative">
              <a href={hotDrop2.link} className="outline-none w-auto">
                <div
                  onMouseEnter={() => setShow2(true)}
                  onMouseLeave={() => setShow2(false)}
                  className="flex items-center w-full justify-center h-auto md:h-auto md:w-auto flex-col relative"
                >
                  <img
                    src={hotDrop2.image || "Phone"}
                    alt="Agni details"
                    className="mb-4 w-full h-full md:w-[800px] md:h-[300px] object-cover object-top"
                    loading="lazy"
                  />
                  {show2 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="hidden lg:flex absolute right-80 top-32 justify-center w-full z-50">
                        {[
                          "S",
                          "a",
                          "m",
                          "s",
                          "u",
                          "n",
                          "g",
                          "G",
                          "a",
                          "l",
                          "a",
                          "x",
                          "y",
                          "S",
                          "2",
                          "5",
                          "U",
                          "l",
                          "t",
                          "a",
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: -10 }}
                            transition={{ duration: 0.2, delay: index * 0.01 }}
                            className="text-4xl text-[#00FFA3] mx-[1px]"
                          >
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </a>
              <div className="absolute text-sm font-semibold leading-3 tracking-tighter md:text-base bottom-4 md:bottom-[16px] w-full z-30 bg-black/60 text-white p-2">
                <h1>{hotDrop2.note}</h1>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            zIndex: 20,
            color: "#ffffff",

            marginRight: "4px",
          }}
        >
          <span className="bg-black px-4 py-2 mr-2">Related:</span>
          <span className="text-blue-500 hover:text-red-500 cursor-pointer">
            Top Rated Laptops for College Students in 2025
          </span>
        </div>
      </section>
    </div>
  );
};

export default Landing;
