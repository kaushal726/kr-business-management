import React, { useContext, useEffect, useState } from 'react'
import globalContext from '../Context/GlobalState';
import toast from 'react-hot-toast';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useRowSelect } from "@table-library/react-table-library/select";
import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from "@table-library/react-table-library/table";

let data;
let COLUMNS;
let nodes = [];
const Home = () => {
    const [search, setSearch] = React.useState("");
    const { login, updateLogin, token, setToken } = useContext(globalContext);
    const [userDetails, setUserDetails] = useState([]);
    const [showTable, setShowTable] = useState(false);


    function onSelectChange(action, state) {
        console.log(action, state);
    }
    const theme = useTheme([
        getTheme(),
        {
            Table: `
            --data-table-library_grid-template-columns:  44px repeat(5, minmax(0, 1fr));
          `,
        },
        {
            HeaderRow: `
            background-color: #aeacb0;
          `,
            Row: `
            &:nth-of-type(odd) {
              background-color: #d2f7fa;
            }

            &:nth-of-type(even) {
              background-color: #99ecf2;
            }
          `,
        },
    ]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };
    useEffect(() => {
        const url = 'http://localhost:3000/users/show';
        console.log(token);
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
            }
        };
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    loadTable(data);
                    setUserDetails(data);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                toast.error(' Try Again');
            });
    }, [])

    let loadTable = (userInfos) => {
        nodes = []
        userInfos.map(info => {
            let obj = {
                name: info.name,
                Particular: info.particular,
                Rate: info.rate,
                Quantity: info.quantity,
                Discount: info.discount,
                Total: info.total,
                Timestamp: info.created_at
            }
            nodes.push(obj)
        })
        data = { nodes };

        data = {
            nodes: data.nodes.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            ),
        };
        console.log(data);
        COLUMNS = [
            { label: 'TimeStamp', renderCell: (item) => item.Timestamp, select: true },
            { label: 'Name', renderCell: (item) => item.name },
            {
                label: 'Particular', renderCell: (item) => item.Particular
            },
            { label: 'Rate', renderCell: (item) => item.Rate },
            {
                label: 'Quantity',
                renderCell: (item) => item.Quantity,
            },
            { label: 'Discount', renderCell: (item) => item.Discount },
            { label: 'Total', renderCell: (item) => item.Total },

        ];
        setShowTable(true);
    }
    data = { nodes };
    const select = useRowSelect(data, {
        onChange: onSelectChange,
    });
    data = {
        nodes: data.nodes.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        ),
    };

    const escapeCsvCell = (cell) => {
        if (cell == null) {
            return "";
        }
        const sc = cell.toString().trim();
        if (sc === "" || sc === '""') {
            return sc;
        }
        if (
            sc.includes('"') ||
            sc.includes(",") ||
            sc.includes("\n") ||
            sc.includes("\r")
        ) {
            return '"' + sc.replace(/"/g, '""') + '"';
        }
        return sc;
    };

    const makeCsvData = (columns, data) => {
        return data.reduce((csvString, rowItem) => {
            return (
                csvString +
                columns
                    .map(({ accessor }) => escapeCsvCell(accessor(rowItem)))
                    .join(",") +
                "\r\n"
            );
        }, columns.map(({ name }) => escapeCsvCell(name)).join(",") + "\r\n");
    };


    const downloadAsCsv = (columns, data, filename) => {
        const csvData = makeCsvData(columns, data);
        const csvFile = new Blob([csvData], { type: "text/csv" });
        const downloadLink = document.createElement("a");

        downloadLink.display = "none";
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    const handleDownloadCsv = () => {
        const columns = [
            { accessor: (item) => item.Timestamp, name: "Timestamp" },
            { accessor: (item) => item.name, name: "Name" },
            { accessor: (item) => item.Particular, name: "Particular" },
            { accessor: (item) => item.Rate, name: "Rate" },
            { accessor: (item) => item.Quantity, name: "Quantity" },
            { accessor: (item) => item.Discount, name: "Discount" },
            { accessor: (item) => item.Total, name: "Total" },

        ];

        downloadAsCsv(columns, data.nodes, "table");
    };
    return (
        <>
            {showTable && (
                <>
                    <button className='text-white' type="button" onClick={handleDownloadCsv}>
                        Download as CSV
                    </button>
                    <label htmlFor="search">
                        Search by Name:&nbsp;
                        <input className='w-12' id="search" type="text" value={search} onChange={handleSearch} />
                    </label>
                    <br />
                    <CompactTable
                        columns={COLUMNS}
                        data={data}
                        theme={theme}
                        layout={{ custom: false }}
                        select={select}
                    />
                </>
            )}
        </>
    )
}

export default Home