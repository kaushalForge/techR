import React from "react";

function Button({ text }) {
  return (
    <div className="text-xl md:text-2xl text-[#FFA500] bg-black py-1 px-4 rounded cursor-pointer selection:text-white">
      {text}
    </div>
  );
}

export default Button;
