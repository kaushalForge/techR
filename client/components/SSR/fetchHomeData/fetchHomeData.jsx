import axios from "axios";
import API_BASE_URL from "@/lib/apiBaseUrl";

const fetchHomeData = async () => {
  const urls = {
    budget: `${API_BASE_URL}/api/products/budget`,
    midrange: `${API_BASE_URL}/api/products/midrange`,
    flagship: `${API_BASE_URL}/api/products/flagship`,
    mostPopular: `${API_BASE_URL}/api/products/mostpopular`,
    recommended: `${API_BASE_URL}/api/products/recommended`,
  };

  const fetchData = async (url) => {
    if (!url) {
      return null;
    }
    const res = await axios.get(url, {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  };

  const [budget, midrange, flagship, mostPopular, recommended] =
    await Promise.all([
      fetchData(urls.budget, "budget"),
      fetchData(urls.midrange, "midrange"),
      fetchData(urls.flagship, "flagship"),
      fetchData(urls.mostPopular, "mostPopular"),
      fetchData(urls.recommended, "recommended"),
    ]);

  return {
    budget,
    midrange,
    flagship,
    mostPopular,
    recommended,
  };
};

export default fetchHomeData;
