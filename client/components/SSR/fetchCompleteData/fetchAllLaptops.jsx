import axios from "axios";

const fetchAllLaptops = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL_ALL_LAPTOPS;

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
