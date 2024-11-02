"use client";
import Image from "next/image";
import React from "react";
import { useThemeContext } from "@/lib/provider";

const Shipping = () => {
  const { isDarkMode } = useThemeContext();
  return (
    <section className={`py-[50px] ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
      <div className="max-w-[1175px] px-5 mx-auto">
        <div className="flex justify-between flex-wrap gap-5">
          <div className="flex items-center gap-3 mx-w-[50%] cursor-pointer">
            <div>
              <Image
                src="https://groceries-mart.myshopify.com/cdn/shop/files/icons-1_e8f5382a-89eb-429a-be43-91ff77b47f14_small.png?v=1613558641"
                alt="Free Shipping"
                width={50}
                height={50}
              />
            </div>
            <div>
              <h2
                className={`text-[30px] font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                } font-serif`}
              >
                Free Shipping
              </h2>
              <p
                className={`text-[14px] ${
                  isDarkMode ? "text-white" : "text-gray-500"
                } font-mono`}
              >
                when you spend 100000Tk
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mx-w-[50%] cursor-pointer">
            <div>
              <Image
                src="https://groceries-mart.myshopify.com/cdn/shop/files/icons-2_c928e4fc-cc20-4445-9879-459cb716c93c.png?v=1613558826&width=275"
                alt="24/7 Support"
                width={50}
                height={50}
              />
            </div>
            <div>
              <h2
                className={`text-[30px] font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                } font-serif`}
              >
                24/7 Support
              </h2>
              <p
                className={`text-[14px] ${
                  isDarkMode ? "text-white" : "text-gray-500"
                } font-mono`}
              >
                We are always here for you
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mx-w-[50%] cursor-pointer">
            <div>
              <Image
                src="https://groceries-mart.myshopify.com/cdn/shop/files/icons-3_3cbea35f-7af0-495b-bb3e-cba58a5a2a55.png?v=1613558826&width=275"
                alt="Save Money"
                width={50}
                height={50}
              />
            </div>
            <div>
              <h2
                className={`text-[30px] font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                } font-serif`}
              >
                Save Money
              </h2>
              <p
                className={`text-[14px] ${
                  isDarkMode ? "text-white" : "text-gray-500"
                } font-mono`}
              >
                Save money on your purchase
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shipping;
