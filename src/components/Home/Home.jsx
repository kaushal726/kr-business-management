import React, { useContext, useEffect, useState } from 'react';
import globalContext from '../Context/GlobalState';
import toast from 'react-hot-toast';
import { CSVLink } from 'react-csv';

const Home = () => {
    const [search, setSearch] = React.useState('');
    const { login, updateLogin, token, setToken } = useContext(globalContext);
    const [userDetails, setUserDetails] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('week');


    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://nodejs-api-bm.onrender.com/users/show';
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.accessToken}`,
                },
            };

            try {
                const response = await fetch(url, requestOptions);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (data) {
                    setUserDetails(data);
                    setShowTable(true);
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                toast.error('Try Again');
            }
        };

        fetchData();
    }, [token]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const formattedTimestamp = (timestamp) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        return new Date(timestamp).toLocaleString(undefined, options);
    };

    const filteredUserDetails = userDetails.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const handlePeriodChange = (event) => {
        setSelectedPeriod(event.target.value);
    };

    const createCSVData = () => {
        const csvData = [
            ['Timestamp', 'Name', 'Particular', 'Rate', 'Quantity', 'Discount', 'Total'],
            ...userDetails.map((item) => [
                formattedTimestamp(item.created_at),
                item.name,
                item.particular,
                item.rate,
                item.quantity,
                item.discount,
                item.total,
            ]),
        ];
        return csvData;
    };
    const showToast = () => {
        toast.success(` Excel Downloaded `);
    }

    return (
        <>
            {showTable && (
                <>
                    <section className='w-full flex justify-center items-center'>
                        <label htmlFor="search" className="text-gray-800 w-full">
                            Search by Name:&nbsp;
                            <input
                                className="w-64  px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                                id="search"
                                type="text"
                                value={search}
                                onChange={handleSearch}
                            />
                        </label>
                        <label htmlFor="period" className="text-gray-800 w-full">
                            Select Period:&nbsp;
                            <select
                                id="period"
                                value={selectedPeriod}
                                onChange={handlePeriodChange}
                                className="w-32 px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                            >
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                            </select>
                        </label>
                        <CSVLink
                            data={createCSVData()}
                            filename={`data_${selectedPeriod}.csv`}
                            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={showToast}
                        >
                            Download CSV
                        </CSVLink>
                    </section>
                    <br />
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-blue-500 mt-4">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="border p-2">Timestamp</th>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Particular</th>
                                    <th className="border p-2">Rate</th>
                                    <th className="border p-2">Quantity</th>
                                    <th className="border p-2">Discount</th>
                                    <th className="border p-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUserDetails.map((item, index) => (
                                    <tr
                                        key={item.created_at}
                                        className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
                                    >
                                        <td className=" text-black border p-2">{formattedTimestamp(item.created_at)}</td>
                                        <td className=" text-black border p-2">{item.name}</td>
                                        <td className=" text-black border p-2">{item.particular}</td>
                                        <td className=" text-black border p-2">{item.rate}</td>
                                        <td className=" text-black border p-2">{item.quantity}</td>
                                        <td className=" text-black border p-2">{item.discount}</td>
                                        <td className=" text-black border p-2">{item.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>


    );
};

export default Home;
