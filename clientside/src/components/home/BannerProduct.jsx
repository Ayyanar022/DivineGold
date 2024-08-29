

import React, { useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";


import bnner1 from '../../asserts/tinifiedBannerBigIMG/brooke-cagle-kElEigko7PU-unsplash.jpg'
import bnner2 from '../../asserts/tinifiedBannerBigIMG/pexels-fox-1004-58267-998521.jpg';
import bnner3 from '../../asserts/tinifiedBannerBigIMG/pexels-kampus-8790803.jpg';
import bnner6 from '../../asserts/tinifiedBannerBigIMG/pexels-pixabay-37826.jpg';
import bnner7 from '../../asserts/tinifiedBannerBigIMG/pexels-thomas-beaman-460315958-15613451.jpg';
import bnner8 from '../../asserts/tinifiedBannerBigIMG/pexels-weddingphotography-6593858.jpg';
import bnner9 from '../../asserts/tinifiedBannerBigIMG/pexels-zacks1981-14275337.jpg';

//Mobile
import Mobbnner1 from '../../asserts/tinifiedBannerImage/smallBanner_1.jpg';
import Mobbnner3 from '../../asserts/tinifiedBannerImage/smallBanner_4.jpg';
import Mobbnner6 from '../../asserts/tinifiedBannerImage/smallBanner_8.jpg';
import Mobbnner7 from '../../asserts/tinifiedBannerImage/smallBanner_9.jpg';
import Mobbnner8 from '../../asserts/tinifiedBannerImage/pexels-weddingphotography-6593858 (1).jpg';
import Mobbnner9 from '../../asserts/tinifiedBannerImage/pexels-pixabay-37826.jpg';
import Mobbnner11 from '../../asserts/tinifiedBannerImage/pexels-thomas-beaman-460315958-15613451 (1).jpg';
import Mobbnner12 from '../../asserts/tinifiedBannerImage/brooke-cagle-kElEigko7PU-unsplash.jpg';


const BannerProduct = () => {
    const [currentBannerImage, setCurrentBannerImage] = useState(0);

    const deskTopBannerImage = [bnner8, bnner9, bnner1, bnner6, bnner2, bnner7, bnner3,];
    const mobileBannerImage = [Mobbnner1, Mobbnner11, Mobbnner8, Mobbnner12, Mobbnner3, Mobbnner6, Mobbnner9, Mobbnner7,];

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
        <div className="relative mx-auto w-full">
            <div className="relative h-52 md:h-[410px] lg:h-[450px] w-full bg-orange-600">

                {/** LEFTT AND RIGHT ARROWS */}
                <div className="absolute hidden  z-10 w-full h-full md:flex justify-between items-center px-4 md:px-6 lg:px-8">
                    <button
                        onClick={prevImage}
                        className="text-3xl md:text-4xl bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-lg transition-all"
                        aria-label="Previous Slide"
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        onClick={nextImage}
                        className="text-3xl md:text-4xl bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-lg transition-all"
                        aria-label="Next Slide"
                    >
                        <FaAngleRight />
                    </button>
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


                {/* Mobile Version */}
                <div className="block md:hidden h-full w-full overflow-hidden">
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
                                    alt={`Slide ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
                    {deskTopBannerImage.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentBannerImage === index
                                ? "bg-white"
                                : "bg-gray-400"
                                }`}
                            onClick={() => setCurrentBannerImage(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;
