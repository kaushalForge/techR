import React from "react";
// import CircularLoader from "../CircularLoader";
import Button from "../utils/Button";

// Utility function to fetch products
const filterProducts = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function MoreOptions() {
  const flagshipURL = import.meta.env.VITE_FLAGSHIP_URL;
  const midrangeURL = import.meta.env.VITE_MIDRANGE_URL;
  const budgetURL = import.meta.env.VITE_BUDGET_URL;

  const { isLoading: loadingBudget, data: budget = [] } = useQuery(
    ["budget", budgetURL],
    () => filterProducts(budgetURL),
    { staleTime: 1000 * 60 * 5 }
  );

  const { isLoading: loadingFlagship, data: flagship = [] } = useQuery(
    ["flagship", flagshipURL],
    () => filterProducts(flagshipURL),
    { staleTime: 1000 * 60 * 5 }
  );

  const { isLoading: loadingMidrange, data: midrange = [] } = useQuery(
    ["midrange", midrangeURL],
    () => filterProducts(midrangeURL),
    { staleTime: 1000 * 60 * 5 }
  );

  const isLoading = loadingBudget || loadingFlagship || loadingMidrange;

  const renderProductItems = (items) => {
    return items.slice(0, 4).map((item, index) => (
      <Link
        key={index}
        to={`/${item.productType}/${item.name
          .toLowerCase()
          .replace(/\s+/g, "")}`}
        className="block w-full outline-none"
      >
        <div
          key={index}
          className="flex flex-col items-center w-full sm:w-40 p-4 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          aria-label={`Product: ${item.name}`}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-32 h-32 object-contain mb-3 transition-opacity duration-300"
            loading="lazy"
          />
          <div className="text-center">
            <h1 className="text-sm font-medium text-gray-800 truncate">
              {item.name}
            </h1>
            <p className="text-lg text-black font-bold mt-1">{item.price}</p>
          </div>
        </div>
      </Link>
    ));
  };
  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {isLoading ? (
        <div className="flex h-64 w-full items-center justify-center">
          <CircularLoader />
        </div>
      ) : (
        <div className="space-y-10">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Discover Your Perfect Device
            </h2>
            <p className="text-md text-gray-600">
              Explore our diverse range of smartphones tailored to your needs.
            </p>
          </div>

          <div className="flex flex-col space-y-10">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                <Button text="Flagship Devices" />
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Experience cutting-edge technology with our flagship collection.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {renderProductItems(flagship)}
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                <Button text="Midrange Devices" />
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Get the best value with our midrange selection.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {renderProductItems(midrange)}
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                <Button text="Budget Devices" />
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Affordable options for every budget.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {renderProductItems(budget)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoreOptions;
