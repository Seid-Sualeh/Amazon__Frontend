import image from "../../assets/images/cart.jpg";
import Layout from "../../Components/Layout/Layout";
import { useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import Style from "./Cart.module.css";
import { Types } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const Cart = () => {
  const [{ basket }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const increament = (item) => {
    dispatch({
      type: Types.ADD_TO_BASKET,
      item,
    });
  };
  const decreament = (id) => {
    dispatch({
      type: Types.REMOVE_FROM_BASKET,
      id,
    });
  };
  const clearCart = () => {
    dispatch({
      type: Types.CLEAR_BASKET,
    });
  };

  return (
    <Layout>
      <section className={Style.cart_header}>
        <div className={Style.container}>
          <h2>Hello</h2>
          <h3>Your Shoping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <div className={Style.image}>
              {/* <h4>Your Amazon Cart is empty</h4> */}

              <img src={image} alt="empty cart" />
            </div>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={Style.Cart_product}>
                  <ProductCard
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                    key={i}
                  />
                  <div className={Style.btn_container}>
                    <button
                      className={Style.btn}
                      onClick={() => increament(item)}
                    >
                      <IoIosArrowUp size={30} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={Style.btn}
                      onClick={() => decreament(item.id)}
                    >
                      <IoIosArrowDown size={30} />
                    </button>
                  </div>
                </section>
              );
            })
          )}

       
        </div>

        {basket?.length !== 0 && (
          <div className={Style.subtotal}>
            <div>
              <p>Subtotal : ({basket?.length}items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift </small>
            </span>
            <Link to="/payment">Continiue to checkout</Link>
            <button className={Style.clearCart_button} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Cart;
