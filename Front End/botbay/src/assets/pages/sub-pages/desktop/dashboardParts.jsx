import React, { useState } from 'react';

function PartsPageDesktop(){
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    // Function to handle input change
    const handleChange = async (e) => {
        const value = e.target.value.trim().toLowerCase();
        setQuery(e.target.value);

        if (!value) {
            setResults([]);
            return;
        }

        try {
            // Fetch the JSON file every time input changes
            const response = await fetch("/teamparts.json"); 
            const data = await response.json();

            const filtered = data.filter(
                (item) =>
                item.name.toLowerCase().includes(value) ||
                item.id.toLowerCase().includes(value)
            );

            setResults(filtered);
        } catch (err) {
            console.error("Error loading JSON:", err);
            setResults([]);
        }
    };
    return (
        <>
        <div className='d-homepagecontainer'>
            <div className='d-titlecontainer'>
                <p>Parts</p>
                <div className='d-inputwrapper'>
                    <input onChange={handleChange} value={query} className='d-searchbar' placeholder='Search...'></input>
                    <div className='d-searchoverlay' id="d-partsearchoverlay">
                        <ul>
                            {results.map((item, index) => (<li style={{ color: "black" }} key={index}>{item.name}</li>))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}



export default PartsPageDesktop;