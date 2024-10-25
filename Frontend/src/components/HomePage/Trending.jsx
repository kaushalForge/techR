import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const Trending = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Honor Magic V3",
        "Apple iPhone 16 Pro Max",
        "Samsung Galaxy S24 Ultra",
        "Lava Agni 3",
        "Apple iPhone 15 Pro Max",
        "Google Pixel 9 Pro",
        "OnePlus 12",
      ],
      typeSpeed: 100,
      backSpeed: 0,
      loop: true,
    };

    const typed = new Typed(typedElement.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex mt-4 items-center justify-center flex-wrap gap-2 mb-4 w-full">
      <div className="bg-black text-[#FFA500] rounded-sm p-1 text-center w-auto text-lg md:text-xl whitespace-nowrap">
        Trending
      </div>
      <div className="bg-zinc-400 px-1 md:p-1 rounded-sm text-sm md:text-xl text-gray-900">
        <span ref={typedElement} />
      </div>
    </div>
  );
};

export default Trending;
