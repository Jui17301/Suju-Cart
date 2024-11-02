/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { MdDelete } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";

import React from "react";
import Image from "next/image";

const CartDetails = ({ product }: any) => {
  const dispatch = useAppDispatch();

  const handleQuantity = (type: string, _id: string) => {
    const payload = { type, _id };
    dispatch(updateQuantity(payload));
  };

  const handleRemove = (_id: string) => {
    const payload = { _id };
    dispatch(removeFromCart(payload));
  };

  return (
    <div className="flex items-center justify-between space-x-1 md:space-x-4 border border-gray-300 dark:border-gray-600 rounded-lg p-1 md:p-4 bg-white dark:bg-gray-700 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg max-w-[700px] mx-auto">
      <Image
        width={40}
        height={40}
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="flex-grow mx-4">
        <h3 className="text-[12px] md:text-lg font-semibold text-gray-800 dark:text-gray-100 truncate mb-2">
          {product?.name}
        </h3>
        <p className="text-[10px] md:text-lg font-bold text-red-600 dark:text-red-400">
          {product?.price} TK
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantity("decrement", product?._id)}
          className="bg-primary text-white dark:bg-yellow-600 p-2 rounded-full flex items-center justify-center hover:bg-yellow-800 dark:hover:bg-yellow-700"
        >
          <FaMinus />
        </button>
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {product.quantity}
        </span>
        <button
          onClick={() => handleQuantity("increment", product._id)}
          className="bg-primary text-white dark:bg-yellow-600 p-2 rounded-full hover:bg-yellow-800 dark:hover:bg-yellow-700"
        >
          <FaPlus />
        </button>
      </div>
      <button
        onClick={() => handleRemove(product._id)}
        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default CartDetails;
