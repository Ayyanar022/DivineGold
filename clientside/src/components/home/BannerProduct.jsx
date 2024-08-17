import React, { useEffect, useState } from "react";
import image1 from "../../asserts/banner/img1.webp";
import image2 from "../../asserts/banner/img2.webp";
import image3 from "../../asserts/banner/img3.jpg";
import image4 from "../../asserts/banner/img4.jpg";
import image5 from "../../asserts/banner/img5.webp";

import mob_1 from "../../asserts/banner/img1_mobile.jpg";
import mob_2 from "../../asserts/banner/img2_mobile.webp";
import mob_3 from "../../asserts/banner/img3_mobile.jpg";
import mob_4 from "../../asserts/banner/img4_mobile.jpg";
import mob_5 from "../../asserts/banner/img5_mobile.png";

//Angle-buttons
import { FaAngleRight } from "react-icons/fa"; // right angle
import { FaAngleLeft } from "react-icons/fa"; // left angle


const BannerProduct = () => {
    const [currentBannerImage, setCurrentBannerImage] = useState(0);

    const deskTopBannerImage = [image1, image2, image3, image4, image5];
    const mobileBannerImage = [mob_1, mob_2, mob_3, mob_4, mob_5];

    const nextImage = () => {
        setCurrentBannerImage((prev) =>
            prev === deskTopBannerImage.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentBannerImage((prev) =>
            prev === 0 ? deskTopBannerImage.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mx-auto">
            <div className="h-56 md:h-[450px] w-full bg-slate-200 relative">
                <div className="absolute z-10 w-full h-full flex items-center">
                    <div className="md:flex justify-between items-center w-full hidden">
                        <button
                            onClick={prevImage}
                            className="text-xl bg-slate-100 rounded-full shadow-md hover:bg-white ml-4 hover:scale-125 transition-all"
                        >
                            <FaAngleLeft />
                        </button>
                        <button
                            onClick={nextImage}
                            className="text-xl bg-slate-100 rounded-full shadow-md hover:bg-white mr-4 hover:scale-125 transition-all"
                        >
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                {/**desktop and tablet version */}
                <div className="hidden md:flex h-full w-full overflow-hidden">
                    <div
                        className="flex transition-transform duration-1000 ease-in-out"
                        style={{
                            transform: `translateX(-${currentBannerImage * 100}%)`,
                        }}
                    >
                        {deskTopBannerImage.map((banner, index) => (
                            <div
                                key={index}
                                className="w-full h-full min-w-full min-h-full"
                            >
                                <img
                                    src={banner}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/**mobile version */}
                <div className="flex h-full w-full overflow-hidden md:hidden">
                    <div
                        className="flex transition-transform duration-1000 ease-in-out"
                        style={{
                            transform: `translateX(-${currentBannerImage * 100}%)`,
                        }}
                    >
                        {mobileBannerImage.map((banner, index) => (
                            <div
                                key={index}
                                className="w-full h-full min-w-full min-h-full"
                            >
                                <img
                                    src={banner}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default BannerProduct;
