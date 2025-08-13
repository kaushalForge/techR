import axios from "axios";

const fetchTabletData = async (apiUrl) => {
  try {
    if (!apiUrl) return {};

    const res = await axios.get(apiUrl, {
      headers: { "Cache-Control": "no-store" },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching tablet data:", error);
    return {};
  }
};

export default fetchTabletData;
