import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/utils/LoadingSpinner";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { calculateCartTotal } from "@/utils/calculateCartTotal";

const PlaceOrderBtn = ({ user, cartItems }) => {
  const [stripeAmount, setStripeAmount] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const { stripeTotal } = calculateCartTotal(cartItems);
    setStripeAmount(stripeTotal);
  }, [cartItems]);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const payload = {
        cartItems,
        userId: user.id,
        buyer_name: user.first_name,
        buyer_email: user.email,
        buyer_avatar: user.profile_photo,
      };
      console.log(cartItems);
      const url = `${baseUrl}/api/checkout`;
      const response = await axios.post(url, payload);
      toast.success(response.data.message, {
        style: {
          border: "1px solid #4BB543",
          padding: "16px",
          color: "#4BB543",
        },
        iconTheme: {
          primary: "#4BB543",
          secondary: "#FFFAEE",
        },
      });
      dispatch({
        type: "RESET_CART",
      });
      setLoading(false);
      router.push("/learning/my-courses");
    } catch (err) {
      // console.log(err.response);
      let {
        response: {
          data: { message },
        },
      } = err;
      toast.error(message, {
        style: {
          border: "1px solid #ff0033",
          padding: "16px",
          color: "#ff0033",
        },
        iconTheme: {
          primary: "#ff0033",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  const handlebuying = async () => {};
  return (
    // <div
    //   email={user.email}
    //   image="https://res.cloudinary.com/dyl06iwr6/image/upload/v1707580656/good_sqctku.png"
    //   amount={0}
    //   currency="USD"
    //   panelLabel="Validation"
    //   stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
    //   token={handleCheckout}
    //   onClick={handlebuying}
    // >
    <button
      onClick={handleCheckout}
      type="submit"
      className="default-btn-style-3 d-block w-100 mt-3"
      disabled={cartItems.length == 0 || loading}
    >
      Commander <span></span> {loading && <LoadingSpinner />}
    </button>
    // </div>
  );
};

export default PlaceOrderBtn;
