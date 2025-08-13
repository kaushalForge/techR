import React from "react";
import Phones from "@/components/Phones/Phones";
import fetchAllPhones from "@/components/SSR/fetchCompleteData/fetchAllPhones";

const page = async () => {
  const data = await fetchAllPhones();
  return (
    <>
      <div>
        <Phones {...data} />
      </div>
    </>
  );
};

export default page;
