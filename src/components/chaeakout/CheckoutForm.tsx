

"use client";
import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { Modal } from "antd";
import Image from "next/image";
import successLogo from "../../assets/success.png";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useAuth } from "@/lib/AuthProviders";

interface Product {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

interface CheckoutFormProps {
  totalAmount: number;
  user: {
    name: string | null;
    userId: string | null;
  };
  token: string | null;
  selectedItems: number;
  productsId: string[];
}

const CheckoutForm = (props: CheckoutFormProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const { user, token } = useAuth();
  const { products } = useAppSelector((store) => store.cart);

  // Get the backend URL from environment variables
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Use the productsId from props instead of computing it
  const productsId =
    props.productsId || products.map((product: Product) => product._id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false); // Added processing state

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || isProcessing) {
      return; // Prevent re-submission
    }

    setIsProcessing(true); // Set processing state
    setLoading(true);
    setError(null);

    try {
      const order = {
        name: user?.name,
        userId: user?.userId,
        totalAmount: props.totalAmount,
        products: productsId,
        quantity: props.selectedItems,
      };

      const amountInCents = Math.round(props.totalAmount * 100);

      const { data } = await axios.post(
        `${BACKEND_URL}/api/bookings/payment-intent`,
        { amount: amountInCents, order },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const clientSecret = data.client_secret || data.data?.client_secret;

      if (!clientSecret) {
        throw new Error("No client secret received. Please contact support.");
      }

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        });

      if (stripeError) {
        setError(
          stripeError.message ||
            "An error occurred during payment confirmation."
        );
      } else if (paymentIntent?.status === "succeeded") {
        setPaymentIntentId(paymentIntent.id);

        // Save booking information to the server
        await axios.post(
          `${BACKEND_URL}/api/bookings`,
          {
            ...order,
            paymentIntentId: paymentIntent.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsModalOpen(true);
      } else {
        setError("Payment was not successful.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Server responded with an error:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
      setIsProcessing(false); // Reset processing state
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(clearCart());
    router.push("/dashboard/myorder");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 dark:bg-gray-700 p-4 rounded"
      >
        <CardElement className="border p-3 dark:border-gray-300" />
        <Button
          className="btn btn-neutral btn-block my-6"
          type="submit"
          disabled={!stripe || loading || isProcessing} // Ensure button is disabled when processing
        >
          {loading ? "Processing..." : "Make Payment"}
        </Button>

        {error && <div className="text-red-500">{error}</div>}
      </form>

      <Modal title="" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div className="flex justify-center items-center flex-col gap-y-3">
          <Image className="size-16" src={successLogo} alt="Success" />
          <h2 className="text-xl font-semibold text-center">Payment Success</h2>
          <h2 className="text-2xl font-bold">
            Pay: <span>${(props.totalAmount / 100).toFixed(2)}</span>
          </h2>
          <h3 className="text-lg">
            Transaction ID: <span>{paymentIntentId}</span>{" "}
            {/* Use state variable */}
          </h3>
          <h3 className="text-lg">Items:</h3>
          <ul>
            {products.map((product: Product) => (
              <li key={product._id}>
                {product.title} (x{product.quantity}) - $
                {((product.price * product.quantity) / 100).toFixed(2)}
              </li>
            ))}
          </ul>
          <Image
            className="w-full"
            src="https://img.freepik.com/free-vector/credit-score-flat-composition-with-chat-bubbles-envelopes-application-screens-black-woman-with-credit-card-vector-illustration_1284-83826.jpg"
            alt="Payment success illustration"
            width={740}
            height={420}
          />
        </div>
      </Modal>
    </>
  );
};

export default CheckoutForm;
