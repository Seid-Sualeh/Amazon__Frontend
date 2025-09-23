import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Style from "./Product.module.css";
import Loader from "../Loader/Loader";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <>
      {IsLoading ? (
        <Loader />
      ) : (
        <section className={Style.product_container}>
          {products?.map((singleProduct) => (
            <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
          ))}
        </section>
      )}
    </>
  );
};
export default Product;
