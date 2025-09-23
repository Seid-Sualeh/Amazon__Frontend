import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endpoints";
import Style from "./Results.module.css";
// import Style from "../../Components/product/Product.module.css";

import ProductCard from '../../Components/product/ProductCard'
import Loader from "../../Components/Loader/Loader";

const Results = () => {
  const [results, setResults] = useState([]);
  const { catagoryName } = useParams();
  const [IsLoading,setIsLoading]=useState(false)
  
  useEffect(() => {
   
      axios.get(`${productUrl}/products/category/${catagoryName}`)

      .then((res) => {
        console.log(res.data);
        setIsLoading(false)

        setResults(res.data);
      })
        .catch((error) => {
         setIsLoading(false);
        console.log(error);
      });
  }, [catagoryName]);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Catagory/{catagoryName}</p>
     
        <hr />
        {
          IsLoading ? (<Loader />) : (  <div className={Style.products_container}>
          {results?.map((product) => (
            <ProductCard key={product.id}
              renderAdd={true}
              product={product} />
          ))}
        </div>)
        }
      
      </section>
    </Layout>
  );
};

export default Results;
