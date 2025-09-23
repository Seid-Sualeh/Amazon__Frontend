import LowerHeader from "./LowerHeader";
import style from "./Header.module.css";

import image from "../../assets/images/Amazon-logo.jpeg";
import { CiLocationOn } from "react-icons/ci";
// import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";


import { BiCart } from "react-icons/bi";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";
const Header = () => {
  const [{ basket,user }, dispatch] = useContext(DataContext)
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  },0)
  return (
    <section className={style.fixed}>
      <section className={style.header_container}>
        <div className={style.logo_container}>
          <Link to="/">
            <img src={image} alt="logo" />
          </Link>

          <span>
            <CiLocationOn />
          </span>
          <div className={style.delivery}>
            <p>Delivered to</p>
            <span>Ethiopia</span>
          </div>
        </div>
        <div className={style.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" placeholder="Search products" />

          <FaSearch size={38} />
        </div>

        <div className={style.order_container}>
          <Link to="" className={style.language}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/330px-Flag_of_the_United_States_%28Pantone%29.svg.png"
              alt="flag"
            />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </Link>

          <Link to={!user && "/Auth"}>
            <div>
              {user ? (
                <>
                  <p>Hello {user?.email?.split("@")[0]} </p>{" "}
                  <span onClick={() => auth.signOut()}>Sign Out</span>
                </>
              ) : (
                <>
                  <p>Hello Sign in </p>
                  <span>Account and Lists</span>
                </>
              )}
            </div>
          </Link>
          {/* order */}
          <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>
          {/* cart */}
          <Link to="/cart" className={style.cart}>
            <BiCart size={30} />
            <span>{totalItem}</span>
            <p>Cart</p>
          </Link>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
