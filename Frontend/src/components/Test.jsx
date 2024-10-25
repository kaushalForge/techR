import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState({
    phones: [],
    laptops: [],
    tablets: [],
    mostPopular: [],
    latest: [],
    budget: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.254.8:5000/filteredproducts/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Phones</h1>
      <ul>
        {products.phones.map((phone) => (
          <div>
            <li key={phone._id}>{phone.name}</li>
            <img src={phone.image} alt={phone.name} />
          </div>
        ))}
      </ul>

      <h1>Laptops</h1>
      <ul>
        {products.laptops.map((laptop) => (
          <li key={laptop._id}>{laptop.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
