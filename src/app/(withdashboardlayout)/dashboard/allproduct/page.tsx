"use client";

import UpdateModel from "@/components/updateModel/UpdateModel";
import { useAuth } from "@/lib/AuthProviders";
import { TProductItem } from "@/Types";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// Get the backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const AllProducts = () => {
  const { user, token } = useAuth();

  const [products, setProducts] = useState<TProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const columns = [
    { key: "image", label: "Product Image" },
    { key: "name", label: "Product Name" },
    { key: "price", label: "Price" },
    { key: "action", label: "Actions" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/product`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = await res.json();
        setProducts(data);
      } catch (error) {
        Swal.fire({
          title: "Something went wrong",
          text: "Contact the developer",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user, token]);

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({
          title: "Product deleted successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setProducts(products.filter((product) => product._id !== id));
      } else {
        Swal.fire({
          title: "Product not deleted",
          text: "Contact the developer",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Something went wrong",
        text: "Try again or contact the developer",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Calculate products to display based on current page
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-5 rounded-lg shadow-md">
      <h1 className="text-center text-2xl font-semibold mb-5">All Products</h1>

      {loading ? (
        <div className="flex justify-center items-center text-lg">
          Loading...
        </div>
      ) : (
        <Table
          aria-label="All products table"
          className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Image
                    alt="product_image"
                    src={product.image}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <UpdateModel product={product} setProducts={setProducts} />
                    <Button
                      onClick={() => handleDeleteProduct(product._id)}
                      color="danger"
                      variant="shadow"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Pagination */}
      {!loading && (
        <div className="flex justify-center items-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              variant={index + 1 === currentPage ? "solid" : "flat"}
              size="sm"
              className={`mx-1 ${
                index + 1 === currentPage
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
              }`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
