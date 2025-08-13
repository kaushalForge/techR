import React from "react";
import fetchAllLaptops from "@/components/SSR/fetchCompleteData/fetchAllLaptops";
import Laptops from "@/components/Laptops/Laptops";

const page = async () => {
  const data = await fetchAllLaptops();
  return (
    <>
      <div>
        <Laptops {...data} />
      </div>
    </>
  );
};

export default page;
