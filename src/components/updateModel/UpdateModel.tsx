/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useAuth } from "@/lib/AuthProviders";
import { TProductItem } from "@/Types";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

// Get the backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const UpdateModel = ({
  product,
  setProducts,
}: {
  product: TProductItem;
  setProducts: any;
}) => {
  const { token } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category,
      description: product.description,
    },
  });

  //   submit handler
  const onSubmit = async (data: any) => {
    const { price, ...rest } = data;

    const updateData = {
      ...rest,
      price: Number(price),
    };
    const res = await fetch(`${BACKEND_URL}/api/product/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });
    const result = await res.json();

    if (result.success) {
      setProducts((prevProducts: any) =>
        prevProducts.map((prod: TProductItem) =>
          prod._id === product._id ? { ...prod, ...updateData } : prod
        )
      );
      Swal.fire({
        title: "Product updated successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      onOpenChange();
    } else {
      Swal.fire({
        title: "Something went wrong",
        text: `${result.message}`,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="secondary"
        size="sm"
        variant="shadow"
        className="text-white"
      >
        Edit
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="auto"
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Update Product Details
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 gap-3">
                  {/* Product Name */}
                  <Input
                    label="Product Name"
                    type="text"
                    variant="bordered"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">Name is required</p>
                  )}

                  {/* Image */}
                  <Input
                    label="Image URL"
                    type="url"
                    variant="bordered"
                    {...register("image", { required: true })}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm">Image is required</p>
                  )}

                  {/* Price */}
                  <Input
                    label="Price"
                    type="number"
                    variant="bordered"
                    {...register("price", { required: true })}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">Price is required</p>
                  )}

                  {/* Category */}
                  <Select
                    label="Category"
                    {...register("category", { required: true })}
                  >
                    <SelectItem key="1" value="Bedroom">
                      Bedroom
                    </SelectItem>
                    <SelectItem key="2" value="Dining Room">
                      Dining Room
                    </SelectItem>
                    <SelectItem key="3" value="Living Room">
                      Living Room
                    </SelectItem>
                    <SelectItem key="4" value="Office Furniture">
                      Office Furniture
                    </SelectItem>
                  </Select>
                  {errors.category && (
                    <p className="text-red-500 text-sm">Category is required</p>
                  )}

                  {/* Description */}
                  <Textarea
                    label="Description"
                    placeholder="Enter description"
                    {...register("description", { required: true })}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      Description is required
                    </p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary">
                  Update
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateModel;
