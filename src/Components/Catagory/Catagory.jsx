
import { CatagoryInfo } from "./CatagoryFullInfo";
import CatagoryCard from "./CatagoryCard";
// import style from './catagory.module.css';
import style from "./Catagory.module.css."
function Catagory() {
  return (
    <section className={style.catagory_container}>
      {CatagoryInfo?.map((info) => (
        <CatagoryCard data={info} />
      ))}
         
    </section>
  );
}

export default Catagory;




