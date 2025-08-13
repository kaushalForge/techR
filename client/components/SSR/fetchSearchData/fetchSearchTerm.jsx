import axios from "axios";

const fetchSearchTerm = async (searchTerm) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/search/${searchTerm}`
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
