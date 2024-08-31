
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const WhatsAppForm = () => {
    const [userPhone, setUserPhone] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [village, setVillage] = useState('');
    const [errors, setErrors] = useState({});

    const { isAuthenticated } = useAuth0()

    const yourPhoneNumber = '918248834603';


    const handleCancel = (e) => {
        e.preventDefault();
        setUserPhone('');
        setUserMessage('')
        setUserName('')
        setVillage('')
    }

    const validateForm = () => {
        const error = {}

        const mobileNoRegex = /^[6-9]\d{9}$/; // Indian phone number validation
        if (!userPhone.match(mobileNoRegex)) {
            error.userPhone = 'Please enter a valid 10-digit phone number.';
        }

        const userNameRegex = /^[A-Za-z\s]+$/;
        if (!userName.match(userNameRegex)) {
            error.userName = 'Name should contain only letters.';
        }

        if (!village.match(userNameRegex)) {
            error.village = 'Village/city should contain only letters.';
        }
        if (!userMessage) {
            error.userMessage = 'Please type message ';
        }

        return error
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const validation = validateForm()
        if (Object.keys(validation).length > 0) {
            setErrors(validation);
            return
        }


        if (!isAuthenticated) return toast.warning("Please Login..");;
        const encodedMessage = encodeURIComponent(
            `From: ${userPhone}\nUserName: ${userName}\nVillage: ${village}\nMessage: ${userMessage}`
        ).replace(/%20/g, '+').replace(/\n/g, '%0A');

        const whatsappURL = `https://api.whatsapp.com/send?phone=${yourPhoneNumber}&text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
        handleCancel();
    };


    return (
        <div className=" mx-auto w-full max-w-md rounded-lg md:shadow-md py-3 px-2 bg-slate-50 md:p-6">
            <h2 className="text-[18px] md:text-xl font-bold text-center text-green-600 mb-4 md:mb-6">Send a WhatsApp Message</h2>
            <form className='mx-2  md:px-0 '>
                <div className="mb-3 md:mb-4">
                    <label className=" text-[15px] md:text-md block text-gray-700 font-medium mb-1 md:mb-2">Your Phone Number</label>
                    <input
                        type="text"
                        className="w-full p-2.5  border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-sm"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        required
                        id="userPhone"
                    />
                    {errors?.userPhone && <p className="text-red-500 text-xs mt-1">{errors?.userPhone}</p>}
                </div>
                <div className="mb-3 md:mb-4">
                    <label className="text-[15px] md:text-md block text-gray-700 font-medium mb-1 md:mb-2">Your Name</label>
                    <input
                        type="text"
                        className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-sm"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your Name"
                        required
                        id="userName"
                    />
                    {errors?.userName && <p className="text-red-500 text-xs mt-1">{errors?.userName}</p>}
                </div>
                <div className="mb-3 md:mb-4">
                    <label className="text-[15px] md:text-md block text-gray-700 font-medium mb-1 md:mb-2">Village/City</label>
                    <input
                        type="text"
                        id="village"
                        className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-sm"
                        value={village}
                        onChange={(e) => setVillage(e.target?.value)}
                        placeholder="Enter your Name"
                        required
                    />
                    {errors?.village && <p className="text-red-500 text-xs mt-1">{errors?.village}</p>}
                </div>
                <div className="mb-3 md:mb-4">
                    <label className="text-[15px] md:text-md block text-gray-700 font-medium mb-1 md:mb-2">Your Message</label>
                    <textarea
                        className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-sm"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder="Type your message"
                        required
                        id="message"
                    />
                    {errors.userMessage && <p className="text-red-500 text-xs mt-1">{errors.userMessage}</p>}
                </div>

                <div className='flex gap-x-4'>

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Send Message
                    </button>
                    <button
                        onClick={handleCancel}
                        type="submit"
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        cancel
                    </button>
                </div>
                <p className='text-xs md:text-[13px] text-justify text-orange-500 p-2'>If message dosen't navigate, please manually type and send or try using mobile phones</p>


            </form>
        </div>
    );
};

export default WhatsAppForm;
