import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";

import Style from "./Product.module.css";
import { Link } from "react-router-dom";
import { Types } from "../../Utility/action.type";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
const ProductCard = ({ product, flex, renderDesc,renderAdd }) => {
  const { title, image, price, rating, id, description } = product;

  const [state, dispatch] = useContext(DataContext);
  // console.log(state);
  const addToCart = () => {
    dispatch({
      type: Types.ADD_TO_BASKET,
      item: {
        id,
        title,
        image,
        price,
        rating,
        description,
        
      },
    });
  };

  return (
    <div className={`${Style.card_container} ${flex ? Style.product_flex : ""}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div >
        <h3>{title}</h3>
        {renderDesc && <div style={{
          maxWidth: "750px",
        
         }}>{description} </div>}
        <div className={Style.rating}>
          <Rating
            name="read-only"
            value={rating?.rate}
            readOnly
            precision={0.1}
          />

          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={Style.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
