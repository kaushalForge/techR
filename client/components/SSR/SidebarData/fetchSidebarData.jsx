import axios from "axios";

const fetchSidebarData = async () => {
  const urls = {
    flagship: process.env.NEXT_PUBLIC_BACKEND_URL_FLAGSHIP_PRODUCTS,
    midrange: process.env.NEXT_PUBLIC_BACKEND_URL_MIDRANGE_PRODUCTS,
    budget: process.env.NEXT_PUBLIC_BACKEND_URL_BUDGET_PRODUCTS,
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
