/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useAuth } from "@/lib/AuthProviders";
import Swal from "sweetalert2";

// Get the backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const { user, token } = useAuth();
  const columns = [
    {
      key: "username",
      label: "User Name",
    },
    {
      key: "total",
      label: "Total Amount",
    },
    {
      key: "quantity",
      label: "Quantity",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "action",
      label: "Action",
    },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/bookings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = await res.json();
        console.log(data);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Something went wrong. try Again!");
      }
    };

    fetchOrders();
  }, [user, token]);

  const handleDeliveredProduct = async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setOrders((prevOrders: any) =>
          prevOrders.map((order: any) => {
            if (order._id === id) {
              return { ...order, status: "delivered" };
            }
            return order;
          })
        );

        Swal.fire({
          title: "Order Delivered Successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Order Not Delivered  ",
          text: "Contact with Developer",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Something went wrong. try Again!",
        text: "Contact with Developer",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Calculate the index of the last and first orders on the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate the total number of pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <>
      <div className="mt-10 bg-white dark:bg-gray-700 min-h-screen">
        <h1 className="text-3xl font-semibold text-center mb-10 pb-2 border-b-2 border-gray-300">
          All Orders
        </h1>
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                {columns.map((column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {currentOrders.map((order: any) => (
                  <TableRow key={order._id}>
                    <TableCell>{order?.userId.name}</TableCell>
                    <TableCell>{order?.totalAmount}</TableCell>
                    <TableCell>{order?.quantity}</TableCell>
                    <TableCell>{order?.status}</TableCell>
                    <TableCell>
                      {order?.status === "delivered" ? (
                        <p className="text-green-500">Delivery Completed</p>
                      ) : (
                        <Button
                          onClick={() => handleDeliveredProduct(order._id)}
                          color="primary"
                          variant="shadow"
                          size="sm"
                        >
                          Delivered
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`mx-1 ${
                    currentPage === index + 1 ? "bg-yellow-600 text-white" : ""
                  }`}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrdersPage;
