import React from "react";
import BannerProduct from "../components/home/BannerProduct.jsx";
import RoundDesigns from "../components/home/RoundDesigns.jsx";
import SomeExplanation from "../components/home/SomeExplanation.jsx";
import JewllCategory from "../components/home/JewllCategory.jsx";
import GuidPart from "../components/home/GuidPart.jsx";
import Benifits from "../components/home/Benifits.jsx";
import GenderComponent from "../components/home/GenderComponent.jsx";

const Home = () => {
  return <div className=" container mx-auto px-6 mb-14">

    {/* ITS FOR MARQUE TAG */}
    <div className="bg-gradient-to-br from-cyan-950 to-slate-950 p-4 text-white overflow-hidden whitespace-nowrap w-full">
      <div className="inline-block w-full tracking-wide animate-marquee-lg" style={{ whiteSpace: "nowrap" }}>
        Welcome To <span className="tracking-wider">DIVINEGOLD</span>. Find the best price in the market. Get Prize tokens by reference and get more discounts....
      </div>
    </div>

    <BannerProduct />
    <RoundDesigns />
    <JewllCategory />
    <Benifits />
    <GenderComponent />


  </div>;
};

export default Home;
