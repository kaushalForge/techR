"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchAllPhones,
  fetchAllLaptops,
  fetchAllTablets,
} from "@/components/redux/slices/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const phones = useSelector((state) => state.product.allPhones);
  console.log("All Phones Data:", phones);

  return (
    <>
      <div>TestPage</div>
    </>
  );
};

export default Products;
