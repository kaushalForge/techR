import React from "react";
import { Link } from "react-router-dom";
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

const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-"); // ← shared helper

function SideBar() {
  const flagshipURL = import.meta.env.VITE_FLAGSHIP_URL;
  const midrangeURL = import.meta.env.VITE_MIDRANGE_URL;
  const budgetURL = import.meta.env.VITE_BUDGET_URL;

  const { isLoading: loadingBudget, data: budget = [] } = useQuery(
    ["budget", budgetURL],
    () => filterProducts(budgetURL),
    { staleTime: 1000 * 60 * 5 },
  );
  const { isLoading: loadingFlagship, data: flagship = [] } = useQuery(
    ["flagship", flagshipURL],
    () => filterProducts(flagshipURL),
    { staleTime: 1000 * 60 * 5 },
  );
  const { isLoading: loadingMidrange, data: midrange = [] } = useQuery(
    ["midrange", midrangeURL],
    () => filterProducts(midrangeURL),
    { staleTime: 1000 * 60 * 5 },
  );

  const isLoading = loadingBudget || loadingFlagship || loadingMidrange;

  const ProductItem = ({ item }) => (
    <div className="w-52 h-auto bg-white flex flex-col items-center justify-start border-4 border-black rounded-xl">
      <Link
        to={`/${item.productType}/${toSlug(item.name)}`}
        className="outline-none"
      >
        <img
          src={item.image}
          alt={item.name}
          className="rounded-t-lg w-full h-full object-contain object-top"
          loading="lazy"
        />
      </Link>
      <div className="w-full">
        <h1 className="w-full text-center border-t-2 border-black">
          {item.name}
        </h1>
        <h1 className="w-full text-center bg-black text-white rounded-b-lg">
          {item.price}
        </h1>
      </div>
    </div>
  );

  const Section = ({ title, items, height }) => (
    <div className="w-full md:flex mt-8 h-auto">
      <div className="h-auto">
        <h1 className="text-2xl text-center">{title}</h1>
        <div
          className={`hidescroller w-full pt-4 flex flex-col gap-8 items-center overflow-y-auto p-4 ${height}`}
        >
          {Array.isArray(items) &&
            items.map((item, index) => <ProductItem key={index} item={item} />)}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isLoading ? (
        <div className="hidden md:flex h-[500px] w-80 items-center justify-center">
          <CircularLoader />
        </div>
      ) : (
        <div className="hidden md:flex flex-col md:w-80 mt-2">
          <Section title="Flagship" items={flagship} height="h-[550px]" />
          <Section title="Midrange" items={midrange} height="h-[570px]" />
          <Section title="Budget" items={budget} height="h-[490px]" />
        </div>
      )}
    </>
  );
}

export default SideBar;
