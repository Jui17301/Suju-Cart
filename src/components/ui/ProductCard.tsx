"use client";
import { Button, Card, CardBody, CardFooter, Tooltip } from "@nextui-org/react";
import AddBtn from "./AddBtn";
import Image from "next/image";
import { TProductItem } from "@/Types";
import Link from "next/link";
import AddButtonCart from "./AddButtonCart";
import { FaArrowRight } from "react-icons/fa";
import { useThemeContext } from "@/lib/provider"; // Import your theme context

const ProductCard = ({ item }: { item: TProductItem }) => {
  const { isDarkMode } = useThemeContext(); // Get the current theme

  return (
    <Card
      shadow="lg"
      className={`transition-transform transform hover:scale-105 duration-300 p-5 ${
        isDarkMode ? "bg-gray-700" : "bg-white"
      }`} // Adjust background color based on theme
    >
      <CardBody className="p-0 mb-4">
        <Image
          height={200}
          width={200}
          src={item.image}
          alt={item.name}
          className="w-full object-cover h-[200px] rounded-lg mb-3"
        />
        <h3
          className={`text-lg font-medium ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {item.name}
        </h3>

        <div className="flex justify-between items-center mt-2">
          <h1
            className={`text-xl font-semibold ${
              isDarkMode ? "text-gray-300" : "text-primary"
            }`}
          >
            {item.price} TK
          </h1>
          <Tooltip content="Add to cart">
            <Button
              isIconOnly
              className={`bg-gradient-to-tr from-primary to-yellow-500 text-white shadow-lg transition-transform transform hover:scale-110 ${
                isDarkMode ? "hover:bg-opacity-80" : "hover:bg-opacity-90"
              }`} // Adjust hover opacity based on theme
            >
              <AddButtonCart product={item}>
                <AddBtn />
              </AddButtonCart>
            </Button>
          </Tooltip>
        </div>
      </CardBody>

      <CardFooter className="w-full p-0">
        <Button
          className={`w-full text-white font-semibold text-md leading-[24px] rounded-[5px] transition-colors duration-300 ${
            isDarkMode
              ? "bg-primary hover:bg-yellow-600"
              : "bg-primary hover:bg-opacity-90"
          }`} // Adjust button background and hover styles based on theme
          as={Link}
          href={`/product/${item._id}`}
        >
          View Details <FaArrowRight className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
