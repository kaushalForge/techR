import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
function Qnas(props) {
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [responsive, setResponsive] = useState();
  useEffect(() => {
    setResponsive(props.data);
  }, []);
  const queries = [
    {
      qns: "Best Phones of 2024",
      ans: [
        "Iphone 15 Pro Max",
        "Samsung Galaxy S24 Ultra",
        "Xiaomi 13 Ultra",
        "Google Pixel 9 Pro",
        "Sony Xperia 1 VI",
        "One Plus 12",
        "Oppo Find X6 Pro",
        "Asus ROG Phone 7",
        "Huawei Mate 60 Pro",
        "Motorola Edge 40 Pro",
      ],
    },
    {
      qns: "Best laptops of 2024",
      ans: [
        "Apple MacBook Pro",
        "Dell XPS 15",
        "ASUS ROG Zephyrus G14",
        "HP Spectre X360",
        "Acer Swift 3",
        "ROG Strix G18",
        "Lenovo LOQ 15",
        "Acer Nitro V",
        "HP Victus 15",
      ],
    },
    {
      qns: "Best tablets of 2024",
      ans: [
        "Apple iPad Pro",
        "Apple iPad Air",
        "Samsung Galaxy Tab S9+",
        "Microsoft Surface Pro 9",
        "Lenovo Tab P12 Pro",
        "Amazon Fire HD 11",
        "Apple iPad Mini",
        "Huawei MatePad Pro",
        "Samsung Galaxy Tab A9",
      ],
    },
    {
      qns: "Most sold of 2024",
      ans: [
        "iPhone 15 Pro Max",
        "Galaxy S24 Ultra",
        "Galaxy A54 5G",
        "Lenovo’s ThinkPad X1",
        "HP Envy x360",
        "Apple MacBook Air (M2)",
        "Asus ROG Zephyrus G14",
        "Acer Aspire 5",
        "iPad Pro (M2)",
        "Samsung Galaxy Tab S9",
        "Apple iPad Air (M2)",
      ],
    },
    {
      qns: "Latest Tech Innovations",
      ans: [
        "AI Models",
        "Quantum Computing",
        "Foldables and Flipables",
        "Bandwidth Upgrade",
        "Augmented Reality (AR)",
        "Advanced Robotics",
        "Virtual Reality (VR)",
        "Autonomous Vehicles",
        "Metaverse Development",
        "Robots",
      ],
    },
    {
      qns: "Future Tech Predictions",
      ans: [
        "Powerful Chipsets",
        "Offline AI",
        "Enhanced Performance",
        "High AI Range",
      ],
    },
  ];

  const toggleAnswer = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  return (
    <>
      {responsive === "laptop" && (
        <div className={`hidden lg:flex flex-col w-auto px-4 py-6 rounded-lg`}>
          {queries.map((item, index) => (
            <div
              key={index}
              className="w-full p-2 mb-2 cursor-pointer text-[#003] text-lg md:text-xl font-semibold tracking-tighter"
              onClick={() => toggleAnswer(index)}
            >
              <div className="rounded-lg w-auto border-2 border-stone-500 bg-zinc-400/60 px-4 py-2 text-center">
                {item.qns}
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height: visibleIndex === index ? "auto" : 0,
                }}
                transition={{ duration: 0.2 }}
                className={`${
                  visibleIndex === index ? "block" : "hidden"
                } bg-[#232F3E]/10 rounded-b-xl text-black`}
              >
                <div className="flex flex-col items-center justify-center rounded-b-xl">
                  {item.ans.map((inneritem, innerindex) => (
                    <div
                      key={innerindex}
                      className="my-1 text-[18px] font-semibold"
                    >
                      {inneritem}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      )}
      {responsive === "phone" && (
        <div
          className={`sm:hidden flex flex-col items-center justify-center px-4 py-6 rounded-lg w-full`}
        >
          {queries.map((item, index) => (
            <div
              key={index}
              className="w-[80%] p-2 mb-2 cursor-pointer text-[#003] font-semibold items-center justify-center"
              onClick={() => toggleAnswer(index)}
            >
              <div className="rounded-lg w-auto border-2 border-stone-500 bg-zinc-400/60 px-4 py-2 text-center text-sm">
                {item.qns}
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height: visibleIndex === index ? "auto" : 0,
                }}
                transition={{ duration: 0.2 }}
                className={`${
                  visibleIndex === index ? "block" : "hidden"
                } bg-[#232F3E]/10 rounded-b-xl text-black`}
              >
                <div className="flex flex-col items-center justify-center rounded-b-xl">
                  {item.ans.map((inneritem, innerindex) => (
                    <div
                      key={innerindex}
                      className={`my-1 text-[12px] font-semibold ${
                        innerindex < item.ans.length - 1
                          ? "border-b-2 border-black/80"
                          : "border-b-0"
                      } w-full text-center`}
                    >
                      {inneritem}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Qnas;
