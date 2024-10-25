import React from "react";

const CircularLoader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-transparent border-blue-500 border-solid"></div>
    </div>
  );
};

export default CircularLoader;
