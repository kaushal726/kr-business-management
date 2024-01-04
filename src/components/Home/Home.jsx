import React, { useContext, useEffect, useState } from 'react';
import globalContext from '../Context/GlobalState';
import toast from 'react-hot-toast';
import { CSVLink } from 'react-csv';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useSort } from "@table-library/react-table-library/sort";
const COLUMNS = [
    { label: 'Name', renderCell: (item) => item.name },
    { label: 'Particular', renderCell: (item) => item.particular },
    { label: 'Rate', renderCell: (item) => item.rate },
    { label: 'Quantity', renderCell: (item) => item.quantity },
    { label: 'Discount', renderCell: (item) => item.discount },
    { label: 'Total', renderCell: (item) => item.total },
];


const Home = () => {
    const [search, setSearch] = React.useState('');
    const { login, updateLogin, token, setToken } = useContext(globalContext);
    const [nodes, setUserDetails] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState("Week");


    const theme = useTheme([
        getTheme(),
        {
            HeaderRow: `
            background-color: #eaf5fd;
          `,
            Row: `
            &:nth-of-type(odd) {
              background-color: #d2e9fb;
            }

            &:nth-of-type(even) {
              background-color: #eaf5fd;
            }
          `,
        },
    ])

    // let data;
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
                    console.log(data);
                    if (data.hasOwnProperty('Error')) {
                        updateLogin(false);

                    }
                    else {
                        setUserDetails(data);
                        setShowTable(true);
                    }

                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                updateLogin(false);
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

    const filteredArray = nodes.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const handlePeriodChange = (event) => {
        setSelectedPeriod(event.target.value);
    };

    const createCSVData = () => {
        console.log(nodes);
        const csvData = [
            ['Timestamp', 'Name', 'Particular', 'Rate', 'Quantity', 'Discount', 'Total'],
            ...nodes.map((item) => [
                formattedTimestamp(item.created_at),
                item.name,
                item.particular,
                item.rate,
                item.quantity,
                item.discount,
                item.total,
            ]),
        ];
        console.log(csvData);
        return csvData;
    };
    const showToast = () => {
        toast.success(` Excel Downloaded `);
    }

    const downloadCSV = () => {
        if (selectedPeriod == "Day") {

        }
        else if (selectedPeriod == "Week") {

        }
        else if (selectedPeriod == "Month") {

        }
        else if (selectedPeriod == "Year") {

        }

    }

    let data = { nodes };
    const sort = useSort(
        data,
        {
            onChange: onSortChange,
        },
        {
            sortFns: {
                Name: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
                Particular: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
                Rate: (array) => array.sort((a, b) => a.deadline - b.deadline),
                Quantity: (array) => array.sort((a, b) => a.deadline - b.deadline),
                Discount: (array) =>
                    array.sort((a, b) => a.deadline - b.deadline),
                Total: (array) =>
                    array.sort((a, b) => a.deadline - b.deadline),
            },
        }
    );
    function onSortChange(action, state) {
        console.log(action, state);
    }
    const COLUMNS = [
        {
            label: "Name",
            renderCell: (item) => item.name,
            sort: { sortKey: "Name" },
        },
        {
            label: "Particular",
            renderCell: (item) => item.particular,
            sort: { sortKey: "Particular" },
        },
        {
            label: "Rate",
            renderCell: (item) => item.rate,
            sort: { sortKey: "Rate" },
        },
        {
            label: "Quantity",
            renderCell: (item) => item.quantity,
            sort: { sortKey: "Quantity" },
        },
        {
            label: "Discount",
            renderCell: (item) => item.discount,
            sort: { sortKey: "Discount" },
        },
        {
            label: "Total",
            renderCell: (item) => item.total,
            sort: { sortKey: "Total" },
        },
    ];

    const VIRTUALIZED_OPTIONS = {
        rowHeight: (_item, _index) => 33,
    };

    data = {
        nodes: data.nodes.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        ),
    };

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
                    <div style={{ height: "410px" }}>
                        <CompactTable
                            columns={COLUMNS}
                            data={data}
                            theme={theme}
                            sort={sort}
                            virtualizedOptions={VIRTUALIZED_OPTIONS}
                            layout={{ isDiv: false, fixedHeader: true }}
                        />
                    </div>
                </>
            )}
        </>


    );
};

export default Home;
