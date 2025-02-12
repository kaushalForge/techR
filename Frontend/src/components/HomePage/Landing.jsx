import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import CircularLoader from "../../CircularLoader";
import TopTwo from "./TopTwo";
import { CiMobile3 } from "react-icons/ci";
import { LiaLaptopSolid } from "react-icons/lia";
import { FaTabletAlt } from "react-icons/fa";
// import samsumgtab from "../../images/galaxytabs9ultra.jpg";
// import acer from "../../images/acernitrov15.png";
// import Huwai from "../../images/huaweimatext.jpg";
// import asus from "../../images/Asus-ROG-Zephyrus-G14-image.jpg";
import axios from "axios";
import { useQuery } from "react-query";
const filterProducts = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
function Landing() {
  const latestURL = import.meta.env.VITE_LATEST_URL;
  const mostpopularURL = import.meta.env.VITE_MOSTPOPULAR_URL;
  const mostsoldURL = import.meta.env.VITE_MOSTSOLD_URL;
  const budgetURL = import.meta.env.VITE_BUDGET_URL;
  const midrangeURL = import.meta.env.VITE_MIDRANGE_URL;
  const flagshipURL = import.meta.env.VITE_FLAGSHIP_URL;
  const recommendedURL = import.meta.env.VITE_RECOMMENDED_URL;

  const popular_items = [
    {
      name: "Asus ROG Zephyrus G14",
      image:
        "https://res.cloudinary.com/dsvlevzds/image/upload/v1728586084/dh2saozzij8dm8bhddsf.png",
      link: "/laptop/asusrogzephyrusg14",
    },
    {
      name: "Acer Nitro V15",
      image:
        "https://res.cloudinary.com/dsvlevzds/image/upload/v1727536629/vfsffx0jlxn1eh4qvxvz.jpg",
      link: "/laptop/acernitrov15",
    },
    {
      name: "Huawei Mate XT",
      image:
        "https://res.cloudinary.com/dsvlevzds/image/upload/v1728628332/bpo1nzdco7jnexyipug4.jpg",
      link: "/phone/huaweimatext",
    },
    {
      name: "Galaxy Tab S9 Ultra",
      image:
        "https://res.cloudinary.com/dsvlevzds/image/upload/v1727536919/qghddgp30litpw2xrnj9.jpg",
      link: "/tablet/galaxytabs9ultra",
    },
  ];

  const {
    isLoading: loadingLatest,
    data: latest = [],
    latestisError,
    latestError,
  } = useQuery(["latest", latestURL], () => filterProducts(latestURL), {
    staleTime: 1000 * 60 * 5,
  });

  const {
    isLoading: loadingMostpopular,
    data: mostpopular = [],
    mostpopularisError,
    mostpopularError,
  } = useQuery(
    ["mostpopular", mostpopularURL],
    () => filterProducts(mostpopularURL),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const {
    isLoading: loadingMostsold,
    data: mostsold = [],
    mostsoldisError,
    mostsoldError,
  } = useQuery(["mostsold", mostsoldURL], () => filterProducts(mostsoldURL), {
    staleTime: 1000 * 60 * 5,
  });

  const {
    isLoading: loadingBudget,
    data: budget = [],
    budgetisError,
    budgetError,
  } = useQuery(["budget", budgetURL], () => filterProducts(budgetURL), {
    staleTime: 1000 * 60 * 5,
  });

  const {
    isLoading: loadingMidrange,
    data: midrange = [],
    midrangeisError,
    midrangeError,
  } = useQuery(["midrange", midrangeURL], () => filterProducts(midrangeURL), {
    staleTime: 1000 * 60 * 5,
  });

  const {
    isLoading: loadingFlagship,
    data: flagship = [],
    flagshipisError,
    flagshipError,
  } = useQuery(["flagship", flagshipURL], () => filterProducts(flagshipURL), {
    staleTime: 1000 * 60 * 5,
  });

  const {
    isLoading: loadingRecommended,
    data: recommended = [],
    recommendedisError,
    recommendedError,
  } = useQuery(
    ["recommended", recommendedURL],
    () => filterProducts(recommendedURL),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  let isLoading =
    loadingLatest ||
    loadingMostpopular ||
    loadingMostsold ||
    loadingBudget ||
    loadingMidrange ||
    loadingFlagship ||
    loadingRecommended;

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
  }

  return (
    <HelmetProvider>
      <div className="flex flex-col items-center w-full">
        <Helmet>
          <title>TechR - Latest Tech News Insights, Reviews and Price</title>
        </Helmet>
        <TopTwo />
        <div className="h-full min-w-full sm:min-w-0 w-auto md:max-w-[1200px]">
          <div className="lg:min-w-[1200px] lg:max-w-[1200px]">
            <h1 className="text-center text-2xl font-bold tracking-wide">
              Distinguished Picks
            </h1>
            <div className="min-w-full w-full flex flex-wrap border-2 border-stone-600 mt-2">
              <div className="flex-1 min-w-0 w-full md:w-1/3 border-r-2 border-black p-2 text-center hover:bg-sky-600/30 active:bg-sky-600/40 overflow-hidden">
                <Link
                  to="/phone"
                  className="h-full items-center flex justify-center w-auto p-2 text-black"
                >
                  <div className="flex flex-col items-center justify-center gap-4 text-[#232F3E]">
                    <CiMobile3 className="text-3xl scale-125 md:scale-150" />
                    <h1 className="text-xs md:text-sm">Phones</h1>
                  </div>
                </Link>
              </div>

              <div className="flex-1 min-w-0 w-full md:w-1/3 border-r-2 border-black p-2 text-center hover:bg-sky-600/30 active:bg-sky-600/40 overflow-hidden">
                <Link
                  to="/laptop"
                  className="h-full items-center flex justify-center w-auto p-2 text-black"
                >
                  <div className="flex flex-col items-center justify-center gap-4 text-[#232F3E]">
                    <LiaLaptopSolid className="text-3xl scale-125 md:scale-150" />
                    <h1 className="text-xs md:text-sm">Laptops</h1>
                  </div>
                </Link>
              </div>

              <div className="flex-1 min-w-0 w-full md:w-1/3 p-2 text-center hover:bg-sky-600/30 active:bg-sky-600/40 overflow-hidden">
                <Link
                  to="/tablet"
                  className="h-full items-center flex justify-center w-auto p-2 text-black"
                >
                  <div className="flex flex-col items-center justify-center gap-4 text-[#232F3E]">
                    <FaTabletAlt className="text-3xl scale-125 md:scale-150" />
                    <h1 className="text-xs md:text-sm">Tablets</h1>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 mt-10">
              <div className="text-center text-2xl font-bold tracking-wide">
                Top Deals
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 relative h-full w-full gap-1">
                {popular_items.map((item, index) => (
                  <div key={index} className="relative w-full overflow-hidden">
                    <Link to={item.link}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="border-b-2 border-white/70 object-cover h-[160px] md:h-[240px] lg:h-[300px] w-full bg-black border-r-2 border-white hover:scale-105 duration-200 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute text-center bg-black border-white border-t-2 border-b-2 text-[#00FFA3] w-full bottom-0 h-auto p-2 mx-auto left-0 right-0">
                        {item.name}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {!isLoading ? (
            <div className="h-auto w-full">
              <div className="h-auto w-full">
                <div className="container mx-auto px-4 py-8 max-w-[1120px]">
                  {/* for the newly launched change item.popularity to item.isNew */}
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="text-md lg:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                      Newly Launched
                    </h1>
                    <div className="flex items-center justify-center gap-6 flex-col">
                      {latest.slice(0, 4).map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="border-2 border-[#79d1ec] rounded-xl overflow-hidden p-2 md:flex flex-row w-full"
                          >
                            <Link
                              to={`/${item.productType}/${item.name
                                .toLowerCase()
                                .split(" ")
                                .join("")}`}
                              className="outline-none"
                            >
                              <div className="md:flex items-center justify-center gap-2">
                                <div className="h-auto w-auto">
                                  <motion.div
                                    initial={{ y: 0 }}
                                    animate={{ y: -2 }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                    }}
                                    className="w-auto flex items-center justify-center bg-cover bg-center"
                                  >
                                    <motion.div
                                      whileHover={{
                                        scale: 1.02,
                                      }}
                                    >
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-52 md:w-96 md:h-72 object-contain object-center"
                                        loading="lazy"
                                      />
                                    </motion.div>
                                  </motion.div>
                                </div>
                                <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                  <h2 className="underline-animations text-xl text-black text-center font-extrabold">
                                    {item.name}
                                  </h2>
                                  <p className="text-stone-600 border-[1px] border-stone-600/30 p-2 rounded-xl break-words text-center">
                                    {(item.blog &&
                                      truncateText(item.blog, 30)) ||
                                      "No description available"}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget device showcase */}
                  <div className="bg-[#F5F5F5] rounded-md lg:rounded-xl w-full h-auto flex items-center justify-center flex-col mt-20">
                    <h1 className="bg-black text-[#FFA500] rounded-md p-1 text-center w-auto text-[18px] md:text-xl whitespace-nowrap mt-4">
                      Check out the Budget devices
                    </h1>
                    <div className="flex items-center justify-evenly gap-2 w-full p-4 flex-wrap">
                      {budget.slice(0, 6).map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center flex-col gap-1"
                        >
                          <Link
                            to={`/${item.productType}/${item.name
                              .toLowerCase()
                              .split(" ")
                              .join("")}`}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-32 w-32 md:h-64 md:w-80 object-contain object-center px-4 border-2 border-[#0006] rounded-xl"
                              loading="lazy"
                            />
                            <h1 className="text-center mt-2">
                              Price:{item.price}
                            </h1>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* for most sale of this year change item.popularity to item.isMostSold */}
                  <div className="flex flex-col items-center justify-center mt-20">
                    <h1 className="text-md lg:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                      Most Sold of {new Date().getFullYear()}
                    </h1>
                    <div className="flex items-center justify-center gap-6 flex-col">
                      {mostsold.slice(0, 4).map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="border-2 border-[#f1cb69] rounded-xl overflow-hidden p-2 md:flex flex-row w-full"
                          >
                            <Link
                              to={`/${item.productType}/${item.name
                                .toLowerCase()
                                .split(" ")
                                .join("")}`}
                              className="outline-none"
                            >
                              <div className="md:flex items-center justify-center gap-2">
                                <div className="h-auto w-auto">
                                  <motion.div
                                    initial={{ y: 0 }}
                                    animate={{ y: -2 }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                    }}
                                    className="w-auto flex items-center justify-center bg-cover bg-center"
                                  >
                                    <motion.div
                                      whileHover={{
                                        scale: 1.02,
                                      }}
                                    >
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-52 md:w-96 md:h-72 object-contain object-center"
                                        loading="lazy"
                                      />
                                    </motion.div>
                                  </motion.div>
                                </div>
                                <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                  <h2 className="underline-animations text-xl text-black text-center font-extrabold">
                                    {item.name}
                                  </h2>
                                  <p className="text-stone-600 border-[1px] border-stone-600/30 p-2 rounded-xl break-words text-center">
                                    {(item.blog &&
                                      truncateText(item.blog, 30)) ||
                                      "No description available"}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Premium midrange device showcase */}
                  <div className="bg-[#F5F5F5] rounded-md lg:rounded-xl w-full h-auto flex items-center justify-center flex-col mt-20">
                    <h1 className="bg-black text-[#FFA500] rounded-md p-1 text-center w-auto text-[18px] md:text-xl whitespace-nowrap mt-4">
                      Check out the premium midrange devices
                    </h1>
                    <div className="flex items-center justify-evenly gap-2 w-full p-4 flex-wrap">
                      {midrange.slice(0, 6).map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center flex-col gap-1"
                        >
                          <Link
                            to={`/${item.productType}/${item.name
                              .toLowerCase()
                              .split(" ")
                              .join("")}`}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-32 w-32 md:h-64 md:w-80 object-contain object-center px-4 border-2 border-[#0006] rounded-xl"
                              loading="lazy"
                            />
                            <h1 className="text-center mt-2">
                              Price:{item.price}
                            </h1>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* for most popular it is perfect item.popularity keep as it is */}
                  <div className="flex flex-col items-center justify-center mt-20">
                    <h1 className="text-md lg:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                      Most Popular
                    </h1>
                    <div className="flex items-center justify-center gap-6 flex-col">
                      {mostpopular.slice(0, 4).map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="border-2 border-[#77bffa] rounded-xl overflow-hidden p-2 md:flex flex-row w-full"
                          >
                            <Link
                              to={`/${item.productType}/${item.name
                                .toLowerCase()
                                .split(" ")
                                .join("")}`}
                              className="outline-none"
                            >
                              <div className="md:flex items-center justify-center gap-2">
                                <div className="h-auto w-auto">
                                  <motion.div
                                    initial={{ y: 0 }}
                                    animate={{ y: -2 }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                    }}
                                    className="w-auto flex items-center justify-center bg-cover bg-center"
                                  >
                                    <motion.div
                                      whileHover={{
                                        scale: 1.02,
                                      }}
                                    >
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-52 md:w-96 md:h-72 object-contain object-center"
                                        loading="lazy"
                                      />
                                    </motion.div>
                                  </motion.div>
                                </div>
                                <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                  <h2 className="underline-animations text-xl text-black text-center font-extrabold">
                                    {item.name}
                                  </h2>
                                  <p className="text-stone-600 border-[1px] border-stone-600/30 p-2 rounded-xl break-words text-center">
                                    {(item.blog &&
                                      truncateText(item.blog, 30)) ||
                                      "No description available"}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* flagship device showcase */}
                  <div className="bg-[#F5F5F5] rounded-md lg:rounded-xl w-full h-auto flex items-center justify-center flex-col mt-20">
                    <h1 className="bg-black text-[#FFA500] rounded-md p-1 text-center w-auto text-[18px] md:text-xl whitespace-nowrap mt-4">
                      Flagship devices
                    </h1>
                    <div className="flex items-center justify-evenly gap-2 w-full p-4 flex-wrap">
                      {flagship.slice(0, 6).map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center flex-col gap-1"
                        >
                          <Link
                            to={`/${item.productType}/${item.name
                              .toLowerCase()
                              .split(" ")
                              .join("")}`}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-32 w-32 md:h-64 md:w-80 object-contain object-center px-4 border-2 border-[#0006] rounded-xl"
                              loading="lazy"
                            />
                            <h1 className="text-center mt-2">
                              Price:{item.price}
                            </h1>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* for recommended product change item.popularity to recommended */}
                  <div className="flex flex-col items-center justify-center mt-20">
                    <h1 className="text-md lg:text-3xl font-bold bg-black p-2 rounded-md text-[#FFA500] mb-2">
                      Recommended for you
                    </h1>
                    <div className="flex items-center justify-center gap-6 flex-col">
                      {recommended.slice(0, 4).map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="border-2 border-[#d28bee] rounded-xl overflow-hidden p-2 md:flex flex-row w-full"
                          >
                            <Link
                              to={`/${item.productType}/${item.name
                                .toLowerCase()
                                .split(" ")
                                .join("")}`}
                              className="outline-none"
                            >
                              <div className="md:flex items-center justify-center gap-2">
                                <div className="h-auto w-auto">
                                  <motion.div
                                    initial={{ y: 0 }}
                                    animate={{ y: -2 }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                    }}
                                    className="w-auto flex items-center justify-center bg-cover bg-center"
                                  >
                                    <motion.div
                                      whileHover={{
                                        scale: 1.02,
                                      }}
                                    >
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-52 md:w-96 md:h-72 object-contain object-center"
                                        loading="lazy"
                                      />
                                    </motion.div>
                                  </motion.div>
                                </div>
                                <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
                                  <h2 className="underline-animations text-xl text-black text-center font-extrabold">
                                    {item.name}
                                  </h2>
                                  <p className="text-stone-600 border-[1px] border-stone-600/30 p-2 rounded-xl break-words text-center">
                                    {(item.blog &&
                                      truncateText(item.blog, 30)) ||
                                      "No description available"}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="h-screen w-full text-xl"
            >
              <CircularLoader />
            </motion.div>
          )}
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Landing;
