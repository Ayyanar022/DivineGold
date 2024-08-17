
import React, { useState } from 'react';

const WhatsAppForm = () => {
    const [userPhone, setUserPhone] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [userName, setUserName] = useState('');

    const yourPhoneNumber = '+919698358807'; // Your WhatsApp number

    const handleSubmit = (e) => {
        e.preventDefault();

        // Encode the message to ensure it works in the URL
        const encodedMessage = encodeURIComponent(
            `From: ${userPhone}\nUserName: ${userName}\nMessage: ${userMessage}`
        );

        const whatsappURL = `https://wa.me/${yourPhoneNumber}?text=${encodedMessage}`;

        // Open WhatsApp with the pre-filled message
        window.open(whatsappURL, '_blank');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl md:text-2xl font-bold text-center text-green-600 mb-6">Send a WhatsApp Message</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
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

export default WhatsAppForm;
