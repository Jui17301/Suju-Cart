// "use client";
// import { useEffect, useState } from "react";
// import { getUserInfo } from "@/utils/actions/Authaction";
// import {
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
// } from "@nextui-org/navbar";
// import { User } from "@nextui-org/react";
// import Link from "next/link";
// import logo from "../../assets/logo.png";
// import Image from "next/image";

// const TopNav = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const userData = await getUserInfo();
//       setUser(userData);
//     };
//     fetchUser();
//   }, []);

//   return (
//     <Navbar isBordered className="bg-white dark:bg-gray-400">
//       {/* for md device  */}
//       <NavbarBrand className="block">
//         <Link href="/" className="font-bold text-inherit">
//           <Image
//             src={logo}
//             alt="Logo"
//             className="h-10 text-yellow-600"
//             width={100}
//             height={40}
//           />
//         </Link>
//       </NavbarBrand>
//       <NavbarContent justify="end">
//         <NavbarItem>
//           {user && (
//             <User
//               name={user.name}
//               description={user.role}
//               avatarProps={{
//                 src: user.image,
//                 alt: "User Image",
//               }}
//               className="text-gray-800 dark:text-white font-bold"
//             />
//           )}
//         </NavbarItem>
//       </NavbarContent>
//     </Navbar>
//   );
// };

// export default TopNav;

"use client";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/utils/actions/Authaction";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { User } from "@nextui-org/react";
import Link from "next/link";
import logo from "../../assets/logo.png";
import Image from "next/image";

// Define the user type
interface UserType {
  name: string;
  role: string;
  image: string;
}

const TopNav = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserInfo();
      setUser(userData);
    };
    fetchUser();
  }, []);

  return (
    <Navbar isBordered className="bg-white dark:bg-gray-400">
      {/* for md device  */}
      <NavbarBrand className="block">
        <Link href="/" className="font-bold text-inherit">
          <Image
            src={logo}
            alt="Logo"
            className="h-10 text-yellow-600"
            width={100}
            height={40}
          />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          {user && (
            <User
              name={user.name}
              description={user.role}
              avatarProps={{
                src: user.image,
                alt: "User Image",
              }}
              className="text-gray-800 dark:text-white font-bold"
            />
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default TopNav;
