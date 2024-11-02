"use server";

import { getToken } from "./Authaction";

// Get the backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const postReview = async (reviewData: {
  userName: string;
  review: string;
  productId: string;
}) => {
  try {
    const token = await getToken();
    const res = await fetch(`${BACKEND_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
