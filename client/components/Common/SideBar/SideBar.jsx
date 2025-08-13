"use client";
import React from "react";
import Link from "next/link";

function SideBar({ flagship, midrange, budget }) {
  const isLoading = false;
  return (
    <div className="hidden md:flex flex-col md:w-80 mt-2">
      {/* Flagship Section */}
      <div className="w-full md:flex items-start justify-start mt-8 h-auto">
        <div className="h-auto">
          {!isLoading && <h1 className="text-2xl text-center">Flagship</h1>}
          <div className="hidescroller w-full pt-4 flex flex-col gap-8 items-center overflow-y-auto p-4 h-[550px]">
            {!isLoading &&
              Array.isArray(flagship) &&
              flagship.map((item, index) => (
                <div
                  key={index}
                  className="w-52 h-auto bg-white flex flex-col items-center justify-start border-4 border-black rounded-xl"
                >
                  <Link
                    href={`/${item.productType}/${item._id
                      .toLowerCase()
                      .replace(/\s+/g, "")}`}
                    className="outline-none"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-t-lg w-full h-full object-contain object-top outline-none"
                      loading="lazy"
                    />
                  </Link>
                  {flagship && (
                    <div className="w-full">
                      <h1 className="w-full text-center border-t-2 border-black">
                        {item.name}
                      </h1>
                      <h1 className="w-full text-center bg-black text-white rounded-b-lg">
                        {item.price}
                      </h1>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Midrange Section */}
      <div className="w-full md:flex mt-8 h-auto">
        <div className="h-auto">
          {!isLoading && <h1 className="text-2xl text-center">Midrange</h1>}
          <div className="hidescroller w-full pt-4 flex flex-col gap-8 items-center overflow-y-auto p-4 h-[570px]">
            {!isLoading &&
              Array.isArray(midrange) &&
              midrange.map((item, index) => (
                <div
                  key={index}
                  className="w-52 h-auto bg-white flex flex-col items-center justify-start border-4 border-black rounded-xl"
                >
                  <Link
                    href={`/${item.productType}/${item._id
                      .toLowerCase()
                      .replace(/\s+/g, "")}`}
                    className="outline-none"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-t-lg w-full h-full object-contain object-top"
                      loading="lazy"
                    />
                  </Link>
                  {midrange && (
                    <div className="w-full">
                      <h1 className="w-full text-center border-t-2 border-black">
                        {item.name}
                      </h1>
                      <h1 className="w-full text-center bg-black text-white rounded-b-lg">
                        {item.price}
                      </h1>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Budget Section */}
      <div className="w-full md:flex mt-8 h-auto">
        <div className="h-auto">
          {!isLoading && <h1 className="text-2xl text-center">Budget</h1>}
          <div className="hidescroller w-full pt-4 flex flex-col gap-8 items-center overflow-y-auto p-4 h-[490px]">
            {!isLoading &&
              Array.isArray(budget) &&
              budget.map((item, index) => (
                <div
                  key={index}
                  className="w-52 h-auto bg-white flex flex-col items-center justify-start border-4 border-black rounded-xl"
                >
                  <Link
                    href={`/${item.productType}/${item._id
                      .toLowerCase()
                      .replace(/\s+/g, "")}`}
                    className="outline-none"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-t-lg w-full h-full object-contain object-top"
                      loading="lazy"
                    />
                  </Link>
                  {budget && (
                    <div className="w-full">
                      <h1 className="w-full text-center border-t-2 border-black">
                        {item.name}
                      </h1>
                      <h1 className="w-full text-center bg-black text-white rounded-b-lg">
                        {item.price}
                      </h1>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
