import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import style from "./Orders.module.css";
import ProductCard from "../../Components/product/ProductCard";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const Orders = () => {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(doc(db, "users", user.uid), "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className={style.container}>
        <div className={style.order_container}>
          <h2>Your Orders</h2>
          <div style={{ padding: "20px", color: "orange" }}>
            {orders?.length === 0 && <div>You don't have Orders yet.</div>}
          </div>
          <div>
            {orders?.map((eachOrder, i) => (
              <div key={i}>
                <hr />
                <p>Order Id: {eachOrder?.id}</p>
                {eachOrder?.data?.basket?.map((order) => (
                  <ProductCard flex={true} product={order} key={order.id} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Orders;
