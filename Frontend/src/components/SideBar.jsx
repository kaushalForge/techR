import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import CircularLoader from "../CircularLoader";

// ✅ USE YOUR API CONFIG
import { fetchProducts, URLS } from "../config/api";

const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

function SideBar() {
  // ✅ use central URLs
  const { isLoading: loadingBudget, data: budget = [] } = useQuery(
    ["budget"],
    () => fetchProducts(URLS.budget),
    { staleTime: 1000 * 60 * 5 },
  );

  const { isLoading: loadingFlagship, data: flagship = [] } = useQuery(
    ["flagship"],
    () => fetchProducts(URLS.flagship),
    { staleTime: 1000 * 60 * 5 },
  );

  const { isLoading: loadingMidrange, data: midrange = [] } = useQuery(
    ["midrange"],
    () => fetchProducts(URLS.midrange),
    { staleTime: 1000 * 60 * 5 },
  );

  const isLoading = loadingBudget || loadingFlagship || loadingMidrange;

  // ✅ CRITICAL FIX (prevents your `.map` crash)
  const normalize = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.products)) return data.products;
    return [];
  };

  const ProductItem = ({ item }) => (
    <div className="w-52 bg-white flex flex-col items-center border-4 border-black rounded-xl">
      <Link
        to={`/${item.productType}/${toSlug(item.name)}`}
        className="outline-none"
      >
        <img
          src={item.image}
          alt={item.name}
          className="rounded-t-lg w-full h-40 object-contain"
          loading="lazy"
        />
      </Link>
      <div className="w-full">
        <h1 className="text-center border-t-2 border-black text-sm">
          {item.name}
        </h1>
        <h1 className="text-center bg-black text-white rounded-b-lg text-sm">
          {item.price || ""}
        </h1>
      </div>
    </div>
  );

  const Section = ({ title, items, height }) => {
    const safeItems = normalize(items);

    return (
      <div className="w-full md:flex mt-8">
        <div>
          <h1 className="text-2xl text-center">{title}</h1>
          <div
            className={`hidescroller w-full pt-4 flex flex-col gap-6 items-center overflow-y-auto p-4 ${height}`}
          >
            {safeItems.map((item, index) => (
              <ProductItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    );
  };

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
