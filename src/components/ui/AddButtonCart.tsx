/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TProductItem } from "@/Types";
import { Button } from "@nextui-org/react";
import React from "react";
import Swal from "sweetalert2";

const AddButtonCart = ({
  children,
  product,
}: {
  children: React.ReactNode;
  product: TProductItem;
}) => {
  console.log(product);
  const { products } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const handle = (product: any) => {
    const isProductExistInList = products.find(
      (prod: any) => prod._id === product._id
    );

    if (isProductExistInList) {
      Swal.fire({
        title: `${product.name} `,
        text: "Allready exits in carts ",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      dispatch(addToCart(product));
      Swal.fire({
        title: `${product.name} `,
        text: "Add to cart success",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <Button
        onClick={(e) => {
          e.stopPropagation(), handle(product);
        }}
        className="bg-gradient-to-tr from-primary to-yellow-500 text-white shadow-lg"
      >
        {" "}
        {children}{" "}
      </Button>
    </div>
  );
};

export default AddButtonCart;
