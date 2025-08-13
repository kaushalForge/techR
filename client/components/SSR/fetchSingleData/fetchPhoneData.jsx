import axios from "axios";

const fetchPhoneData = async (apiUrl) => {
  try {
    if (!apiUrl) return {};

    const res = await axios.get(apiUrl, {
      headers: { "Cache-Control": "no-store" },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching phone data:", error);
    return {};
  }
};

export default fetchPhoneData;
