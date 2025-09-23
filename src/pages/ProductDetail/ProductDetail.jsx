import { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout';
import { useParams } from 'react-router';
import axios from 'axios'
import { productUrl } from '../../Api/endpoints';
import ProductCard from '../../Components/product/ProductCard';
import Loader from '../../Components/Loader/Loader';

const ProductDetail = () => {
  const { productId } = useParams();
  const [Detail, setDetail] = useState([]);
const[isLoading,setisLoading]=useState(false)
  useEffect(() => {
    setisLoading(true)
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setDetail(res.data);
        setisLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false)
      });
  }, [productId]);
  return (
    <Layout>
      {isLoading ? (< Loader />) : (<ProductCard product={Detail}
        flex={true}
        renderDesc={
          true
        }
        renderAdd={true}


      />)}
    
    </Layout>
  );
}

export default ProductDetail