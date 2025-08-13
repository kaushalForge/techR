"use client";
import React, { useState, useEffect } from "react";

const PhoneBlog = (targetPhone) => {
  const [finalPrice, setFinalPrice] = useState([]);
  const [finalRam, setFinalRam] = useState([]);
  const [finalStorage, setFinalStorage] = useState([]);
  const [finalProcessor, setFinalProcessor] = useState([]);
  const [finalGraphic, setFinalGraphic] = useState([]);

  // Helper to parse price string like "$1,199" to number 1199 for sorting
  const parsePrice = (priceStr) => {
    if (!priceStr) return Number.MAX_SAFE_INTEGER;
    return Number(
      priceStr
        .replace(/[^\d.-]/g, "") // Remove all except digits, dot and minus
        .replace(/,/g, "")
    );
  };

  useEffect(() => {
    if (!targetPhone) return;

    // Set processor and graphic arrays (usually array of arrays)
    if (targetPhone.processor?.length) setFinalProcessor(targetPhone.processor[0]);
    else setFinalProcessor([]);

    if (targetPhone.graphic?.length) setFinalGraphic(targetPhone.graphic[0]);
    else setFinalGraphic([]);

    const ramArr = targetPhone.ram?.[0] || [];
    const storageArr = targetPhone.storage?.[0] || [];
    const priceArr = targetPhone.price?.[0] || [];

    // Combine into objects for sorting
    let combined = ramArr.map((ram, i) => ({
      ram,
      storage: storageArr[i] || "",
      price: priceArr[i] || "",
      priceNum: parsePrice(priceArr[i] || ""),
    }));

    // Sort by priceNum ascending
    combined.sort((a, b) => a.priceNum - b.priceNum);

    // Update states with sorted data
    setFinalRam(combined.map((item) => item.ram));
    setFinalStorage(combined.map((item) => item.storage));
    setFinalPrice(combined.map((item) => item.price));
  }, [targetPhone]);

  if (!targetPhone) return <p>No phone data found.</p>;

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
    <article className="flex flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-screen-xl">
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
          <h1
            className={`underline-animations text-2xl mt-2 inline-block w-auto font-bold cursor-pointer ${
              targetPhone.mostpopular === "true" ? "text-red-600" : "text-gray-900"
            } transition duration-300 ease-in-out`}
          >
            {targetPhone.name || "..."}
          </h1>
          <p className="text-gray-600 text-sm md:text-sm my-2">
            Explore the{" "}
            {targetPhone.item_categorie === "flagship" ? "outstanding " : "great "}
            features of this phone that make it a great choice for your needs.
          </p>
          <div className="flex justify-center py-4">
            {targetPhone.image ? (
              <img
                src={targetPhone.image}
                alt={targetPhone.name}
                className="max-h-72 object-contain"
                loading="lazy"
              />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
          <div className="text-gray-700 text-sm font-semibold md:text-sm py-2 text-justify mb-4">
            {targetPhone.blog || "..."}
          </div>
          <div className="py-4 border-t-2 w-full">
            <div className="flex items-center justify-between mb-2">
              <h2 className="underline-animations text-xl font-bold w-auto inline-block mb-3">
                {targetPhone.name + " "}Specifications
              </h2>
            </div>
            <div className="flex flex-col space-y-2">
              {[
                { label: "Dimension", value: targetPhone.dimension },
                { label: "Build", value: targetPhone.build },
                { label: "Weight", value: targetPhone.weight },
                { label: "Type", value: targetPhone.dtype },
                { label: "Size", value: targetPhone.size },
                { label: "Resolution", value: targetPhone.resolution },
                { label: "Front Camera", value: targetPhone.frontcamera },
                { label: "Main Camera", value: targetPhone.maincamera },
                { label: "Video", value: targetPhone.video },
                { label: "OS", value: targetPhone.os },
                { label: "Processor", value: finalProcessor.length > 0 ? finalProcessor[0] : null },
                { label: "Graphics", value: finalGraphic.length > 0 ? finalGraphic[0] : null },
                { label: "Capacity", value: targetPhone.capacity },
                { label: "Charging", value: targetPhone.charging },
                { label: "Wi-Fi", value: targetPhone.wifi },
                { label: "Bluetooth", value: targetPhone.bluetooth },
                { label: "Type-C", value: targetPhone.typec },
                { label: "Audio Jack", value: targetPhone.audiojack },
              ].map((spec, index) => (
                <InfoSection key={index} label={spec.label} value={spec.value} />
              ))}
            </div>
          </div>
          <div className="py-4">
            <h2 className="underline-animations inline-block w-auto text-lg font-bold uppercase lg:text-xl">
              Pricing
            </h2>
            <div className="overflow-hidden rounded-lg border border-gray-400 mt-2 shadow-lg">
              <div className="flex bg-gray-800 text-white">
                <div className="flex-1 text-center font-bold py-2 border-b border-gray-600">S.N</div>
                <div className="flex-1 text-center font-bold py-2 border-b border-gray-600">OPTIONS</div>
                <div className="flex-1 text-center font-bold py-2 border-b border-gray-600">PRICE</div>
              </div>
              <div className="flex flex-col">
                {finalRam.map((ram, index) => (
                  <div
                    key={index}
                    className="flex border-t border-gray-300 hover:bg-[#f7e2ff] transition-colors"
                  >
                    <div className="flex-1 text-center py-2">{index + 1}</div>
                    <div className="flex-1 text-center py-2">
                      {`${(ram || "")
                        .replace(/\s+/g, "")
                        .replace(/(B).*/i, "B")}/${(finalStorage[index] || "")
                        .replace(/\s+/g, "")
                        .replace(/(B).*/i, "B")}`}
                    </div>
                    <div className="flex-1 text-center py-2">{finalPrice[index] || ""}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="py-4">
            {targetPhone?.descriptions?.map((item, index) => (
              <div key={index} className="py-2 flex flex-col gap-2">
                {item.heading && (
                  <h1 className="text-lg md:text-xl font-bold">{item.heading}</h1>
                )}
                {item.detail && (
                  <p className="text-sm md:text-sm font-semibold text-justify">{item.detail}</p>
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
        </div>
      </div>
    </article>
  );
};

export default PhoneBlog;
