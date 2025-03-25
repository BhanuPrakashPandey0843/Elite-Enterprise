import React from "react";
import Carouselfile from "./Carouselfile";
import Imgsfile from "./Imgsfile";
import Brands from "./Brands";

import Cardsimgs from "./Cardsimgs";
import Ourproducts from "./Ourproducts";


const Home = ({ handleShow2 }) => {
  return (
    <div>
      <Carouselfile />
      <Imgsfile />
      <Ourproducts handleShow2={handleShow2}/>
      <Brands />

      <Cardsimgs />
    </div>
  );
};

export default Home;
