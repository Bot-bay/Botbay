import React, { useState, useEffect } from 'react';

import { MdDownload } from "react-icons/md";
import { MdUpload } from "react-icons/md";
import { RiExpandUpDownFill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";
import { RiArrowUpSFill } from "react-icons/ri";

import PartItem from '../../components/partItem';

function PartsPageDesktop(){
    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await fetch("/partslist.json"); // JSON in public folder
                const data = await response.json();
                setListResults(data); // populate listResults
            } catch (err) {
                console.error("Error loading JSON:", err);
            }
        };
        fetchParts();
    }, []);

    const [query, setQuery] = useState("");
    const [listResults, setListResults] = useState([]);

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) return <RiExpandUpDownFill />;
        return sortConfig.direction === 'asc' ? <RiArrowUpSFill /> : <RiArrowDownSFill />;
    };


    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const reloadPartsList = (sortKey) => {
        let direction = 'asc';

        if (sortConfig.key === sortKey && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sorted = [...listResults].sort((a, b) => {
            let aVal = a[sortKey];
            let bVal = b[sortKey];

            // Handle null manufacturerId
            if (aVal === null) aVal = "";
            if (bVal === null) bVal = "";

            // Sort strings case-insensitively
            if (typeof aVal === "string") aVal = aVal.toLowerCase();
            if (typeof bVal === "string") bVal = bVal.toLowerCase();

            if (aVal < bVal) return direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setListResults(sorted);
        setSortConfig({ key: sortKey, direction });
    };

    return (
        <>
        <div className='d-homepagecontainer'>
            <div className='d-titlecontainer'>
                <p>Parts</p>
                <div className='d-inputwrapper'>
                    {/* <input onChange={handleChange} value={query} className='d-searchbar' placeholder='Search...'></input> */}
                    <input value={query} className='d-searchbar' placeholder='Search...'></input>
                </div>
            </div>
            <div className="d-partslistcontainer">
                <div className="d-titlecontainer-small">
                    <button>+ Add Item</button>
                    <div className='d-titlecontainer-small-downloadwrapper'>
                        <button><MdDownload /><span style={{ marginLeft: 4 }}>CSV</span></button>
                        <button><MdDownload /><span style={{ marginLeft: 4 }}>JSON</span></button>
                        <button><MdUpload /><span style={{ marginLeft: 4 }}>Import</span></button>
                    </div>
                </div>
                <div className="d-partslistwrapper" id="partslistwrapper">
                    <div className="d-partslistheader">
                        <div style={{ width: '15%' }}><span style={{ cursor: 'pointer' }} onClick={() => reloadPartsList('manufacturerId')}>Id {getSortIcon('manufacturerId')}</span></div>
                        <div style={{ width: '50%' }}><span style={{ cursor: 'pointer' }} onClick={() => reloadPartsList('name')}>Name {getSortIcon('name')}</span></div>
                        <div style={{ width: '15%' }}><span style={{ cursor: 'pointer' }} onClick={() => reloadPartsList('quantity')}>Quantity {getSortIcon('quantity')}</span></div>
                        <div style={{ width: '15%' }}><span style={{ cursor: 'pointer' }} onClick={() => reloadPartsList('needed')}>Needed {getSortIcon('needed')}</span></div>
                        <div style={{ width: '5%' }}></div>
                        <div style={{ width: '5%' }}></div>
                    </div>
                    {listResults.map((item) => (
                        <PartItem key={item.id} part={item} />
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}



export default PartsPageDesktop;