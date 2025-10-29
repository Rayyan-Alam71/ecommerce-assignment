"use client";
import React, { useState, useMemo, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated: string;
}
const DisplayProducts = ({products} : {products : Product[]}) => {
  const [searchProduct, setSearchProduct] = useState("");
  const [sortOption, setSortOption] = useState("");


  const filteredProducts = useMemo(() => {
    let result = products.filter((product) =>
      product.name.toLowerCase().includes(searchProduct.toLowerCase())
    );

    if (sortOption === "lowToHigh") {
      result = result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      result = result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchProduct, sortOption]);

  return (
    <div className="w-full rounded-md mt-10 pt-10 px-10 mx-auto flex flex-col justify-center">
      {/* Search and Filter */}
      <div className="mx-auto max-w-4xl flex items-center gap-4 flex-wrap">
        <input
          type="text"
          onChange={(e) => setSearchProduct(e.target.value)}
          value={searchProduct}
          className="px-4 py-2 text-neutral-700 border border-gray-300 placeholder:text-gray-700 rounded-md bg-gray-200 text-md"
          placeholder="Search product by name..."
        />

        <button className="px-4 py-2 rounded-lg border-gray-500 border cursor-pointer bg-linear-to-r from-red-200 via-orange-600 to-red-300 font-semibold text-white">
          Search
        </button>

        <div className="flex items-center gap-2 ml-4">
          <label className="text-gray-700 font-medium">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-400 rounded-md px-3 py-2 bg-gray-100 text-gray-700"
          >
            <option value="">Select</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Display Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {filteredProducts.map((product, idx) => (
          <Link href={`/products/${product.slug}`}>
            <ProductCard product={product} key={idx} className='cursor-pointer'/>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DisplayProducts;

import { ShoppingCart, Heart, Package, Clock } from "lucide-react";
import Link from "next/link";

const ProductCard = ({ product }: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getStockStatus = (inventory: number) => {
    if (inventory > 20)
      return { text: "In Stock", color: "text-emerald-600", bg: "bg-emerald-50" };
    if (inventory > 10)
      return { text: "Low Stock", color: "text-amber-600", bg: "bg-amber-50" };
    return { text: "Limited", color: "text-red-600", bg: "bg-red-50" };
  };

  const stockStatus = getStockStatus(product.inventory);

  return (
    <div className="bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 ${
            isHovered ? "shadow-2xl scale-[1.02]" : ""
          }`}
        >
          {/* Image Section */}
          <div className="relative h-48 bg-linear-to-br from-orange-500 via-red-500 to-rose-500 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`transition-transform duration-700 ${
                  isHovered ? "scale-110 rotate-6" : "scale-100 rotate-0"
                }`}
              >
                <div className="w-36 h-36 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg
                    className="w-32 h-32 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-semibold rounded-full shadow-lg">
                {product.category}
              </span>
            </div>

            {/* Like Button */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            >
              <Heart
                className={`w-5 h-5 transition-all duration-300 ${
                  isLiked
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-gray-600"
                }`}
              />
            </button>
          </div>

          {/* Content Section */}
          <div className="p-4">
            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`px-2 py-0.5 ${stockStatus.bg} ${stockStatus.color} text-xs font-semibold rounded-full flex items-center gap-1`}
              >
                <Package className="w-3 h-3" />
                {stockStatus.text}
              </div>
              <span className="text-xs text-gray-500">
                {product.inventory} units available
              </span>
            </div>

            {/* Product Name */}
            <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
              {product.name}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Price & Action */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500 mb-1">Price</p>
                <p className="text-3xl font-bold text-indigo-600">
                  ${product.price}
                </p>
              </div>

              <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>

            {/* Last Updated */}
            <div className="flex items-center gap-1 mt-4 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              <span>
                Updated {new Date(product.lastUpdated).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

