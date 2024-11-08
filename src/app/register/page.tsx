/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { signUp } from "@/utils/actions/Authaction";
import { Button, Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import Swal from "sweetalert2";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const Singuppage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      setLoading(true);
      const res = await signUp(data);

      console.log(res);
      if (res?.success) {
        Swal.fire({
          title: `${res.message} `,
          text: "",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        setLoading(false);
        router.push("/login");
      } else {
        Swal.fire({
          title: "Invalid Credentials",
          text: "",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
      }
    } catch (error: any) {
      Swal.fire({
        title: "Something went wrong",
        text: "",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });

      setLoading(false);
    }
  };

  return (
    <section className="py-[90px] bg-base-200">
      <h1 className="text-center text-4xl mb-5 font-semibold text-gray-900 dark:text-gray-100">
        SignUp <span className="text-secondary">Here</span>
      </h1>
      <div className="flex justify-center">
        <div className="w-[360px] md:w-[400px] shadow-xl bg-base-100 dark:bg-gray-800 px-5 py-10 border border-gray-300 dark:border-gray-300 rounded-[9px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-8 relative">
              <Input
                {...register("name", { required: "Name is required" })}
                isRequired
                type="text"
                size="sm"
                label="Name"
                variant="bordered"
                className="max-w-md mb-1"
              />
              <label className="absolute">
                {errors.name && (
                  <span className="text-red-500 text-sm">Name is required</span>
                )}
              </label>
            </div>
            <div className="form-control mb-8 relative">
              <Input
                {...register("email", { required: "Email is required" })}
                isRequired
                type="email"
                size="sm"
                label="Email"
                variant="bordered"
                className="max-w-md mb-1"
              />
              <label className="absolute">
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    Email is required
                  </span>
                )}
              </label>
            </div>

            <div className="form-control mb-8 relative">
              <Input
                {...register("password", {
                  required: "Password is required",
                  maxLength: {
                    value: 15,
                    message: "Password cannot exceed 15 characters",
                  },
                })}
                isRequired
                type={visible ? "text" : "password"}
                size="sm"
                fullWidth
                label="Password"
                variant="bordered"
                className="max-w-md relative"
              />
              <label htmlFor="password" className="absolute">
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {(errors?.password?.message as string) ||
                      "Password is required"}
                  </span>
                )}
              </label>
              <span
                className="text-gray-400 absolute inset-0 left-auto px-2 flex items-center cursor-pointer h-full"
                onClick={toggleVisible}
              >
                {visible ? (
                  <RxEyeOpen className="w-5 h-5" />
                ) : (
                  <RxEyeClosed className="w-5 h-5" />
                )}
              </span>
            </div>

            <div className="form-control mb-8">
              <Button
                fullWidth
                color="primary"
                type="submit"
                className="btn btn-accent btn-outline font-semibold"
              >
                {loading ? <Spinner size="sm" color="white" /> : "Sign up"}
              </Button>
            </div>
            <p className="text-center text-gray-800 dark:text-gray-300">
              Already have an account?{" "}
              <Link className="text-red-200" href="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Singuppage;
