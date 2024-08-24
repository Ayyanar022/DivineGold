import React from 'react';
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const ContactUs = () => {
    return (


        <div className="flex flex-col items-center justify-center gap-4 p-4 bg-pink-50 mt-3 md:mt-6 lg:mt-8 rounded-md">
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-800 font-bold text-center">
                Have a Question? We're Here to Help!
            </h2>
            <p className="text-md md:text-lg text-gray-600 text-center">
                If you have any queries or need assistance, feel free to reach out to us. Our team is always ready to provide the support you need.
            </p>
            <Link to="/contectInfo"
                className=" flex items-center  text-md h-7 text-white hover-move  bg-amber-500 hover:bg-amber-600 shadow-md hover:shadow-lg rounded-full px-4 py-[17px] transition-colors duration-300 hover-move"
            >
                <p className="md:text-lg font-semibold tracking-wider cursor-pointer">
                    Contact Us
                </p>
                <span className='cursor-pointer'>
                    <MdKeyboardArrowRight className="w-7 p-1 lg:p-2 h-7 md:h-8 md:w-8 lg:h-9 lg:w-9 " />
                </span>

            </Link>
        </div>

    )
}

export default ContactUs
