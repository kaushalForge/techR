import axios from "axios";

const fetchHomeData = async () => {
  const urls = {
    budget: process.env.NEXT_PUBLIC_BACKEND_URL_BUDGET_PRODUCTS,
    midrange: process.env.NEXT_PUBLIC_BACKEND_URL_MIDRANGE_PRODUCTS,
    flagship: process.env.NEXT_PUBLIC_BACKEND_URL_FLAGSHIP_PRODUCTS,
    mostPopular: process.env.NEXT_PUBLIC_BACKEND_URL_FLAGSHIP_MOST_POPULAR,
    recommended: process.env.NEXT_PUBLIC_BACKEND_URL_RECOMMENDED_PRODUCTS,
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
