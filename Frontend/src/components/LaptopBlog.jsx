import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { toast } from "react-toastify";
import CircularLoader from "../CircularLoader";
import SideBar from "./SideBar";
import MoreOptions from "./MoreOptions";

const fetchtargetLaptops = async (targetURL, navigate) => {
  try {
    const response = await axios.get(targetURL);
    if (typeof response.data === "object" && response.data !== null) {
      return response.data;
    } else {
      navigate("/laptop");
      return;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response);
    } else {
      console.error("Error during request setup:", error.message);
    }
    navigate("/laptop");
    return;
  }
};

function LaptopBlog() {
  const navigate = useNavigate();
  const targetlaptopURL = import.meta.env.VITE_TARGETLAPTOP_URL;
  const { itname } = useParams();
  const [indexChanger, setIndexChanger] = useState(0);
  const targetURL = `${targetlaptopURL}/${itname}`;
  const { data: targetlaptops = {}, isLoading: isLoadingTarget } = useQuery(
    ["targetlaptops", targetURL],
    () => fetchtargetLaptops(targetURL, navigate),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

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

  const [finalPrice, setFinalPrice] = useState([]);
  const [finalRam, setFinalRam] = useState([]);
  const [finalStorage, setFinalStorage] = useState([]);
  const [finalProcessor, setFinalProcessor] = useState([]);
  const [finalGraphic, setFinalGraphic] = useState([]);

  useEffect(() => {
    const rows = {
      price: targetlaptops.price || [],
      ram: targetlaptops.ram || [],
      storage: targetlaptops.storage || [],
      processor: targetlaptops.processor || [],
      graphic: targetlaptops.graphic || [],
    };

    const processAndSet = (property, setter, index) => {
      if (rows[property].length > index) {
        const processedElements = rows[property][index].map(
          (element) => element
        );
        setter(processedElements);
      }
    };

    processAndSet("price", setFinalPrice, indexChanger);
    processAndSet("ram", setFinalRam, indexChanger);
    processAndSet("storage", setFinalStorage, indexChanger);
    processAndSet("processor", setFinalProcessor, indexChanger);
    processAndSet("graphic", setFinalGraphic, indexChanger);
  }, [targetlaptops, indexChanger]);

  function handleSpecsChange() {
    setIndexChanger(
      (prevIndex) => (prevIndex + 1) % targetlaptops.storage.length
    );

    toast.success("Configuration Changed!", {
      position: "top-center",
      autoClose: 500,
    });
  }

  return (
    <HelmetProvider>
      <div className="flex flex-col items-center justify-center p-4">
        <Helmet>
          <title>
            {targetlaptops.name
              ? `${targetlaptops.name} - Specifications`
              : "TechR"}
          </title>
          <meta
            name="description"
            content={
              targetlaptops.name
                ? `${targetlaptops.name} - Specifications & Details about all the variants inlucded with this categorie`
                : "TechR"
            }
          />
        </Helmet>
        <div className="flex w-full max-w-screen-xl">
          <SideBar />
          {!isLoadingTarget ? (
            <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
              <h1
                className={`underline-animations text-2xl mt-2 inline-block w-auto font-bold cursor-pointer ${
                  targetlaptops.mostpopular === "true"
                    ? "text-red-600"
                    : "text-gray-900"
                } transition duration-300 ease-in-out`}
              >
                {targetlaptops.name || "..."}
              </h1>
              <p className="text-gray-600 text-sm md:text-sm my-2">
                Explore the{" "}
                {targetlaptops.item_categorie === "flagship"
                  ? "outstanding "
                  : "great "}
                features of this tablet that make it a great choice for your
                needs.
              </p>
              <div className="flex justify-center py-4">
                {targetlaptops.image ? (
                  <img
                    src={targetlaptops.image}
                    alt={targetlaptops.name}
                    className="max-h-72 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <CircularLoader />
                )}
              </div>
              <div className="text-gray-700 text-sm font-semibold md:text-sm py-2 text-justify mb-4">
                {targetlaptops.blog || "..."}
              </div>
              <div className="py-4 border-t-2 w-full">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="underline-animations text-xl font-bold w-auto inline-block mb-3">
                    {targetlaptops.name + " "}Specifications
                  </h2>
                </div>

                <div className="flex flex-col space-y-2">
                  {[
                    { label: "Dimension", value: targetlaptops.dimension },
                    { label: "Build", value: targetlaptops.build },
                    { label: "Weight", value: targetlaptops.weight },
                    { label: "Type", value: targetlaptops.dtype },
                    { label: "Size", value: targetlaptops.size },
                    { label: "Resolution", value: targetlaptops.resolution },
                    { label: "Front Camera", value: targetlaptops.frontcamera },
                    { label: "Video", value: targetlaptops.video },
                    { label: "OS", value: targetlaptops.os },
                    {
                      label: "Processor",
                      value:
                        finalProcessor.length > 0 ? finalProcessor[0] : null,
                    },
                    {
                      label: "Graphics",
                      value: finalGraphic.length > 0 ? finalGraphic[0] : null,
                    },
                    { label: "Capacity", value: targetlaptops.capacity },
                    { label: "Charging", value: targetlaptops.charging },
                    { label: "Wi-Fi", value: targetlaptops.wifi },
                    { label: "Bluetooth", value: targetlaptops.bluetooth },
                    { label: "Type-C", value: targetlaptops.typec },
                    { label: "Audio Jack", value: targetlaptops.audiojack },
                  ].map((spec, index) => (
                    <InfoSection
                      key={index}
                      label={spec.label}
                      value={spec.value}
                    />
                  ))}
                </div>
              </div>
              <div className="py-4">
                <div className="flex items-center justify-between">
                  <h2 className="underline-animations inline-block w-auto text-lg font-bold uppercase lg:text-xl">
                    Pricing
                  </h2>
                  <button
                    onClick={handleSpecsChange}
                    className="bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white font-semibold px-4 py-2 rounded-full border border-transparent hover:border-[#3B82F6] hover:bg-[#1E293B] hover:text-black transition duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Switch Variant
                  </button>
                </div>
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
                  <div className="flex flex-col">
                    {finalRam.map((ram, index) => (
                      <div
                        key={index}
                        className="flex border-t border-gray-300 hover:bg-[#f7e2ff] transition-colors"
                      >
                        <div className="flex-1 text-center py-2">
                          {index + 1}
                        </div>
                        <div className="flex-1 text-center py-2">
                          {`${(ram || "")
                            .replace(/\s+/g, "")
                            .replace(/(B).*/i, "B")}/${(
                            finalStorage[index] || ""
                          )
                            .replace(/\s+/g, "")
                            .replace(/(B).*/i, "B")}`}
                        </div>
                        <div className="flex-1 text-center py-2">
                          {finalPrice[index] || ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="py-4">
                {targetlaptops?.descriptions?.map((item, index) => (
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

export default LaptopBlog;
