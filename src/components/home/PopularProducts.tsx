/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import ProductCard from "../ui/ProductCard";
import { TProductItem } from "@/Types";
import { useThemeContext } from "@/lib/provider";

const PopularProducts = ({ products }: { products: TProductItem[] }) => {
  const { isDarkMode } = useThemeContext();

  return (
    <section
      className={`py-[50px] md:py-[80px] p-6 ${
        isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-Container mx-auto px-5 xl:px-0" id="product">
        <div className="flex flex-col md:flex-row items-start gap-y-4 md:items-center justify-center mb-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold gradient font-poppe">
              Most Popular Products
            </h2>
            <p
              className={`text-foreground w-full md:w-1/2 ${
                isDarkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Discover our top furniture categories, featuring everything from
              cozy living room pieces to essential home decor. We've curated the
              finest selections to elevate your space with stylish, sustainable,
              and timeless designs.
            </p>
          </div>
          <Button
            as={Link}
            href="/product"
            color={isDarkMode ? "secondary" : "primary"}
            variant="bordered"
            radius="lg"
            className={`shadow-2xl ${
              isDarkMode ? "shadow-gray-900" : "shadow-primary"
            } hover:bg-primary hover:text-black transition-all duration-500`}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products?.slice(0, 6).map((item, i) => (
            <ProductCard item={item} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
