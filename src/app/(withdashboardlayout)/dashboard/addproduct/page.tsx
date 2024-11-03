/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

"use client";

import { useAuth } from "@/lib/AuthProviders";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

// Get the backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const AddProductPage = () => {
  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const { name, description, price, image, category } = data;
      const priceNumber = Number(price);

      const productData = {
        name,
        description,
        price: priceNumber,
        image,
        category,
      };

      console.log("Requesting with product data:", productData);
      console.log("Using backend URL:", BACKEND_URL);

      const response = await fetch(`${BACKEND_URL}/api/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      // Read the response body once using response.json()
      const result = await response.json();

      console.log("Response status:", response.status);
      console.log("Response body:", result);

      if (result.success) {
        Swal.fire({
          title: "Product created successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      } else {
        Swal.fire({
          title: "Product not created",
          text: result.message || "Contact the developer",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      Swal.fire({
        title: "An error occurred",
        text: "Contact the developer",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="mt-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-5 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-5 pb-2 border-b-2 border-gray-300 dark:border-gray-700">
        Add Product
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          {/* Product Name */}
          <div>
            <Input
              type="text"
              label="Product Name"
              {...register("name", { required: true })}
              className="dark:text-white"
            />
            {errors.name && (
              <p className="text-red-500 dark:text-red-400 text-sm">
                Name is required
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <Input
              type="url"
              label="Image URL"
              {...register("image", { required: true })}
              className="dark:text-white"
            />
            {errors.image && (
              <p className="text-red-500 dark:text-red-400 text-sm">
                Image is required
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <Input
              type="number"
              label="Product Price"
              {...register("price", { required: true })}
              className="dark:text-white"
            />
            {errors.price && (
              <p className="text-red-500 dark:text-red-400 text-sm">
                Price is required
              </p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-wrap md:flex-nowrap gap-4">
            <div className="w-full">
              <Select
                label="Product Categories"
                placeholder="Select Category"
                {...register("category", { required: true })}
                className="dark:text-white"
              >
                <SelectItem key="Bedroom">Bedroom</SelectItem>
                <SelectItem key="Dining Room">Dining Room</SelectItem>
                <SelectItem key="Living Room">Living Room</SelectItem>
                <SelectItem key="Office Furniture">Office Furniture</SelectItem>
              </Select>
              {errors.category && (
                <p className="text-red-500 dark:text-red-400 text-sm">
                  Category is required
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <Textarea
              label="Description"
              placeholder="Enter your description"
              className="w-full dark:text-white"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="text-red-500 dark:text-red-400 text-sm">
                Description is required
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center mt-5">
          <Button
            type="submit"
            variant="shadow"
            color="primary"
            className="bg-yellow-600 text-white dark:bg-yellow-600 dark:text-white"
          >
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
