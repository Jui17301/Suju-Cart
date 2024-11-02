"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Badge,
} from "@nextui-org/react";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { usePathname } from "next/navigation";
import { FaCartArrowDown, FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import { useAppSelector } from "@/redux/hook";
import { useAuth } from "@/lib/AuthProviders";
import { useThemeContext } from "@/lib/provider";

const NavbarMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const products = useAppSelector((store) => store.cart.products);
  const pathname = usePathname();
  const { user, handleLogout } = useAuth();
  const { toggleDarkMode, isDarkMode } = useThemeContext();
  const isActive = (href: string) => pathname === href;

  // Updated menuItems to include "About" link
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Product", path: "/product" },
    { name: "About", path: "/about" },
    {
      name: "Dashboard",
      path: user
        ? user.role === "admin"
          ? "/dashboard/overview"
          : "/dashboard/useroverview"
        : null, // Adjusted based on user role
    },
  ];

  return (
    <Navbar
      isBordered
      disableAnimation={true}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
      className={`font-poppe ${isDarkMode ? "bg-gray-500" : "bg-transparent"}`} // Adjust background color for dark mode
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Image
            src={logo}
            alt="Logo"
            className={`h-10 ${
              isDarkMode ? "brightness-125" : "text-yellow-600"
            }`}
            width={100}
            height={40}
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarBrand className="hidden sm:block">
        <Image
          src={logo}
          alt="Logo"
          className={`h-10 ${
            isDarkMode ? "brightness-125" : "text-yellow-600"
          }`}
          width={100}
          height={40}
        />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) =>
          item.path ? ( // Ensure that we only render items with a valid path
            <NavbarItem
              key={`${item.name}-${index}`}
              isActive={isActive(item.path)}
            >
              <Link
                color={isActive(item.path) ? "primary" : "foreground"}
                href={item.path}
              >
                {item.name}
              </Link>
            </NavbarItem>
          ) : null
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="px-2">
          <Link
            href="/cart"
            className={`relative ${
              isDarkMode ? "text-gray-300" : "text-black"
            }`} // Adjusted text color for cart icon
          >
            <Badge color="danger" content={products.length} shape="circle">
              <FaCartArrowDown size={30} />
            </Badge>
          </Link>
        </NavbarItem>

        {/* Dark Mode Toggle Icon without Background */}
        <NavbarItem className="px-2">
          <button
            onClick={toggleDarkMode}
            className="flex items-center border-0 bg-transparent p-0" // No background or border
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <FaSun size={20} className="text-yellow-500" /> // Optional: Add color
            ) : (
              <FaMoon size={20} className="text-gray-800" /> // Optional: Add color
            )}
          </button>
        </NavbarItem>

        <NavbarItem>
          {!user ? (
            <Button
              as={Link}
              color="primary"
              href="/login"
              variant="shadow"
              className="text-white"
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              color="primary"
              variant="shadow"
              className="text-white"
            >
              Logout
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) =>
          item.path ? ( // Ensure that we only render items with a valid path
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                className={`${
                  isActive(item.path)
                    ? "text-primary"
                    : isDarkMode
                    ? "text-gray-300"
                    : "text-foreground"
                }`}
                href={item.path}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ) : null
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarMain;
