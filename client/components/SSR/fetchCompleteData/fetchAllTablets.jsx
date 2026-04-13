import axios from "axios";
import API_BASE_URL from "@/lib/apiBaseUrl";

const fetchAllTablets = async () => {
  const apiUrl = `${API_BASE_URL}/api/products/tablets`;

  const fetchData = async (apiUrl) => {
    if (!apiUrl) {
      return null;
    }
    const res = await axios.get(apiUrl, {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  };

  const allTablets = await fetchData(apiUrl);

  return {
    allTablets,
  };
};

export default fetchAllTablets;
