import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { toast } from "react-toastify";
import CircularLoader from "../CircularLoader";
import SideBar from "./SideBar";
import { useTargetProduct } from "../hooks/useProducts";

const TYPE_LABEL = { phone: "phone", laptop: "laptop", tablet: "tablet" };

const InfoSection = ({ label, value }) => (
  <div className="flex justify-between items-start sm:items-center w-full bg-white p-2 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition duration-300">
    <div className="flex items-center space-x-2">
      <span className="text-blue-500 text-base">
        <i className="fas fa-info-circle"></i>
      </span>
      <span className="text-sm font-semibold text-gray-800">{label}</span>
    </div>
    <span className="text-gray-900 text-sm text-right flex-1 sm:flex-none break-words sm:ml-4 mt-1 sm:mt-0">
      {value ?? <span className="text-gray-400 italic">Not available</span>}
    </span>
  </div>
);

function ProductBlog() {
  const navigate = useNavigate();
  const { productType, itname } = useParams();
  const [indexChanger, setIndexChanger] = useState(0);

  const { data: product = {}, isLoading } = useTargetProduct(
    productType,
    itname,
    navigate,
  );

  const [finalPrice, setFinalPrice] = useState([]);
  const [finalRam, setFinalRam] = useState([]);
  const [finalStorage, setFinalStorage] = useState([]);
  const [finalProcessor, setFinalProcessor] = useState([]);
  const [finalGraphic, setFinalGraphic] = useState([]);

  useEffect(() => {
    if (product && product.price) {
      setFinalPrice(product.price[indexChanger] || []);
      setFinalRam(product.ram[indexChanger] || []);
      setFinalStorage(product.storage[indexChanger] || []);
      setFinalProcessor(product.processor[indexChanger] || []);
      setFinalGraphic(product.graphic[indexChanger] || []);
    }
  }, [product, indexChanger]);

  const handleSpecsChange = () => {
    setIndexChanger((prev) => (prev + 1) % (product.storage?.length || 1));
    toast.success("Configuration Changed!", {
      position: "top-center",
      autoClose: 500,
    });
  };

  const specs = [
    { label: "Dimension", value: product.dimension },
    { label: "Build", value: product.build },
    { label: "Weight", value: product.weight },
    { label: "Type", value: product.dtype },
    { label: "Size", value: product.size },
    { label: "Resolution", value: product.resolution },
    { label: "Front Camera", value: product.frontcamera },
    { label: "Main Camera", value: product.maincamera },
    { label: "Video", value: product.video },
    { label: "OS", value: product.os },
    { label: "Processor", value: finalProcessor[0] },
    { label: "Graphics", value: finalGraphic[0] },
    { label: "Capacity", value: product.capacity },
    { label: "Charging", value: product.charging },
    { label: "Wi-Fi", value: product.wifi },
    { label: "Bluetooth", value: product.bluetooth },
    { label: "Type-C", value: product.typec },
    { label: "Audio Jack", value: product.audiojack },
  ];

  return (
    <HelmetProvider>
      <div className="flex flex-col items-center justify-center p-4">
        <Helmet>
          <title>
            {product.name ? `${product.name} - Specifications` : "TechR"}
          </title>
          <meta
            name="description"
            content={
              product.name ? `${product.name} - Specifications` : "TechR"
            }
          />
        </Helmet>
        <div className="flex w-full container mx-auto">
          <SideBar />
          {isLoading ? (
            <div className="w-full h-screen flex items-center justify-center">
              <CircularLoader />
            </div>
          ) : (
            <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
              {/* Name */}
              <h1
                className={`underline-animations text-2xl mt-2 inline-block font-bold cursor-pointer transition duration-300 ${product.mostpopular === "true" ? "text-red-600" : "text-gray-900"}`}
              >
                {product.name || "..."}
              </h1>

              {/* Subtitle */}
              <p className="text-gray-600 text-sm my-2">
                Explore the{" "}
                {product.item_categorie === "flagship"
                  ? "outstanding"
                  : "great"}{" "}
                features of this {TYPE_LABEL[productType]} that make it a great
                choice for your needs.
              </p>

              {/* Image */}
              <div className="flex justify-center py-4">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-72 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <CircularLoader />
                )}
              </div>

              {/* Blog text */}
              <div className="text-gray-700 text-sm font-semibold py-2 text-justify mb-4">
                {product.blog || "..."}
              </div>

              {/* Specs table */}
              <div className="py-4 border-t-2 w-full">
                <h2 className="underline-animations text-xl font-bold inline-block mb-3">
                  {product.name} Specifications
                </h2>
                <div className="flex flex-col space-y-2">
                  {specs.map((spec, i) => (
                    <InfoSection
                      key={i}
                      label={spec.label}
                      value={spec.value}
                    />
                  ))}
                </div>
              </div>

              {/* Pricing table */}
              <div className="py-4">
                <h2 className="underline-animations inline-block text-lg font-bold uppercase lg:text-xl">
                  Pricing
                </h2>
                {product.storage?.length > 1 && (
                  <button
                    onClick={handleSpecsChange}
                    className="ml-4 text-sm px-3 py-1 rounded-md bg-black text-white hover:bg-gray-800 transition"
                  >
                    Switch Config
                  </button>
                )}
                <div className="overflow-hidden rounded-lg border border-gray-400 mt-2 shadow-lg">
                  <div className="flex bg-gray-800 text-white">
                    {["S.N", "OPTIONS", "PRICE"].map((h) => (
                      <div
                        key={h}
                        className="flex-1 text-center font-bold py-2 border-b border-gray-600"
                      >
                        {h}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    {Array.isArray(finalRam) &&
                      finalRam.map((ram, i) => (
                        <div
                          key={i}
                          className="flex border-t border-gray-300 hover:bg-[#f7e2ff] transition-colors"
                        >
                          <div className="flex-1 text-center py-2">{i + 1}</div>
                          <div className="flex-1 text-center py-2">
                            {`${(ram || "").replace(/\s+/g, "").replace(/(B).*/i, "B")}/${(finalStorage[i] || "").replace(/\s+/g, "").replace(/(B).*/i, "B")}`}
                          </div>
                          <div className="flex-1 text-center py-2">
                            {finalPrice[i] || ""}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="py-4">
                {product?.descriptions?.map((item, i) => (
                  <div key={i} className="py-2 flex flex-col gap-2">
                    {item.heading && (
                      <h1 className="text-lg md:text-xl font-bold">
                        {item.heading}
                      </h1>
                    )}
                    {item.detail && (
                      <p className="text-sm font-semibold text-justify">
                        {item.detail}
                      </p>
                    )}
                    {item.descriptionimage && (
                      <img
                        src={item.descriptionimage}
                        alt={item.heading}
                        className="w-full object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </HelmetProvider>
  );
}

export default ProductBlog;
