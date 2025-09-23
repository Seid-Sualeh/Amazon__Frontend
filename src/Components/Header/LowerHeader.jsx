import React from "react";
import style from "./Header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";

// import { byPrefixAndName } from "@awesome.me/kit-KIT_CODE/icons";
const LowerHeader = () => {
  return (
    <div className={style.lower_container}>
      <ul>
        <li>
          <GiHamburgerMenu />
          <p>All</p>
        </li>
        <li>Today's deals</li>
        <li>Costemer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
};

export default LowerHeader;
