import axios from "axios";

const fetchAllTablets = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL_ALL_TABLETS;

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
