import React, { useEffect, useState } from "react";

import bnner1 from '../../asserts/BannerImage/brooke-cagle-kElEigko7PU-unsplash.jpg'
import bnner2 from '../../asserts/BannerImage/pexels-fox-1004-58267-998521.jpg'
import bnner3 from '../../asserts/BannerImage/pexels-git-stephen-gitau-302905-1670723.jpg'
import bnner4 from '../../asserts/BannerImage/pexels-pixabay-248077.jpg'
import bnner5 from '../../asserts/BannerImage/pexels-pixabay-37826.jpg'

//Angle-buttons
import { FaAngleRight } from "react-icons/fa"; // right angle
import { FaAngleLeft } from "react-icons/fa"; // left angle


const BannerProduct = () => {
    const [currentBannerImage, setCurrentBannerImage] = useState(0);

    const deskTopBannerImage = [bnner1, bnner2, bnner3, bnner4, bnner5];
    const mobileBannerImage = [bnner1, bnner2, bnner3, bnner4, bnner5];

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
            <div className="h-56 md:h-[410px] lg:h-[450px] w-full bg-slate-200 relative">
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
