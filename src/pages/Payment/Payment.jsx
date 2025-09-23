import React, { useState, useContext } from "react";

import Layout from "../../Components/Layout/Layout";
import style from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axiosInstance from "../../Api/axios";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { Types } from "../../Utility/action.type";

import { db } from "../../Utility/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const totalPrice = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  const handleChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await axiosInstance.post(
        `/payment/create?total=${totalPrice * 100}`
      );

      console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      await setDoc(
        doc(collection(doc(db, "users", user.uid), "orders"), paymentIntent.id),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      dispatch({
        type: Types.EMPTY_BASKET,
      });

      setPaid(true);
      setProcessing(false);

      setTimeout(() => {
        navigate("/Orders", {
          state: { msg: "You have placed a new order." },
        });
      }, 3000);
    } catch (error) {
      console.log(error);
      setProcessing(false);
      setPaid(false);
    }
  };

  return (
    <Layout>
      <div className={style.payment_header}>Checkout ({totalItem}) items</div>
      <section>
        <div className={style.payment}></div>
        <hr />
        <div className={style.flex}>
          <h3>Delivery Address</h3>

          <div>
            <div>{user?.email}</div>
            <div>Addis ababa</div>
            <div>street 645</div>
          </div>
        </div>
        <hr />
        <div className={style.flex}>
          <h3>Review items and deliver</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} key={item.id} />
            ))}
          </div>
        </div>
        <hr />
        <div className={style.flex}>
          <h3>Payment methods</h3>
          <div className={style.payment_card_container}>
            <div className={style.payment_details}>
              <form action="" onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}> {cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className={style.payment_price}>
                  <div>
                    <span
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      Total Order |
                      <CurrencyFormat amount={totalPrice} />{" "}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={paid || processing}
                    className={`${style.button} ${
                      paid ? style.success : processing ? style.loadingBtn : ""
                    }`}
                  >
                    {paid ? (
                      "🎉 Payment Successful Thank You!!"
                    ) : processing ? (
                      <div className={style.loading}>
                        <ClipLoader color="gray" size={20} />
                        <p>Processing Payment...</p>
                      </div>
                    ) : (
                      "💳 Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
