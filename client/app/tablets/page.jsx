import React from "react";
import fetchAllTablets from "@/components/SSR/fetchCompleteData/fetchAllTablets";
import Tablets from "@/components/Tablets/Tablets";

const page = async () => {
  const data = await fetchAllTablets();
  return (
    <>
      <div>
        <Tablets {...data} />
      </div>
    </>
  );
};

export default page;
