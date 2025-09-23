
import Carousel from '../../Components/Carousel/Carousel'
import Catagory from '../../Components/Catagory/Catagory'
import Product from '../../Components/product/Product'
import Layout from '../../Components/Layout/Layout'
const Landing = () => {
  return (
      <Layout>
       <Carousel />
       <Catagory />
       <Product />   
    </Layout>
  )
}

export default Landing