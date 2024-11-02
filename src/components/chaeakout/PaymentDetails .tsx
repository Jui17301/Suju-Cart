/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useAuth } from "@/lib/AuthProviders";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Get the backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Load the Stripe API key
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_GATEWAY_PK;

if (!stripePublicKey) {
  console.error("Stripe public key is not defined.");
}

const stripePromise = loadStripe(stripePublicKey!);

const PaymentDetails = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAuth();
  const router = useRouter();
  const { products, totalPrice, selectedItems, grandTotal, deliveryCharge } =
    useAppSelector((store) => store.cart);
  const productsId = products.map((product: any) => product._id);

  const [showPayment, setShowPayment] = useState(false);

  const handleCheckout = async () => {
    try {
      const order = {
        name: user?.name,
        userId: user?.userId,
        totalAmount: grandTotal,
        products: productsId,
        quantity: Number(selectedItems),
      };

      const res = await fetch(`${BACKEND_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      const data = await res.json();
      if (data?.success) {
        Swal.fire({
          title: "Order placed successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(clearCart());
        router.push("/dashboard/myorder");
      } else {
        Swal.fire({
          title: `${data.message}`,
          text: "Order Not Created",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Something went wrong",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleCashOnDelivery = async () => {
    await handleCheckout();
    Swal.fire({
      title: "Cash on Delivery selected!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="space-y-5 w-full bg-white dark:bg-gray-700 dark:text-gray-300 p-6 rounded-lg shadow-md">
      <p className="text-foreground dark:text-gray-400">
        By placing your order, you agree to our company Privacy Policy and
        Conditions of Use.
      </p>
      <Divider className="dark:bg-gray-700" />

      <h3 className="text-2xl dark:text-gray-100">Order Summary</h3>
      <div className="grid grid-cols-2 gap-2 text-gray-900 dark:text-gray-300">
        <p>Total Product Quantity</p>
        <p>{selectedItems}</p>
        <p>Total Product Price</p>
        <p>{totalPrice} TK</p>
        <p>Delivery Charge</p>
        <p>{deliveryCharge} TK</p>
      </div>
      <Divider className="dark:bg-gray-700" />
      <div className="grid grid-cols-2 text-xl text-gray-900 dark:text-gray-100">
        <h3>Order Total</h3>
        <p>{grandTotal} TK</p>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          onClick={handleCashOnDelivery}
          color="primary"
          variant="shadow"
          className="w-full text-black dark:text-white"
        >
          Cash On Delivery
        </Button>

        <Button
          onClick={() => setShowPayment(true)}
          color="primary"
          variant="shadow"
          className="w-full text-black dark:text-white"
          disabled={!user || selectedItems === 0}
        >
          Online Payment
        </Button>
      </div>

      {/* Modal for Stripe Payment */}
      {showPayment && stripePromise && (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            totalAmount={grandTotal}
            user={{ name: user?.name, userId: user?.userId }}
            token={token}
            selectedItems={selectedItems}
            productsId={productsId}
          />{" "}
          {/* Pass the total amount */}
        </Elements>
      )}
    </div>
  );
};

export default PaymentDetails;
