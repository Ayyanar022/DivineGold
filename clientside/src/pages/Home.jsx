import React from "react";
import BannerProduct from "../components/home/BannerProduct.jsx";
import RoundDesigns from "../components/home/RoundDesigns.jsx";
import SomeExplanation from "../components/home/SomeExplanation.jsx";
import JewllCategory from "../components/home/JewllCategory.jsx";
import GuidPart from "../components/home/GuidPart.jsx";
import Benifits from "../components/home/Benifits.jsx";

const Home = () => {
  return <div className=" container mx-auto px-6">

    <BannerProduct />
    <RoundDesigns />
    <SomeExplanation />
    <JewllCategory />
    <GuidPart />
    <Benifits />
    
  </div>;
};

export default Home;
