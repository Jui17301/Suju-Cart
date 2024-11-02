"use client";
import ProductCard from "@/components/ui/ProductCard";
import { TProductItem } from "@/Types";
import React, { useState, useEffect } from "react";
import { useThemeContext } from "@/lib/provider";

// Get the backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Productpage = () => {
  const { isDarkMode } = useThemeContext();
  const [allProducts, setAllProducts] = useState<TProductItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<TProductItem[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Sample product data to be fetched
  const fetchProducts = async () => {
    const res = await fetch(`${BACKEND_URL}/api/product`);
    const data = await res.json();
    setAllProducts(data?.data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [filter, sort, search, allProducts]);

  const filterAndSortProducts = () => {
    let updatedProducts = [...allProducts];

    // Filter products based on selected category
    if (filter) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === filter
      );
    }

    // Search products based on title
    if (search) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort products based on selected criteria
    if (sort === "price-asc") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
    setCurrentPage(1); // Reset to first page after filtering/sorting
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilter(e.target.value);
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSort(e.target.value);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);
  const handleSearchSubmit = () => {
    setCurrentPage(1); // Reset to first page
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  return (
    <section
      className={`py-10 md:py-16 ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 md:gap-0">
          <h2
            className={`text-2xl md:text-3xl font-semibold gradient text-center md:text-left ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            All Products
          </h2>
        </div>

        {/* Filtering, Sorting, and Searching */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-stretch">
          <select
            value={filter}
            onChange={handleFilterChange}
            className={`p-2 border rounded w-full md:w-auto ${
              isDarkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "border-gray-300"
            }`}
          >
            <option value="">All Categories</option>
            <option value="Living Room">Living Room</option>
            <option value="Dining Room">Dining Room</option>
            <option value="Office Furniture">Office Furniture</option>
            <option value="Bedroom">Bedroom</option>
          </select>

          <select
            value={sort}
            onChange={handleSortChange}
            className={`p-2 border rounded w-full md:w-auto ${
              isDarkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "border-gray-300"
            }`}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Min Price</option>
            <option value="price-desc">Max Price</option>
          </select>

          <div className="flex flex-1 items-stretch gap-2">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className={`p-2 border rounded flex-grow ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "border-gray-300"
              }`}
            />
            <button
              onClick={handleSearchSubmit}
              className={`p-2 border rounded ${
                isDarkMode
                  ? "bg-yellow-600 text-white"
                  : "bg-yellow-500 text-black"
              } transition duration-300`}
            >
              Search
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((item, i) => (
            <ProductCard item={item} key={i} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`p-2 border rounded ${
                currentPage === i + 1
                  ? "bg-yellow-600 text-white"
                  : `${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200"}`
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Productpage;
