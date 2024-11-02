"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useThemeContext } from "@/lib/provider";

const Faq = () => {
  const { isDarkMode } = useThemeContext();

  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [isDarkMode]);

  const defaultContent = [
    {
      title: "How will my order be delivered to me?",
      des: "Your order will be delivered via a trusted courier service. You'll receive tracking details to monitor the delivery progress. Expect it to arrive within the estimated timeframe provided at checkout.",
    },
    {
      title: "How do I check the status of my order?",
      des: "You can check your order status by using the tracking number provided via email. Simply enter it on the courier's website to see the latest updates.",
    },
    {
      title: "What are the shipping charges?",
      des: "Shipping charges vary based on your location, the size and weight of the order, and the selected shipping method. The total cost will be calculated and displayed at checkout before you complete your purchase.",
    },
    {
      title: "Can I cancel my order?",
      des: "If you need to cancel your order, please contact us as soon as possible. We will do our best to accommodate your request, but please note that some items may have already been processed or shipped.",
    },
  ];

  const itemClasses = {
    title: `font-normal text-[16px] md:text-[18px] font-semibold ${
      isDarkMode ? "text-white" : "text-black"
    }`,
    content: `px-2 py-3 text-[14px] md:text-[16px] leading-[24px] ${
      isDarkMode ? "text-gray-300" : "text-black"
    }`, // Adjusted padding
    trigger: `px-2 py-1 h-14 flex items-center ${
      isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-500"
    }`, // Adjusted padding
  };

  return (
    <section
      key={key} // Use key to force re-render
      className={`md:py-[80px] py-[40px] font-poppe ${
        isDarkMode ? "bg-gray-700" : "bg-white"
      }`}
    >
      <div className="max-w-[1170px] mx-auto px-5 xl:px-0">
        <h1
          className={`text-[30px] leading-[40px] md:text-[30px] md:leading-[60px] mb-10 text-center font-semibold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Frequently Asked Questions
        </h1>

        <Accordion
          showDivider={false}
          className={`rounded-lg shadow-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {defaultContent.map((item) => (
            <AccordionItem
              key={item.title}
              title={<span className={itemClasses.trigger}>{item.title}</span>} // Render title with class
              aria-label="Accordion 1"
              className="shadow-lg"
            >
              <div className={itemClasses.content}>{item.des}</div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
