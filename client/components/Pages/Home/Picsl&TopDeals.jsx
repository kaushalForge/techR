import React from "react";
import { CiMobile3 } from "react-icons/ci";
import { LiaLaptopSolid } from "react-icons/lia";
import { FaTabletAlt } from "react-icons/fa";

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
const TopDeals = () => {
  return (
    <>
      <section className="lg:min-w-[1200px] lg:max-w-[1200px]">
        <h1 className="text-center text-2xl font-bold tracking-wide">
          Distinguished Picks
        </h1>
        <div className="min-w-full w-full flex flex-wrap border-2 border-stone-600 mt-2">
          <div className="flex-1 min-w-0 w-full md:w-1/3 border-r-2 border-black p-2 text-center hover:bg-sky-600/30 active:bg-sky-600/40 overflow-hidden">
            <a
              href="/phones"
              className="h-full items-center flex justify-center w-auto p-2 text-black"
            >
              <div className="flex flex-col items-center justify-center gap-4 text-[#232F3E]">
                <CiMobile3 className="text-3xl scale-125 md:scale-150" />
                <h1 className="text-xs md:text-sm">Phones</h1>
              </div>
            </a>
          </div>

          <div className="flex-1 min-w-0 w-full md:w-1/3 border-r-2 border-black p-2 text-center hover:bg-sky-600/30 active:bg-sky-600/40 overflow-hidden">
            <a
              href="/laptops"
              className="h-full items-center flex justify-center w-auto p-2 text-black"
            >
              <div className="flex flex-col items-center justify-center gap-4 text-[#232F3E]">
                <LiaLaptopSolid className="text-3xl scale-125 md:scale-150" />
                <h1 className="text-xs md:text-sm">Laptops</h1>
              </div>
            </a>
          </div>

          <div className="flex-1 min-w-0 w-full md:w-1/3 p-2 text-center hover:bg-sky-600/30 active:bg-sky-600/40 overflow-hidden">
            <a
              href="/tablets"
              className="h-full items-center flex justify-center w-auto p-2 text-black"
            >
              <div className="flex flex-col items-center justify-center gap-4 text-[#232F3E]">
                <FaTabletAlt className="text-3xl scale-125 md:scale-150" />
                <h1 className="text-xs md:text-sm">Tablets</h1>
              </div>
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 mt-10">
          <div className="text-center text-2xl font-bold tracking-wide">
            Top Deals
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 relative h-full w-full gap-1">
            {popular_items.map((item, index) => (
              <div key={index} className="relative w-full overflow-hidden">
                <a to={item.link}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="border-b-2 object-cover h-[160px] md:h-[240px] lg:h-[300px] w-full bg-black border-r-2 border-white hover:scale-105 duration-200 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute text-center bg-black border-white border-t-2 border-b-2 text-[#00FFA3] w-full bottom-0 h-auto p-2 mx-auto left-0 right-0">
                    {item.name}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TopDeals;
