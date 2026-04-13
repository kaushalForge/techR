import axios from "axios";
import API_BASE_URL from "@/lib/apiBaseUrl";

const fetchAllLaptops = async () => {
  const apiUrl = `${API_BASE_URL}/api/products/laptops`;

  const fetchData = async (apiUrl) => {
    if (!apiUrl) {
      return null;
    }
    const res = await axios.get(apiUrl, {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  };

  const allLaptops = await fetchData(apiUrl);

  return {
    allLaptops,
  };
};

export default fetchAllLaptops;
