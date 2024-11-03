"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useThemeContext } from "@/lib/provider";

const Offer = () => {
  const { isDarkMode } = useThemeContext();

  return (
    <section
      className={`py-[50px] md:py-[80px] px-8 md:px-12 lg:px-6 font-poppe ${
        isDarkMode ? "bg-gray-700" : "bg-white"
      }`}
    >
      <div
        className={`max-w-[1275px] rounded-lg px-5 mx-auto py-[100px] relative ${
          isDarkMode ? "bg-gray-400" : "bg-white"
        }`}
      >
        <div className="absolute inset-0 bg-[url('https://i.ibb.co/kH8z6nD/p-4.png')] bg-no-repeat bg-right lg:bg-center bg-cover" />

        <div className="relative z-10 flex justify-end">
          {/* z-10 to bring content above the background */}
          <div>
            <h2
              className={`text-[30px] italic font-semibold ${
                isDarkMode ? "text-white" : "text-white"
              } mb-1 md:mb-2`}
            >
              Special Offer
            </h2>
            <h2
              className={`text-[60px] font-bold ${
                isDarkMode ? "text-gray-100" : "text-white"
              } mb-5`}
            >
              get 50% off
            </h2>
            <Button
              as={Link}
              href="/product"
              color={isDarkMode ? "primary" : "warning"}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
