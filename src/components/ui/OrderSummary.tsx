"use client";

import { useAuth } from "@/lib/AuthProviders";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { MdArrowForward, MdDelete } from "react-icons/md";

const OrderSummary = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { totalPrice, selectedItems, products } = useAppSelector(
    (store) => store.cart
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <div className="lg:w-80 xl:w-[550px] w-full h-full border-2 border-gray-300 dark:border-gray-600 bg-opacity-35 dark:bg-gray-800 rounded font-poppe px-5 py-5">
        <div className="mb-5">
          <p className="text-sm text-dark dark:text-gray-300 mb-2">
            By placing your order, you agree to our company Privacy policy and
            Conditions of use.
          </p>

          <h1 className="text-2xl font-semibold text-dark dark:text-white mb-5">
            Order Summary
          </h1>
          <p className="text-sm text-dark dark:text-gray-300 mb-2">
            <span className="font-semibold">Total Product:</span>{" "}
            {products?.length}
          </p>
          <p className="text-sm text-dark dark:text-gray-300 mb-2">
            <span className="font-semibold">Total Product Quantity:</span>{" "}
            {selectedItems}
          </p>
          <p className="text-sm text-dark dark:text-gray-300">
            <span className="font-semibold">Total Price:</span>{" "}
            {totalPrice.toFixed(3)} Tk
          </p>
        </div>
        <div>
          <Button
            fullWidth
            color="danger"
            onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
            className="mb-4 text-center"
          >
            Clear Cart <MdDelete />
          </Button>
          {user ? (
            <Button
              isDisabled={!selectedItems}
              as={Link}
              href="/checkout"
              fullWidth
              color="success"
            >
              Proceed Checkout <MdArrowForward />
            </Button>
          ) : (
            <Button as={Link} href="/login" fullWidth color="success">
              Proceed Checkout <MdArrowForward />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
