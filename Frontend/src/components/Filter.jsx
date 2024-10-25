import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Filter() {
  const navigate = useNavigate();
  const [deviceType, setDeviceType] = useState("");
  const [processor, setProcessor] = useState("");
  const [ram, setRam] = useState("");
  const [graphics, setGraphics] = useState("");
  const [battery, setBattery] = useState("");
  const [price, setPrice] = useState("");
  const filterProductURL = import.meta.env.VITE_FILTERPRODUCT_URL;
  const sendProduct = async () => {
    try {
      const response = await axios.post(filterProductURL, {
        deviceType,
        processor,
        ram,
        graphics,
        battery,
        price,
      });
      if (response.data.message === "No such device found") {
        toast.error("No such products found", {
          position: "top-center",
          autoClose: 4000,
        });
      }

      if (response.data.productType && response.data.name) {
        toast.success("Congo! You got a catch", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate(`/${response.data.productType}/${response.data.name}`);
      }
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  const handleDeviceChange = (e) => {
    setDeviceType(e.target.value);
    setProcessor("");
    setRam("");
    setGraphics("");
    setBattery("");
    setPrice("");
  };

  const getOptions = (type) => {
    const options = {
      phone: {
        processor: [
          "Qualcomm Snapdragon",
          "Qualcomm Snapdragon 8 Gen 3",
          "MediaTek Dimensity",
          "Apple A18 Pro",
          "Apple A17 Pro",
          "Apple A16 Bionic",
          "Apple A15 Bionic",
          "Apple A14 Bionic",
          "Apple A13 Bionic",
          "Apple A12 Bionic",
          "Apple A11 Bionic",
          "Apple A10 Fusion",
          "Samsung Exynos",
          "Huawei Kirin",
          "NVIDIA Tegra",
          "Intel Atom",
          "Rockchip",
          "Spreadtrum",
          "Unisoc",
        ],
        ram: ["4GB", "6GB", "8GB", "12GB", "16GB", "32GB"],
        graphics: [
          "Adreno",
          "Apple integrated",
          "Mali",
          "PowerVR",
          "NVIDIA Tegra",
          "Qualcomm Adreno",
          "Samsung Exynos",
          "ASUS ROG Phone GPU",
          "Xiaomi Black Shark GPU",
          "Ray Tracing GPU",
        ],
        battery: [
          "1000 mAh - 2000 mAh",
          "2000 mAh - 3000 mAh",
          "3000 mAh - 4000 mAh",
          "4000 mAh - 5000 mAh",
          "5000 mAh - 6000 mAh",
          "6000 mAh - 7000 mAh",
        ],
        price: [
          "< $100",
          "$100 - $199",
          "$200 - $299",
          "$300 - $399",
          "$400 - $499",
          "$500 - $699",
          "$700 - $899",
          "$900 - $1,099",
          "$1,100 - $1,299",
          "$1,300 - $1,400",
          "$1,400 - $1,500",
          "$1,500 - $1,600",
          "$1,600 - $1,700",
          "$1,700 - $1,800",
          "$1,800 - $1,900",
          "$1,900 - $2,000",
        ],
      },
      laptop: {
        processor: [
          "Intel Celeron",
          "Intel Pentium",
          "Intel Core",
          "Intel Core i3",
          "Intel Core i5",
          "Intel Core i7",
          "Intel Core i9",
          "AMD Ryzen",
          "AMD Athlon",
          "AMD Ryzen 3",
          "AMD Ryzen 5",
          "AMD Ryzen 7",
          "AMD Ryzen 9",
          "Apple",
          "Apple M1",
          "Apple M1 Pro",
          "Apple M1 Max",
          "Apple M2",
          "Apple M2 Pro",
          "Apple M2 Max",
          "Qualcomm Snapdragon 7c",
          "Qualcomm Snapdragon 8c",
          "Qualcomm Snapdragon 8cx",
        ],
        ram: ["4GB", "8GB", "16GB", "32GB", "64GB"],
        graphics: [
          "NVIDIA RTX",
          "NVIDIA RTX 2050",
          "NVIDIA RTX 2060",
          "NVIDIA RTX 2070",
          "NVIDIA RTX 2080",
          "NVIDIA RTX 3050",
          "NVIDIA RTX 3060",
          "NVIDIA RTX 3070",
          "NVIDIA RTX 3080",
          "NVIDIA RTX 3090",
          "NVIDIA RTX 4050",
          "NVIDIA RTX 4060",
          "NVIDIA RTX 4070",
          "NVIDIA RTX 4080",
          "NVIDIA RTX 4090",
          "AMD Radeon",
          "AMD Radeon RX 550",
          "AMD Radeon RX 560",
          "AMD Radeon RX 570",
          "AMD Radeon RX 580",
          "AMD Radeon RX 590",
          "AMD Radeon RX 6000",
          "AMD Radeon RX 6700 XT",
          "AMD Radeon RX 6800",
          "AMD Radeon RX 6800 XT",
          "AMD Radeon RX 6900 XT",
          "AMD Radeon Vega 8",
          "AMD Radeon Vega 11",
          "AMD Radeon Pro 5000",
          "AMD Radeon HD 5000",
          "AMD Radeon HD 6000",
          "AMD Radeon HD 7000",
          "AMD Radeon R7",
          "AMD Radeon R9",
          "AMD Radeon Graphics",
          "Intel Iris",
          "Intel Iris Pro",
          "Intel Iris Xe",
          "Intel Iris Xe Graphics",
          "Intel Iris Plus",
          "Intel Iris Graphics 540",
          "Intel Iris Graphics 550",
          "Intel Iris Graphics 620",
          "Intel Iris Graphics 630",
          "Intel Iris Graphics 640",
          "Intel Iris Graphics 650",
          "Apple M2 Integrated",
          "Apple M1",
          "Apple M1 Pro",
          "Apple M1 Max",
          "Apple M1 Ultra",
          "Apple M2",
          "Apple M2 Pro",
          "Apple M2 Max",
          "NVIDIA GTX",
          "NVIDIA GTX 1650",
          "NVIDIA GTX 1660",
          "NVIDIA GTX 1660 Ti",
          "NVIDIA GTX 1050",
          "NVIDIA GTX 1050 Ti",
          "NVIDIA GTX 1060",
          "NVIDIA GTX 1070",
          "NVIDIA GTX 1080",
          "NVIDIA GTX 970",
          "NVIDIA GTX 980",
          "NVIDIA GTX 980 Ti",
        ],
        battery: ["30Wh - 50Wh", "50Wh - 70Wh", "70Wh - 90Wh", "90Wh - 110Wh"],
        price: [
          "< $100",
          "$100 - $199",
          "$200 - $299",
          "$300 - $399",
          "$400 - $499",
          "$500 - $699",
          "$700 - $899",
          "$900 - $1,099",
          "$1,100 - $1,299",
          "$1,300 - $1,400",
          "$1,400 - $1,500",
          "$1,500 - $1,600",
          "$1,600 - $1,700",
          "$1,700 - $1,800",
          "$1,800 - $1,900",
          "$1,900 - $2,000",
        ],
      },
      tablet: {
        processor: [
          "Qualcomm Snapdragon",
          "Apple",
          "MediaTek Dimensity",
          "MediaTek Helio",
          "NVIDIA Tegra",
          "Intel Atom",
          "Rockchip",
          "Spreadtrum",
          "Unisoc",
          "Exynos",
          "Huawei Kirin",
          "Allwinner",
        ],
        ram: ["2GB", "4GB", "6GB", "8GB", "12GB"],
        graphics: ["Apple GPU", "Adreno", "Mali", "PowerVR"],
        battery: [
          "1000 mAh - 2000 mAh",
          "2000 mAh - 3000 mAh",
          "3000 mAh - 4000 mAh",
          "4000 mAh - 5000 mAh",
          "5000 mAh - 6000 mAh",
          "6000 mAh - 7000 mAh",
        ],
        price: [
          "< $100",
          "$100 - $199",
          "$200 - $299",
          "$300 - $399",
          "$400 - $499",
          "$500 - $699",
          "$700 - $899",
          "$900 - $1,099",
          "$1,100 - $1,299",
          "$1,300 - $1,400",
          "$1,400 - $1,500",
          "$1,500 - $1,600",
          "$1,600 - $1,700",
          "$1,700 - $1,800",
          "$1,800 - $1,900",
          "$1,900 - $2,000",
        ],
      },
    };

    return options[type] || {};
  };

  const currentOptions = getOptions(deviceType);

  return (
    <HelmetProvider>
      <Helmet>
        <title>
          TechR: Filter smartphones,laptops and tablets of your own choice
        </title>
        <meta
          name="description"
          content="TechR: Filter smartphones,laptops and tablets of your own choice"
        />
      </Helmet>
      <div className="min-h-screen w-full mt-8 flex flex-col items-center px-4 py-2">
        <div className="text-black flex flex-col items-center mt-4 w-full max-w-xl">
          <h1 className="text-xl md:text-2xl bg-black p-2 rounded-xl text-orange-500 w-full text-center">
            Search your needs!
          </h1>
          <form
            action={filterProductURL}
            method="post"
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              sendProduct();
            }}
          >
            <div className="mt-4 border-2 border-black rounded-xl w-full mx-auto p-4">
              <table className="w-full border-separate border-spacing-4">
                <tbody>
                  <tr>
                    <td className="font-semibold whitespace-nowrap bg-indigo-200 rounded-xl p-2 text-sm md:text-lg">
                      Device Type:
                    </td>
                    <td>
                      <select
                        name="type"
                        className="outline-none w-full text-left rounded-lg bg-black text-sky-700 font-extrabold text-sm md:text-[16px] px-2 py-1 placeholder:text-zinc-300/80"
                        onChange={handleDeviceChange}
                      >
                        <option value="">Select Device</option>
                        <option value="phone">Phone</option>
                        <option value="laptop">Laptop</option>
                        <option value="tablet">Tablet</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold whitespace-nowrap bg-indigo-200 rounded-xl p-2 text-sm md:text-lg">
                      Processor:
                    </td>
                    <td>
                      <select
                        name="processor"
                        className="outline-none w-full text-left rounded-lg text-green-600 bg-black text-xs md:text-sm px-2 py-1 placeholder:text-white placeholder:font-semibold"
                        disabled={!deviceType}
                        value={processor}
                        onChange={(e) => setProcessor(e.target.value)}
                      >
                        <option value="">Select Processor</option>
                        {currentOptions.processor?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold whitespace-nowrap bg-indigo-200 rounded-xl p-2 text-sm md:text-lg">
                      RAM:
                    </td>
                    <td>
                      <select
                        name="ram"
                        className="outline-none w-full text-left rounded-lg bg-black text-white text-xs md:text-sm px-2 py-1 placeholder:text-white placeholder:font-semibold"
                        disabled={!deviceType}
                        value={ram}
                        onChange={(e) => setRam(e.target.value)}
                      >
                        <option value="">Select RAM</option>
                        {currentOptions.ram?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold whitespace-nowrap bg-indigo-200 rounded-xl p-2 text-sm md:text-lg">
                      Graphics:
                    </td>
                    <td>
                      <select
                        name="graphics"
                        className="outline-none w-full text-left rounded-lg text-green-600 bg-black text-xs md:text-sm px-2 py-1 placeholder:text-white placeholder:font-semibold"
                        disabled={!deviceType}
                        value={graphics}
                        onChange={(e) => setGraphics(e.target.value)}
                      >
                        <option value="">Select Graphics</option>
                        {currentOptions.graphics?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold whitespace-nowrap bg-indigo-200 rounded-xl p-2 text-sm md:text-lg">
                      Battery:
                    </td>
                    <td>
                      <select
                        name="battery"
                        className="outline-none w-full text-left rounded-lg bg-black text-white text-xs md:text-sm px-2 py-1 placeholder:text-white placeholder:font-semibold"
                        disabled={!deviceType}
                        value={battery}
                        onChange={(e) => setBattery(e.target.value)}
                      >
                        <option value="">Select Battery</option>
                        {currentOptions.battery?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold whitespace-nowrap bg-indigo-200 rounded-xl p-2 text-sm md:text-lg">
                      Price:
                    </td>
                    <td>
                      <select
                        name="price"
                        className="outline-none w-full text-left rounded-lg bg-black text-white text-xs md:text-sm px-2 py-1 placeholder:text-white placeholder:font-semibold"
                        disabled={!deviceType}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      >
                        <option value="">Select Price</option>
                        {currentOptions.price?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex gap-2 justify-center">
              <input
                type="submit"
                value="Search"
                className="bg-sky-600 text-white p-2 rounded-xl font-semibold text-lg outline-none"
              />
              <input
                type="reset"
                value="Clear"
                className="bg-red-600 text-white p-2 rounded-xl font-semibold text-lg outline-none"
              />
            </div>
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Filter;
