/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { login } from "@/utils/actions/Authaction";
import { Button, Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiCheck, FiCopy } from "react-icons/fi";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import Swal from "sweetalert2";

type FormValues = {
  email: string;
  password: string;
};

const Loginpage = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [adminVisible, setAdminVisible] = useState(false);
  const [adminCopySuccess, setAdminCopySuccess] = useState(false);
  const [userCopySuccess, setUserCopySuccess] = useState(false);
  const [passwordCopySuccess, setPasswordCopySuccess] = useState(false);
  const [adminPasswordCopySuccess, setAdminPasswordCopySuccess] =
    useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const toggleAdminVisible = () => {
    setAdminVisible(!adminVisible);
  };

  const textToCopy = "suju@gmail.com";
  const secnodtextCoopy = "micky@gmail.com";
  const password = "suju8788";
  const adminPassword = "suju8788";

  const copyToClipboard = async (text: string, isAdmin: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (text.includes(textToCopy)) {
        setAdminCopySuccess(true);
        setTimeout(() => setAdminCopySuccess(false), 2000);
      } else if (text.includes(secnodtextCoopy)) {
        setUserCopySuccess(true);
        setTimeout(() => setUserCopySuccess(false), 2000);
      } else if (text.includes(password)) {
        setPasswordCopySuccess(true);
        setTimeout(() => setPasswordCopySuccess(false), 2000);
      } else if (text.includes(adminPassword)) {
        setAdminPasswordCopySuccess(true);
        setTimeout(() => setAdminPasswordCopySuccess(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const res = await login(data);

      console.log(res);
      if (res?.success) {
        // Store the token in localStorage
        // localStorage.setItem("token", res.token);
        localStorage.setItem("token", res.data.accessToken);

        Swal.fire({
          title: `${res.message} `,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        router.push("/"); // Redirect after successful login
      } else {
        Swal.fire({
          title: "Invalid Credential",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
      }
    } catch (error: any) {
      Swal.fire({
        title: "Something went wrong",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
    }
  };

  return (
    <section className="py-[90px] px-4 md:px-0">
      <h1 className="text-center text-4xl mb-5 font-semibold text-gray-900 dark:text-gray-200">
        Login <span className="text-secondary">Here</span>
      </h1>
      <div className="flex flex-col md:flex-row justify-center mb-10 space-y-5 md:space-y-0 md:space-x-10">
        {/* Login Form */}
        <div className="w-full md:w-[360px] lg:w-[400px] shadow-xl bg-white dark:bg-gray-800 px-5 py-10 border rounded-[9px] border-gray-300 dark:border-gray-600">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                className="max-w-md"
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
                {loading ? <Spinner size="sm" color="white" /> : "Login"}
              </Button>
            </div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link className="text-red-200" href="/register">
                Create an account
              </Link>
            </p>
          </form>
        </div>

        {/* Admin and User Credentials Section */}
        <div className="flex flex-col space-y-5">
          <div className="w-full md:w-[360px] lg:w-[400px] shadow-xl bg-white dark:bg-gray-800 px-5 py-6 border rounded-[9px] border-gray-300 dark:border-gray-600">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
              Admin Credentials
            </h2>
            <div className="flex flex-col space-x-2 mb-5 relative">
              <label className="text-[14px] text-gray-500 mb-2" htmlFor="admin">
                Admin
              </label>
              <input
                name="admin"
                value={textToCopy}
                readOnly
                className="flex-grow bg-black text-white text-[10px] px-3 py-3"
              />
              <button
                className="absolute inset-0 left-auto top-4 px-2 flex items-center cursor-pointer h-full"
                aria-label="Copy"
                onClick={() => copyToClipboard(textToCopy, true)}
              >
                {adminCopySuccess ? (
                  <FiCheck color="white" />
                ) : (
                  <FiCopy className="text-white" />
                )}
              </button>
            </div>
            <div className="flex flex-col space-x-2 mb-5 relative">
              <label
                className="text-[14px] text-gray-500 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                name="password"
                value={adminPassword}
                readOnly
                className="flex-grow bg-black text-white text-[10px] px-3 py-3"
              />
              <button
                className="absolute inset-0 left-auto top-4 px-2 flex items-center cursor-pointer h-full"
                aria-label="Copy"
                onClick={() => copyToClipboard(adminPassword, true)}
              >
                {adminPasswordCopySuccess ? (
                  <FiCheck color="white" />
                ) : (
                  <FiCopy className="text-white" />
                )}
              </button>
            </div>
          </div>

          <div className="w-full md:w-[360px] lg:w-[400px] shadow-xl bg-white dark:bg-gray-800 px-5 py-6 border rounded-[9px] border-gray-300 dark:border-gray-600">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
              User Credentials
            </h2>
            <div className="flex flex-col space-x-2 mb-5 relative">
              <label className="text-[14px] text-gray-500 mb-2" htmlFor="user">
                User
              </label>
              <input
                name="user"
                value={secnodtextCoopy}
                readOnly
                className="flex-grow bg-black text-white text-[10px] px-3 py-3"
              />
              <button
                className="absolute inset-0 left-auto top-4 px-2 flex items-center cursor-pointer h-full"
                aria-label="Copy"
                onClick={() => copyToClipboard(secnodtextCoopy, false)}
              >
                {userCopySuccess ? (
                  <FiCheck color="white" />
                ) : (
                  <FiCopy className="text-white" />
                )}
              </button>
            </div>
            <div className="flex flex-col space-x-2 mb-5 relative">
              <label
                className="text-[14px] text-gray-500 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                name="password"
                value={password}
                readOnly
                className="flex-grow bg-black text-white text-[10px] px-3 py-3"
              />
              <button
                className="absolute inset-0 left-auto top-4 px-2 flex items-center cursor-pointer h-full"
                aria-label="Copy"
                onClick={() => copyToClipboard(password, false)}
              >
                {passwordCopySuccess ? (
                  <FiCheck color="white" />
                ) : (
                  <FiCopy className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loginpage;
