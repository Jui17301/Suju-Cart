"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Rate } from "antd";
import Image from "next/image";
import { useThemeContext } from "@/lib/provider";

interface Testimonial {
  statue: string;
  feedback: string;
  image: string;
  name: string;
}

const TestimonialSlide = () => {
  const [data, setData] = useState<Testimonial[]>([]);
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    fetch("testimonials.json")
      .then((response) => response.json())
      .then((result) => setData(result));
  }, []);

  return (
    <section
      className={`pt-10 pb-20 ${isDarkMode ? "bg-gray-700" : "bg-[#f5f8fc]"}`}
    >
      {/* Heading */}
      <div className="text-center mb-8">
        <h2
          className={`text-3xl font-semibold gradient font-poppe ${
            isDarkMode ? "text-white" : "text-[#1A1A1A]"
          }`}
        >
          Testimonials
        </h2>
        {/* Description */}
        <p
          className={`text-foreground max-w-[570px] mx-auto text-center ${
            isDarkMode ? "text-gray-300" : "text-[#333]"
          }`}
        >
          Hear from our satisfied customers in the Testimonials section, where
          real users share their experiences and stories about their favorite
          furniture pieces and the exceptional service they received from SuJu
          Cart.
        </p>
      </div>

      {/* Slider */}
      <div className="mx-auto max-w-[1200px]">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className={`rounded-lg p-5 px-6 border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
                } shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105`}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Image and Name */}
                  <div className="flex flex-col items-center mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96} // Set width for the image
                      height={96} // Set height for the image
                      className="rounded-full mb-2"
                    />
                    <h2
                      className={`font-semibold ${
                        isDarkMode ? "text-gray-200" : "text-[#333]"
                      }`}
                    >
                      {item.name}
                    </h2>
                  </div>
                  {/* Rating */}
                  <Rate className="text-sm" disabled defaultValue={4} />
                  {/* Testimonial */}
                  <h2
                    className={`text-[#333] font-semibold my-4 ${
                      isDarkMode ? "text-white" : "text-[#333]"
                    }`}
                  >
                    {item.statue}
                  </h2>
                  <p
                    className={`text-sm max-w-2xl mx-auto ${
                      isDarkMode ? "text-gray-300" : "text-black"
                    }`}
                  >
                    {item.feedback}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSlide;
