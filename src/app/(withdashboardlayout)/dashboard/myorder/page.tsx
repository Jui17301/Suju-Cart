
"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Image from "next/image";
import { useAuth } from "@/lib/AuthProviders";

interface Product {
  _id: string;
  name: string;
  image: string;
}

interface Order {
  _id: string;
  products: Product[];
  totalAmount: number;
  status: string;
}

// Get the backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const UserOrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Specify the type for orders
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ordersPerPage] = useState<number>(5); // Number of orders to display per page

  const { user, token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.userId && token) {
        try {
          const res = await fetch(`${BACKEND_URL}/api/bookings/user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const { data } = await res.json();
          setOrders(data);
        } catch (error) {
          // Handle error if needed
        }
      }
    };

    fetchOrders();
  }, [user, token]);

  // Calculate the index of the last order on the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  // Calculate the index of the first order on the current page
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  // Get current orders
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const columns = [
    {
      key: "products",
      label: "Products",
    },
    {
      key: "total",
      label: "Total Amount",
    },
    {
      key: "status",
      label: "Status",
    },
  ];

  return (
    <div className="mt-10 h-[100vh] overflow-y-scroll">
      <h1 className="text-3xl font-semibold text-center mb-5 pb-2">
        My Orders
      </h1>
      {orders.length > 0 ? (
        <>
          <Table className="dark:bg-gray-800">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn
                  key={column.key}
                  className="text-gray-700 dark:text-gray-300"
                >
                  {column.label}
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => (
                <TableRow key={order._id} className="dark:bg-gray-900">
                  <TableCell>
                    {order.products.map(
                      (
                        product: Product // Explicitly define product type
                      ) => (
                        <div
                          key={product._id}
                          className="flex items-center gap-5"
                        >
                          <Image
                            src={product.image}
                            alt="product_image"
                            width={50}
                            height={50}
                          />
                          <p className="text-black dark:text-gray-300">
                            {product.name}
                          </p>
                        </div>
                      )
                    )}
                  </TableCell>
                  <TableCell className="w-16 text-black dark:text-gray-300">
                    {order.totalAmount}{" "}
                    {/* Ensure totalAmount exists in the Order type */}
                  </TableCell>
                  <TableCell className="text-black dark:text-gray-300">
                    {order.status}{" "}
                    {/* Ensure status exists in the Order type */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <h1 className="text-center mt-10 text-danger">You have no orders</h1>
      )}
    </div>
  );
};

export default UserOrdersTable;
