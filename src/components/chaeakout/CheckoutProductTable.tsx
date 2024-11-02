/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";

const CheckoutProductTable = () => {
  const { products } = useAppSelector((state) => state.cart);
  const columns = [
    {
      key: "items",
      label: "Items",
    },
    {
      key: "price",
      label: "Price",
    },
    {
      key: "quantity",
      label: "Quantity",
    },
  ];

  return (
    <div className="w-full dark:bg-gray-700 dark:text-gray-300 p-4 rounded-lg shadow-md">
      <Table aria-label="Checkout Product Table" className="dark:bg-gray-800">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key} className="dark:text-gray-400">
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {products.map((product: any) => (
            <TableRow key={product._id} className="dark:border-gray-700">
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-[70px] w-[60px]">
                    <Image
                      src={product.image}
                      alt="product_image"
                      width={60}
                      height={70}
                      className="object-fill h-full w-full rounded-md"
                    />
                  </div>
                  <p className="dark:text-gray-300">{product.name}</p>
                </div>
              </TableCell>
              <TableCell className="dark:text-gray-300">
                {product.price}
              </TableCell>
              <TableCell className="dark:text-gray-300">
                {product.quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CheckoutProductTable;
