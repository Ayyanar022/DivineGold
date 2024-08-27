

import React, { useEffect, useState } from "react";
import bnner1 from '../../asserts/BannerImage/brooke-cagle-kElEigko7PU-unsplash.jpg';
import bnner2 from '../../asserts/BannerImage/pexels-fox-1004-58267-998521.jpg';
import bnner3 from '../../asserts/BannerImage/pexels-git-stephen-gitau-302905-1670723.jpg';
import bnner4 from '../../asserts/BannerImage/pexels-pixabay-248077.jpg';
import bnner5 from '../../asserts/BannerImage/pexels-pixabay-37826.jpg';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

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
        <div className="relative mx-auto w-full">
            <div className="relative h-56 md:h-[410px] lg:h-[450px] w-full bg-slate-200">
                <div className="absolute z-10 w-full h-full flex justify-between items-center px-4 md:px-6 lg:px-8">
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

                {/* Desktop and Tablet Version */}
                <div className="hidden md:block h-full w-full overflow-hidden">
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
                                    alt={`Slide ${index + 1}`}
                                    loading="lazy"
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
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
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
