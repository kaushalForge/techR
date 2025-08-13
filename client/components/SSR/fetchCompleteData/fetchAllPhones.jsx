import axios from "axios";

const fetchAllPhones = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL_ALL_PHONES;

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
