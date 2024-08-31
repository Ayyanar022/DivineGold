import React, { useEffect, useState } from 'react';

const WhatsAppForCart = ({ data }) => {
    const [userPhone, setUserPhone] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [village, setVillage] = useState('');
    const [errors, setErrors] = useState({});

    const yourPhoneNumber = '918248834603';

    const handleCancel = (e) => {
        e?.preventDefault();
        setUserPhone('');
        setUserMessage('');
        setUserName('');
        setVillage('');
        setErrors({});
    };

    useEffect(() => {
        if (data.length > 0) {
            const formatdata = data.join('\n');
            setUserMessage(formatdata);
        } else {
            setUserMessage('');
        }
    }, [data]);

    const validateForm = () => {
        const errors = {};

        // Validate phone number
        const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number validation
        if (!userPhone.match(phoneRegex)) {
            errors.userPhone = 'Please enter a valid 10-digit phone number.';
        }

        // Validate name
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!userName.match(nameRegex)) {
            errors.userName = 'Name should contain only letters.';
        }

        // Validate village
        if (!village.match(nameRegex)) {
            errors.village = 'Village should contain only letters.';
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e?.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Ensure that userMessage is properly encoded for WhatsApp
        const encodedMessage = encodeURIComponent(
            `From: ${userPhone}\nUserName: ${userName}\nVillage:${village}\nMessage:\n${userMessage}`
        ).replace(/%20/g, '+').replace(/\n/g, '%0A');

        // WhatsApp URL with encoded message
        const whatsappURL = `https://api.whatsapp.com/send?phone=${yourPhoneNumber}&text=${encodedMessage}`;

        // Open WhatsApp with the message
        window.open(whatsappURL, '_blank');

        handleCancel();
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-md lg:max-w-lg bg-white rounded-lg shadow-md py-3 px-2 lg:py-5 lg:px-8 lg:mx-10">
                <h2 className="text-lg md:text-lg lg:text-[21px] font-bold text-center text-green-600 mb-4">
                    Send a WhatsApp Message
                </h2>
                <form>
                    <div className="mb-2 md:mb-3 lg:mb-4">
                        <label className="block text-gray-700 text-sm md:text-md lg:text-[16px] font-medium mb-1 md:mb-2">
                            Your Phone Number
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border text-sm md:text-md lg:text-[16px] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            required
                        />
                        {errors.userPhone && <p className="text-red-500 text-xs mt-1">{errors.userPhone}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm md:text-md lg:text-[16px] font-medium mb-1 md:mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border text-sm md:text-md lg:text-[16px] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your Name"
                            required
                        />
                        {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm md:text-md lg:text-[16px] font-medium mb-1 md:mb-2">
                            Your Village or City
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border text-sm md:text-md lg:text-[16px] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={village}
                            onChange={(e) => setVillage(e.target.value)}
                            placeholder="Enter your Village or City"
                            required
                        />
                        {errors.village && <p className="text-red-500 text-xs mt-1">{errors.village}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm md:text-md lg:text-[16px] font-medium mb-1 md:mb-2">
                            Your Message
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border text-sm md:text-md lg:text-[16px] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Type your message"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            Send Message
                        </button>
                        <button
                            onClick={handleCancel}
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WhatsAppForCart;
