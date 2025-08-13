"use client";

import TabletsCategory from "../DeviceCategory/TabletsCategory";

function Tablets({ allTablets }) {
  const gamingTablets = allTablets.filter((p) =>
    p.targetaudience.includes("gaming")
  );

  const professionalTablets = allTablets.filter((p) =>
    p.targetaudience.includes("professional")
  );
  const studentsTablets = allTablets.filter((p) =>
    p.targetaudience.includes("students")
  );
  const normalUsageTablets = allTablets.filter((p) =>
    p.targetaudience.includes("normalusage")
  );

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="min-h-screen h-auto w-full mt-12">
        <div className="container mx-auto px-4 flex flex-col gap-6 md:gap-8 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            Find Your Perfect Tablet Companion!
          </h1>
          <TabletsCategory title="Gaming Tablets" tablets={gamingTablets} />
          <TabletsCategory
            title="Professional Tablets"
            tablets={professionalTablets}
          />
          <TabletsCategory
            title="Tablets for the Students"
            tablets={studentsTablets}
          />
          <TabletsCategory
            title="Daily Usage Tablets"
            tablets={normalUsageTablets}
          />
        </div>
      </div>
    </div>
  );
}

export default Tablets;
