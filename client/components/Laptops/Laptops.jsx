"use client";

import LaptopsCategory from "@/components/DeviceCategory/LaptopsCategory";
function Laptops({ allLaptops }) {
  const gamingLaptops = allLaptops.filter((p) =>
    p.targetaudience.includes("gaming")
  );

  const professionalLaptops = allLaptops.filter((p) =>
    p.targetaudience.includes("professional")
  );
  const studentsLaptops = allLaptops.filter((p) =>
    p.targetaudience.includes("students")
  );
  const normalUsageLaptops = allLaptops.filter((p) =>
    p.targetaudience.includes("normalusage")
  );

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="min-h-screen h-auto w-full mt-12">
        <div className="container mx-auto px-4 flex flex-col gap-6 md:gap-8 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            Find Your Perfect Laptop Companion!
          </h1>
          <LaptopsCategory title="Gaming Laptops" laptops={gamingLaptops} />
          <LaptopsCategory
            title="Professional Laptops"
            laptops={professionalLaptops}
          />
          <LaptopsCategory
            title="Laptops for the Students"
            laptops={studentsLaptops}
          />
          <LaptopsCategory
            title="Daily Usage Laptops"
            laptops={normalUsageLaptops}
          />
        </div>
      </div>
    </div>
  );
}

export default Laptops;
