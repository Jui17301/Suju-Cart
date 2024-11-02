import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import banner from "../../assets/hero.jpg";

const Banner = () => {
  return (
    <div
      className="h-screen md:h-[650px] bg-cover bg-no-repeat font-poppe relative"
      style={{
        backgroundImage: `url(${banner.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="w-full h-full flex justify-center items-center font-poppe relative z-10">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-2 sm:mb-4 text-white shadow-md">
            Transform Your Home with Premium Furniture
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white text-center mb-2 sm:mb-4">
            At SuJu Cart, explore stylish, sustainable furniture that enhances
            your home. From elegant sofas to timeless wooden tables, our
            eco-friendly pieces suit any room.
          </p>

          <div className="flex justify-center items-center">
            <Button
              as={Link}
              href="#product"
              radius="full"
              size="lg"
              variant="shadow"
              className="bg-gradient-to-tr from-primary to-yellow-500 text-white shadow-lg px-5 py-2 sm:px-6 sm:py-3 text-base sm:text-lg"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
