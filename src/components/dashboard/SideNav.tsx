"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthProviders";
import React from "react";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaList,
  FaPlus,
  FaShoppingCart,
  FaUser,
  FaClipboardList,
} from "react-icons/fa";

const SideNav = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      url: "/dashboard/overview",
      role: "admin",
      icon: <FaTachometerAlt />,
    },
    {
      title: "Products",
      url: "/dashboard/allproduct",
      role: "admin",
      icon: <FaList />,
    },
    {
      title: "Add Product",
      url: "/dashboard/addproduct",
      role: "admin",
      icon: <FaPlus />,
    },
    {
      title: "Orders",
      url: "/dashboard/allorder",
      role: "admin",
      icon: <FaShoppingCart />,
    },
    {
      title: "Dashboard",
      url: "/dashboard/useroverview",
      role: "user",
      icon: <FaUser />,
    },
    {
      title: "My Orders",
      url: "/dashboard/myorder",
      role: "user",
      icon: <FaClipboardList />,
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <ul className="bg-primary py-2 px-1 md:px-5 space-y-5 w-[80px] md:w-[100px] lg:w-[200px] min-h-screen h-full dark:bg-gray-800">
      {user &&
        navItems
          .filter((item) => item.role === user.role)
          .map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Link
                href={item.url}
                className={`flex items-center ${
                  isActive(item.url)
                    ? "text-white border-b-1 pb-1 border-white font-medium text-[14px]"
                    : "text-gray-700 dark:text-gray-300 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon} </span> {/* Icon */}
                <span className="hidden md:block">{item.title}</span>{" "}
                {/* Title visible on md and larger */}
              </Link>
            </li>
          ))}
    </ul>
  );
};

export default SideNav;
