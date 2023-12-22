import React, { useContext, useEffect, useState } from 'react'
import globalContext from '../Context/GlobalState';


const Details = () => {
    const { login, updateLogin, token, setToken } = useContext(globalContext);
    const initialFormData = {
        name: '',
        particular: '',
        rate: '',
        discount: '',
        quantity: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        try {
            const response = await fetch('https://nodejs-api-bm.onrender.com/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.accessToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Form data submitted successfully');
                setFormData(initialFormData);
            } else {
                console.error('Error submitting form data');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-yellow-500">
            <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
                <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    🔥 Enter Your Details 🔥
                </h1>

                <form onSubmit={handleSubmit} >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border text-black outline-orange-700  font-semibold rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="particular" className="block text-sm font-medium text-gray-600">
                            Particular:
                        </label>
                        <input
                            type="text"
                            id="particular"
                            name="particular"
                            value={formData.particular}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md text-black outline-orange-700  font-semibold"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="rate" className="block text-sm font-medium text-gray-600">
                                Rate:
                            </label>
                            <input
                                type="number"
                                id="rate"
                                name="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md text-black outline-orange-700  font-semibold"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="discount" className="block text-sm font-medium text-gray-600">
                                Discount:
                            </label>
                            <input
                                type="number"
                                id="discount"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md text-black outline-orange-700  font-semibold"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-600">
                            Quantity:
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md text-black outline-orange-700  font-semibold"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-red-600 text-white px-4 w-full py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Details