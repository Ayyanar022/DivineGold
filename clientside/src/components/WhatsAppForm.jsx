
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const WhatsAppForm = () => {
    const [userPhone, setUserPhone] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [userName, setUserName] = useState('');

    const { isAuthenticated } = useAuth0()

    const yourPhoneNumber = '919698358807';

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (!isAuthenticated) return toast.warning("Please Login..")

        const encodedMessage = encodeURIComponent(
            `From: ${userPhone}\nUserName: ${userName}\nMessage: ${userMessage}`
        ).replace(/%20/g, '+').replace(/\n/g, '%0A');

        const whatsappURL = `https://api.whatsapp.com/send?phone=${yourPhoneNumber}&text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
    };

    // const handleSubmit2 = (e) => {
    //     e.preventDefault();

    //     // if (!isAuthenticated) return toast.warning("Please Login..");

    //     const message = `From: ${userPhone}\nUserName: ${userName}\nMessage: ${userMessage}`;
    //     const encodedMessage = encodeURIComponent(message);

    //     const whatsappURL = `https://api.whatsapp.com/send?phone=${yourPhoneNumber}&text=${encodedMessage}`;

    //     setTimeout(() => {
    //         window.open(whatsappURL, '_blank');
    //     }, 500); // 500 milliseconds delay

    // };


    // const handleSubmit3 = (e) => {
    //     e.preventDefault();

    //     // if (!isAuthenticated) return toast.warning("Please Login..");

    //     const message = `From: ${userPhone}\nUserName: ${userName}\nMessage: ${userMessage}`;
    //     const encodedMessage = encodeURIComponent(message);

    //     const whatsappURL = `https://api.whatsapp.com/send?phone=${yourPhoneNumber}&text=${encodedMessage}`;

    //     window.location.href = whatsappURL;
    // }

    const handleSubmit4 = (e) => {
        e.preventDefault();

        // if (!isAuthenticated) {
        //     toast.warning("Please Login..");
        //     return;
        // }


        const message = `From: ${userPhone}\nUserName: ${userName}\nMessage: ${userMessage}`;
        const encodedMessage = encodeURIComponent(message);

        const whatsappURL = `https://wa.me/${yourPhoneNumber}?text=${encodedMessage}`;

        window.location.href = whatsappURL;
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
                    />
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
                    />
                </div>
                <div className="mb-3 md:mb-4">
                    <label className="text-[15px] md:text-md block text-gray-700 font-medium mb-1 md:mb-2">Your Message</label>
                    <textarea
                        className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-sm"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder="Type your message"
                        required
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Send WhatsApp Message
                </button>
                <p className='text-xs md:text-[13px] text-justify text-orange-500 p-2'>If message dosen't navigate, please manually type and send or try using mobile phones</p>


            </form>
        </div>
    );
};

export default WhatsAppForm;
