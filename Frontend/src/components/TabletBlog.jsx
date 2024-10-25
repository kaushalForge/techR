import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CircularLoader from "../CircularLoader";
import SideBar from "./SideBar";
import MoreOptions from "./MoreOptions";

const fetchtargetTablets = async (targetURL, navigate) => {
  try {
    const response = await axios.get(targetURL);
    if (typeof response.data === "object" && response.data !== null) {
      return response.data;
    } else {
      navigate("/tablet");
      return;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response);
    } else {
      console.error("Error during request setup:", error.message);
    }
    navigate("/tablet");
    return;
  }
};

function TabletBlog() {
  const navigate = useNavigate();
  const targettabletURL = import.meta.env.VITE_TARGETTABLET_URL;
  const { itname } = useParams();
  const targetURL = `${targettabletURL}/${itname}`;
  const { data: targettablets = {}, isLoading: isLoadingTarget } = useQuery(
    ["targettablets", targetURL],
    () => fetchtargetTablets(targetURL, navigate),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const rows = [
    {
      ram: targettablets.ram1,
      storage: targettablets.storage1,
      price: targettablets.price1,
    },
    targettablets.ram2 && {
      ram: targettablets.ram2,
      storage: targettablets.storage2,
      price: targettablets.price2,
    },
    targettablets.ram3 && {
      ram: targettablets.ram3,
      storage: targettablets.storage3,
      price: targettablets.price3,
    },
  ]
    .filter(Boolean)
    .filter((row) => row.ram && row.storage && row.price);

  const InfoSection = ({ label, value }) => (
    <div className="flex justify-between items-start sm:items-center w-full bg-white p-2 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition duration-300 ease-in-out">
      <div className="flex items-center space-x-2">
        <span className="text-blue-500 text-base">
          <i className="fas fa-info-circle"></i>
        </span>
        <span className="text-sm font-semibold text-gray-800">{label}</span>
      </div>
      <span className="text-gray-900 text-sm text-right sm:text-left flex-1 sm:flex-none break-words sm:ml-4 mt-1 sm:mt-0">
        {value || <span className="text-gray-400 italic">Not available</span>}
      </span>
    </div>
  );
  return (
    <HelmetProvider>
      <div className="flex flex-col items-center justify-center p-4">
        <Helmet>
          <title>
            {targettablets.name
              ? `${targettablets.name} - Specifications`
              : "TechR"}
          </title>
          <meta
            name="description"
            content={
              targettablets.name
                ? `${targettablets.name} - Specifications`
                : "TechR"
            }
          />
        </Helmet>
        <div className="flex w-full max-w-screen-xl">
          <SideBar />
          {!isLoadingTarget ? (
            <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
              <h1
                className={`underline-animations text-2xl mt-2 inline-block w-auto font-semibold cursor-pointer ${
                  targettablets.mostpopular === "true"
                    ? "text-red-600"
                    : "text-gray-900"
                } transition duration-300 ease-in-out`}
              >
                {targettablets.name || "..."}
              </h1>
              <p className="text-gray-600 text-sm md:text-sm my-2">
                Explore the{" "}
                {targettablets.item_categorie === "flagship" ? "outstanding " : "great "}
                features of this tablet that make it a great choice for your
                needs.
              </p>
              <div className="flex justify-center py-4">
                {targettablets.image ? (
                  <img
                    src={targettablets.image}
                    alt={targettablets.name}
                    className="max-h-72 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <CircularLoader />
                )}
              </div>
              <div className="text-gray-700 text-sm font-semibold md:text-sm py-2 text-justify mb-4">
                {targettablets.blog || "..."}
              </div>
              <div className="py-4 border-t-2 w-full">
                <h2 className="underline-animations text-xl font-bold w-auto inline-block mb-3">
                  {targettablets.name + " "}Specifications
                </h2>

                <div className="flex flex-col space-y-2">
                  {[
                    { label: "Dimension", value: targettablets.dimension },
                    { label: "Build", value: targettablets.build },
                    { label: "Weight", value: targettablets.weight },
                    { label: "Type", value: targettablets.dtype },
                    { label: "Size", value: targettablets.size },
                    { label: "Resolution", value: targettablets.resolution },
                    { label: "Front Camera", value: targettablets.frontcamera },
                    { label: "Video", value: targettablets.video },
                    { label: "OS", value: targettablets.os },
                    { label: "Processor", value: targettablets.processor },
                    { label: "Graphics", value: targettablets.graphics },
                    { label: "Capacity", value: targettablets.capacity },
                    { label: "Charging", value: targettablets.charging },
                    { label: "Wi-Fi", value: targettablets.wifi },
                    { label: "Bluetooth", value: targettablets.bluetooth },
                    { label: "Type-C", value: targettablets.typec },
                    { label: "Audio Jack", value: targettablets.audiojack },
                  ].map((spec, index) => (
                    <InfoSection
                      key={index}
                      label={spec.label}
                      value={spec.value}
                    />
                  ))}
                </div>
              </div>

              {rows.length > 0 && (
                <div className="py-4">
                  <h2 className="underline-animations inline-block w-auto text-lg font-bold uppercase lg:text-xl">
                    Pricing
                  </h2>
                  <div className="overflow-hidden rounded-lg border border-gray-400 mt-2 shadow-lg">
                    <div className="flex bg-gray-800 text-white">
                      <div className="flex-1 text-center font-bold py-2 border-b border-gray-600">
                        S.N
                      </div>
                      <div className="flex-1 text-center font-bold py-2 border-b border-gray-600">
                        OPTIONS
                      </div>
                      <div className="flex-1 text-center font-bold py-2 border-b border-gray-600">
                        PRICE
                      </div>
                    </div>
                    {rows.map((row, index) => (
                      <div
                        key={index}
                        className="flex border-t border-gray-300 hover:bg-[#f7e2ff] transition-colors"
                      >
                        <div className="flex-1 text-center py-2">
                          {index + 1}
                        </div>
                        <div className="flex-1 text-center py-2">{`${row.ram}/${row.storage}`}</div>
                        <div className="flex-1 text-center py-2">
                          {row.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="py-4">
                {targettablets?.descriptions?.map((item, index) => (
                  <div key={index} className="py-2 flex flex-col gap-2">
                    {item.heading && (
                      <h1 className="text-lg md:text-xl font-bold">
                        {item.heading}
                      </h1>
                    )}
                    {item.detail && (
                      <p className="text-sm md:text-sm font-semibold text-justify">
                        {item.detail}
                      </p>
                    )}
                    {item.descriptionimage && (
                      <div className="py-2">
                        <img
                          src={item.descriptionimage}
                          alt={item.name}
                          className="max-h-400px w-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <MoreOptions />
              </div>
            </div>
          ) : (
            <div className="w-full h-screen flex items-center justify-center">
              <CircularLoader />
            </div>
          )}
        </div>
      </div>
    </HelmetProvider>
  );
}

export default TabletBlog;
