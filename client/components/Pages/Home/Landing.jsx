"use client";

import TopTwo from "./TopTwo";
import Category_Card from "../../Shared/Category_Card";
import TopDeals from "./Picsl&TopDeals";

const Landing = ({ budget, midrange, flagship, mostPopular, recommended }) => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero / Banner Section */}
      <TopTwo />

      <div className="h-full min-w-full sm:min-w-0 w-auto md:max-w-[1200px]">
        {/* Deals Section */}
        <TopDeals />

        {/* Categories Section */}
        <div className="container mx-auto px-4 py-8 flex flex-col gap-12">
          <Category_Card
            heading="Check out the Budget Devices"
            items={budget}
          />
          <Category_Card
            heading="Check out the Premium Midrange Devices"
            items={midrange}
          />
          <Category_Card heading="Flagship Devices" items={flagship} />
          <Category_Card heading="Most Popular" items={mostPopular} />
          <Category_Card heading="Recommended for You" items={recommended} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
