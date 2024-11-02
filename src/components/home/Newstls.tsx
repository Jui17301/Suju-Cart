"use client";

import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";
import { useThemeContext } from "@/lib/provider";

const Newstls = () => {
  const [email, setEmail] = useState("");
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom",
    iconColor: "blue",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");

    await Toast.fire({
      icon: "success",
      title: "Thank you for subscribing to our newsletter",
    });

    setEmail("");
  };

  const { isDarkMode } = useThemeContext(); // Get the current theme

  return (
    <section
      className={`${
        isDarkMode ? "bg-gray-900" : "bg-[#F6F6F6]"
      } py-[50px] md:py-[80px]`}
    >
      <div className="max-w-[1170px] px-5 mx-auto">
        <div>
          <h2
            className={`text-[28px] leading-tight text-center mb-2 font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Subscribe to our emails
          </h2>
          <p
            className={`text-[14px] leading-[24px] text-center mb-5 ${
              isDarkMode ? "text-gray-300" : "text-black"
            }`}
          >
            Be the first to know about new collections and exclusive offers
          </p>

          <div>
            <form
              className="flex items-center justify-center max-w-[500px] mx-auto gap-2"
              onSubmit={handleSubmit}
            >
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder="Your email"
                className={`${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              />
              <Button
                isIconOnly
                type="submit"
                className={`${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-[#ffffff] text-black"
                } transition-colors duration-300`}
              >
                <FaPaperPlane
                  className={`${isDarkMode ? "text-white" : "text-black"}`}
                />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newstls;
