import React from "react";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 mt-20 rounded-full border-px border border-gray-500 bg-linear-to-r from-orange-50 via-orange-200 to-orange-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl text-center text-neutral-800 font-semibold tracking-tight leading-tight">
          Welcome to ShopLyfter
        </h1>
        <p className="mt-2 text-gray-500 text-center text-lg">Discover amazing products at afforadable prices. </p>
      </div>
    </div>
  );
};

export default Banner;
