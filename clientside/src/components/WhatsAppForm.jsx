
import React, { useState } from 'react';

const WhatsAppForm = () => {
    const [userPhone, setUserPhone] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [userName, setUserName] = useState('');

    const yourPhoneNumber = '919698358807';

    const handleSubmit = (e) => {
        e.preventDefault();

        const encodedMessage = encodeURIComponent(
            `From: ${userPhone}\nUserName: ${userName}\nMessage: ${userMessage}`
        ).replace(/%20/g, '+').replace(/\n/g, '%0A');

        const whatsappURL = `https://api.whatsapp.com/send?phone=${yourPhoneNumber}&text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
    };

    return (
        <div className=" mx-auto w-full max-w-md rounded-lg md:shadow-md py-3 px-2 bg-slate-50 md:p-6">
            <h2 className="text-[17px] md:text-xl font-bold text-center text-green-600 mb-4 md:mb-6">Send a WhatsApp Message</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 md:mb-4">
                    <label className=" text-[14px] md:text-md block text-gray-700 font-medium mb-1 md:mb-2">Your Phone Number</label>
                    <input
                        type="text"
                        className="w-full px-3 py-1 md:py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-sm"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        required
                    />
                </div>
                <div className="mb-3 md:mb-4">
                    <label className="text-[14px] md:text-md block text-gray-700 font-medium mb-1 md:mb-2">Your Name</label>
                    <input
                        type="text"
                        className="w-full px-3 py-1 md:py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-sm"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your Name"
                        required
                    />
                </div>
                <div className="mb-3 md:mb-4">
                    <label className="text-[14px] md:text-md block text-gray-700 font-medium mb-1 md:mb-2">Your Message</label>
                    <textarea
                        className="w-full px-3 py-1 md:py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-sm"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder="Type your message"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Send WhatsApp Message
                </button>
            </form>
        </div>
    );
};

export default WhatsAppForm;
