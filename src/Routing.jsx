import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Cart from "./pages/Cart/Cart";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Auth from "./pages/Auth/Auth";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51S9A28RPf7T9bOCtoVF9r9DBdIyWBbp8g0kTVRwAYQJq8NjehbHovBDIyVlXVkugYViwmDr6KpIDvQq6Q8xFm7WA00RpLwQNct"
);
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
const Routering = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/Auth" element={<Auth />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute
              msg={"You must login to pay first"}
              redirect={"/payment"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"You must login to see your orders"}
              redirect={"/Orders"}
            >
              <Elements stripe={stripePromise}>
                <Orders />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/catagory/:catagoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default Routering;
