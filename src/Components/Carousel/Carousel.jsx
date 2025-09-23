import { Carousel } from "react-responsive-carousel";
import { img } from "./Images/data";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import style from "./Carousel.module.css";
const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        inifinityLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img?.map((imageItemLink) => {
          return <img src={imageItemLink} />;
        })}
      </Carousel>
      <div className={style.hero_image}>

      </div>
    </div>
  );
};

export default CarouselEffect;
