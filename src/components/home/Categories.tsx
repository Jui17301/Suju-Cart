/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, Image } from "@nextui-org/react";
import { TProductItem } from "@/Types";
import { useThemeContext } from "@/lib/provider";

// Get the backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Categories: React.FC = () => {
  const [products, setProducts] = useState<TProductItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();
  const { isDarkMode } = useThemeContext();

  const categories = [
    {
      id: 1,
      name: "Bedroom",
      image:
        "https://i.ibb.co.com/87pSnnZ/Popular-White-Master-Bedroom-Furniture-Ideas-06.webp",
    },
    {
      id: 2,
      name: "Dining Room",
      image: "https://i.ibb.co.com/xLTXQMV/DS10005534.webp",
    },
    {
      id: 3,
      name: "Living Room",
      image:
        "https://i.ibb.co/W2ZLfBn/photo-mar-06-2020-3-09-50-pm-1677116117.jpg",
    },
    {
      id: 4,
      name: "Office Furniture",
      image:
        "https://i.ibb.co.com/1nfDR1q/93043f28d75322bfdc00702334ae3235.jpg",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/product`);
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);

        const data = await res.json();
        setProducts(data.data);

        if (selectedCategory) {
          const filtered = data.data.filter(
            (product: TProductItem) => product.category === selectedCategory
          );
          setSelectedCategory(filtered);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Handle category click and redirect to dynamic category page
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Redirect with query parameters, not dynamic route
    router.push(`/category?category=${encodeURIComponent(category)}`);
  };

  return (
    <section
      className={`py-[50px] md:py-[75px] px-4 ${
        isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-Container mx-auto px-5 xl:px-0">
        <div className="text-center space-y-3 mb-5">
          <h2 className="text-3xl font-semibold gradient font-poppe">
            Our Categories
          </h2>
          <p
            className={`text-foreground w-full md:w-1/2 mx-auto ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Explore our top categories, featuring elegant sofas and stylish
            dining sets. At SuJu Cart, we offer carefully curated furniture
            pieces to enhance your home's beauty and comfort.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {categories.map((item, index) => (
            <div
              key={item.id}
              className={`${(index + 1) % 2 === 1 ? "row-span-2" : ""}`}
            >
              <Card
                isPressable
                className={`${
                  (index + 1) % 2 === 1
                    ? "md:h-[480px] lg:h-[440px] xl:h-[515px]"
                    : "md:h-[240px] lg:h-[210px] xl:h-[240px]"
                } border-none hover:drop-shadow-2xl duration-500 transition-all ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                }`}
                onClick={() => handleCategoryClick(item.name)}
              >
                <div>
                  <Image
                    alt={item.name}
                    className="object-cover h-full w-full"
                    src={item.image}
                  />
                </div>
                <div
                  className={`p-4 text-center ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  <h3 className="text-xl font-bold">{item.name}</h3>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
