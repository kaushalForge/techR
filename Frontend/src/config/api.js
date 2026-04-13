import axios from "axios";

const API = `${import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000"}/api/products`;

export const fetchProducts = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export const fetchTargetProduct = async (type, name, navigate) => {
  try {
    const decodedName = name.split("-").join("").toLowerCase(); // "acer-nitro-v-15" → "Acer Nitro V 15"
    const { data } = await axios.get(`${API}/${type}/${decodedName}`);
    if (typeof data === "object" && data !== null) return data;
    navigate(`/${type}`);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    navigate(`/${type}`);
  }
};

export const URLS = {
  latest: `${API}/latest`,
  mostPopular: `${API}/mostpopular`,
  mostSold: `${API}/mostsold`,
  budget: `${API}/budget`,
  midrange: `${API}/midrange`,
  flagship: `${API}/flagship`,
  recommended: `${API}/recommended`,
  phones: `${API}/phones`,
  laptops: `${API}/laptops`,
  tablets: `${API}/tablets`,
  gaming: `${API}/gaming-devices`,
  professional: `${API}/professional-devices`,
  students: `${API}/students-devices`,
  normalusage: `${API}/normalusage-devices`,
};
