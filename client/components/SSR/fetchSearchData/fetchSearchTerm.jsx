import axios from "axios";
import API_BASE_URL from "@/lib/apiBaseUrl";

const fetchSearchTerm = async (searchTerm) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/search/${searchTerm}`
    );
    return response.data; // returns the array of products
  } catch (error) {
    console.error(
      "Error fetching search results:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default fetchSearchTerm;
