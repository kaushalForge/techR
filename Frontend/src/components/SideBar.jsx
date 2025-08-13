import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import CircularLoader from "../CircularLoader";

const filterProducts = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
function SideBar() {
  const flagshipURL = import.meta.env.VITE_FLAGSHIP_URL;
  const midrangeURL = import.meta.env.VITE_MIDRANGE_URL;
  const budgetURL = import.meta.env.VITE_BUDGET_URL;

  const {
    isLoading: loadingBudget,
    data: budget = [],
    budgetisError,
    budgetError,
  } = useQuery(["budget", budgetURL], () => filterProducts(budgetURL), {
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
    isLoading: loadingMidrange,
    data: midrange = [],
    midrangeisError,
    midrangeError,
  } = useQuery(["midrange", midrangeURL], () => filterProducts(midrangeURL), {
    staleTime: 1000 * 60 * 5,
  });
  const isLoading = loadingBudget || loadingFlagship || loadingMidrange;
  return (
    <>
      {isLoading ? (
        <div className="hidden md:flex h-[500px] w-80 items-center justify-center">
          <CircularLoader />
        </div>
      ) : (
        <div className="hidden md:flex flex-col md:w-80 mt-2">
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
                        to={`/${item.productType}/${item.name
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
                        to={`/${item.productType}/${item.name
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
                        to={`/${item.productType}/${item.name
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
      )}
    </>
  );
}

export default SideBar;
