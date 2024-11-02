"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import ReviewForm from "./ReviewForm";

type TReview = {
  _id: string;
  userName: string;
  review: string;
};

// Get the backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Review = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReviews = async () => {
    setLoading(true); // Set loading state
    const response = await fetch(`${BACKEND_URL}/api/reviews/${productId}`, {
      cache: "no-store",
    });
    const { data: reviewsData } = await response.json();
    setReviews(reviewsData || []); // Update reviews state
    setLoading(false); // Reset loading state
  };

  useEffect(() => {
    fetchReviews(); // Fetch reviews when component mounts
  }, [productId]);

  const handleReviewSubmitted = () => {
    fetchReviews(); // Refetch reviews when a new review is submitted
  };

  return (
    <div className="font-poppins">
      <h2 className="text-xl md:text-2xl border-l-3 border-primary pl-1 mb-5 text-black dark:text-white">
        Reviews
      </h2>
      <div className="w-full md:w-2/3">
        {loading ? (
          <p className="text-black dark:text-gray-300">Loading reviews...</p>
        ) : reviews.length ? (
          reviews.map((review: TReview) => (
            <div
              key={review._id}
              className="border-b border-gray-300 dark:border-gray-600 pb-1 mb-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <Avatar
                  size="sm"
                  icon={<AvatarIcon />}
                  classNames={{
                    base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                    icon: "text-black/80 dark:text-white", // Adjusted for dark mode
                  }}
                />
                <h3 className="font-semibold text-[14px] leading-[22px] text-black dark:text-white">
                  {review.userName}
                </h3>
              </div>
              <p className="text-[14px] leading-[22px] italic text-gray-500 dark:text-gray-400 pl-10">
                {review.review}
              </p>
            </div>
          ))
        ) : (
          <p className="text-black dark:text-gray-300">
            There is no review for this product
          </p>
        )}
      </div>
      <div>
        <ReviewForm id={productId} onReviewSubmitted={handleReviewSubmitted} />
      </div>
    </div>
  );
};

export default Review;
