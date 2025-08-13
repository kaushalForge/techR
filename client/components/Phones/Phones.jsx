"use client";

import PhonesCategory from "@/components/DeviceCategory/PhonesCategory";

function Phones({ allPhones }) {
  const gamingPhone = allPhones.filter((p) =>
    p.targetaudience.includes("gaming")
  );

  const professionalPhone = allPhones.filter((p) =>
    p.targetaudience.includes("professional")
  );
  const studentsPhone = allPhones.filter((p) =>
    p.targetaudience.includes("students")
  );
  const normalUsagePhone = allPhones.filter((p) =>
    p.targetaudience.includes("normalusage")
  );

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="min-h-screen h-auto w-full mt-12">
        <div className="container mx-auto px-4 flex flex-col gap-6 md:gap-8 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            Find Your Perfect Phone Companion!
          </h1>
          <PhonesCategory title="Gaming Phones" phones={gamingPhone} />
          <PhonesCategory
            title="Professional phones"
            phones={professionalPhone}
          />
          <PhonesCategory
            title="Phones for the Students"
            phones={studentsPhone}
          />
          <PhonesCategory
            title="Daily Usage Phones"
            phones={normalUsagePhone}
          />
        </div>
      </div>
    </div>
  );
}

export default Phones;
