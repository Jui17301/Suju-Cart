"use client";
import { Button, Textarea } from "@nextui-org/react";
import { useAuth } from "@/lib/AuthProviders";
import { useState } from "react";
import { postReview } from "@/utils/actions/reviewAction";
import Swal from "sweetalert2";

const ReviewForm = ({
  id,
  onReviewSubmitted,
}: {
  id: string;
  onReviewSubmitted: () => void;
}) => {
  const { user } = useAuth();
  const [review, setReview] = useState("");

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom",
    iconColor: "blue",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const handlePostReview = async () => {
    if (review.length < 5) {
      await Toast.fire({
        icon: "error",
        title: "Review must be at least 5 characters",
      });
      return;
    }

    const result = await postReview({
      userName: user?.name,
      review,
      productId: id,
    });

    if (result?.success) {
      await Toast.fire({
        icon: "success",
        title: "Review added successfully",
      });

      setReview("");
      onReviewSubmitted(); // Notify parent to refetch reviews
    } else {
      await Toast.fire({
        icon: "error",
        title: "Something went wrong! Try again",
      });
      console.log(result);
    }
  };

  return (
    <div className="space-y-5 mt-5">
      <h2 className="text-xl md:text-2xl border-l-3 border-primary pl-1 text-black dark:text-white">
        Write a Review
      </h2>
      <Textarea
        label="Review"
        placeholder="Write your thoughts about the product"
        className="max-w-2xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600"
        onChange={(e) => setReview(e.target.value)}
        value={review}
      />
      <Button
        onClick={handlePostReview}
        isDisabled={!user}
        variant="bordered"
        color="primary"
        className="hover:bg-primary text-black dark:text-white transition-all duration-500"
      >
        Post
      </Button>
      {!user && (
        <p className="text-black dark:text-gray-300">
          You must be logged in to post a review!
        </p>
      )}
    </div>
  );
};

export default ReviewForm;
