import axios from "axios";

let loading = true;

const fetchProducts = async (backendURL) => {
  try {
    console.log(backendURL);
    const response = await axios.get(backendURL);
    if (!Array.isArray(response.data)) {
      throw new Error("Data format is not an array");
    }
    loading = false;
    return response.data;
  } catch (error) {
    loading = false;
    return error.message;
  }
};

export const filterProducts = async (backendURL) => {
  try {
    const product = await fetchProducts(backendURL);
    return { product, loading };
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};
