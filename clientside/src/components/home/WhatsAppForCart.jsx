
import React, { useEffect, useState } from 'react';

const WhatsAppForCart = ({ data }) => {

    const [userPhone, setUserPhone] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [village, setVillage] = useState('')

    const yourPhoneNumber = '919698358807';

    useEffect(() => {

        if (data.length > 0) {
            const formatdata = data.join('\n')
            setUserMessage(formatdata)
        } else {
            setUserMessage()
        }
    }, [data])


    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure that userMessage is properly encoded for WhatsApp
        const encodedMessage = encodeURIComponent(
            `From: ${userPhone}\nUserName: ${userName}\nVillage:${village}\nMessage:\n${userMessage}`
        ).replace(/%20/g, '+').replace(/\n/g, '%0A');

        // WhatsApp URL with encoded message
        const whatsappURL = `https://api.whatsapp.com/send?phone=${yourPhoneNumber}&text=${encodedMessage}`;

        // Open WhatsApp with the message
        window.open(whatsappURL, '_blank');
    };

    return (
        <div className="flex justify-center items-center  ">
            <div className="w-full max-w-md lg:max-w-lg bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg md:text-xl lg:text:2xl font-bold text-center text-green-600 mb-4 lg:mb-6">Send a WhatsApp Message</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2 md:mb-3 lg:mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Your Phone Number</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Your Vilage or City</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={village}
                            onChange={(e) => setVillage(e.target.value)}
                            placeholder="Enter your Village or City"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Your Message</label>
                        <textarea
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
        </div>
    );
};

export default WhatsAppForCart;
