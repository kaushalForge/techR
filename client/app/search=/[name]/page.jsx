import React from "react";
import Search from "@/components/DisplaySearch/Search";
import fetchSearchTerm from "@/components/SSR/fetchSearchData/fetchSearchTerm";

const page = async () => {
  const searchTerm = "iphone";
  const data = await fetchSearchTerm(searchTerm);

  return (
    <>
      <div>
        <Search data={data} />
      </div>
    </>
  );
};

export default page;
