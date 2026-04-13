import axios from "axios";
import API_BASE_URL from "@/lib/apiBaseUrl";

const fetchSidebarData = async () => {
  const urls = {
    flagship: `${API_BASE_URL}/api/products/flagship`,
    midrange: `${API_BASE_URL}/api/products/midrange`,
    budget: `${API_BASE_URL}/api/products/budget`,
  };

  const fetchData = async (url) => {
    if (!url) {
      console.warn("Missing URL:", url);
      return [];
    }
    try {
      const res = await axios.get(url, {
        headers: { "Cache-Control": "no-store" },
      });
      return res.data;
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  };

  const [flagship, midrange, budget] = await Promise.all([
    fetchData(urls.flagship),
    fetchData(urls.midrange),
    fetchData(urls.budget),
  ]);

  return {
    flagship,
    midrange,
    budget,
  };
};

export default fetchSidebarData;
