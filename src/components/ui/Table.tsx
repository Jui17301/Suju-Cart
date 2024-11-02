"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

// Define the User type based on your API response
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

// Get the backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Table = () => {
  // Initialize users state with User type
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // To track loading state
  const [error, setError] = useState<string | null>(null); // To track error state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/alluser`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data.data); // Adjust based on your API response structure
      } catch (error: unknown) {
        console.error("Failed to fetch users:", error);
        if (error instanceof Error) {
          setError(error.message); // Set the error message if it's an Error object
        } else {
          setError("An unknown error occurred."); // Fallback for unknown error types
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }

      const response = await fetch(
        `${BACKEND_URL}/api/auth/updateUserRole/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      const result = await response.json();
      if (response.ok && result.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
        // Use SweetAlert2 to show success message
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User role updated successfully!",
          confirmButtonText: "OK",
        });
      } else {
        throw new Error(result.message || "Failed to update user role");
      }
    } catch (error: unknown) {
      console.error("Error updating user role:", error);
      if (error instanceof Error) {
        // Use SweetAlert2 to show error message
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.message,
          confirmButtonText: "OK",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An unknown error occurred while updating user role.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  // Handle loading and error states in the UI
  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Role
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.email}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      user.role === "admin"
                        ? "bg-success text-success"
                        : "bg-warning text-warning"
                    }`}
                  >
                    {user.role}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
