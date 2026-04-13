import axios from "axios";
import API_BASE_URL from "@/lib/apiBaseUrl";

const fetchAllPhones = async () => {
  const apiUrl = `${API_BASE_URL}/api/products/phones`;

  const fetchData = async (apiUrl) => {
    if (!apiUrl) {
      return null;
    }
    const res = await axios.get(apiUrl, {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  };

  const allPhones = await fetchData(apiUrl);

  return {
    allPhones,
  };
};

export default fetchAllPhones;
