import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { MdDownload, MdUpload } from "react-icons/md";
import { RiExpandUpDownFill, RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import PartItem from '../../components/partItem';

import MotorList from '../../components/partStatComponents/Desktop/motor'

function PartsPageDesktop() {

    // Part type indexes:
    // 0 -> Motor
    // 1 -> Servo
    // 2 -> Structural
    // 3 -> Electrical
    // 4 -> Sensor
    // 5 -> 3D Printed
    // 6 -> Machined
    // 7 -> Other
    // 8 -> Wheel

    // *** MORE CAN BE ADDED ON LATER, JUST ADD TO THE INDEX, DO NOT REARRANGE *** //

    const [partType, setPartType] = React.useState(0);

    const [currentItem, setCurrentItem] = useState(null);

    const [currentQuant, setCurrentQuant] = useState(0);
    const [currentNeeded, setCurrentNeeded] = useState(0);

    function handleNumChangeClick(target, operation){
        // Target 0 = quant, target 1 = needed
        // Operation 0 = add, operation 1 = subtract
        if(target == 0){
            if(operation == 0){
                setCurrentQuant(currentQuant + 1);
            }else{
                if(currentQuant - 1 > -1){
                    setCurrentQuant(currentQuant - 1);
                }
            }
        }else{
            if(operation == 0){
                setCurrentNeeded(currentNeeded + 1);
            }else{
                if(currentNeeded - 1 > -1){
                    setCurrentNeeded(currentNeeded - 1);
                }
            }
        }
    }

    const renderStatContent = () => {
        switch(partType) {
            case 0:
                return <MotorList part={currentItem} />;
            case 1:
                return <MotorList part={currentItem} />;
            case 2:
                return <MotorList part={currentItem} />;
            case 3:
                return <MotorList part={currentItem} />;
            case 4:
                return <MotorList part={currentItem} />;
            case 5:
                return <MotorList part={currentItem} />;
            case 6:
                return <MotorList part={currentItem} />;
            case 7:
                return <MotorList part={currentItem} />;
            case 8:
                return <MotorList part={currentItem} />;
            default:
                return <MotorList part={currentItem} />;
        }
    }

    function getContrastYIQ(hexcolor) {
        if (!hexcolor) return 'black';
        hexcolor = hexcolor.replace("#", "");
        const r = parseInt(hexcolor.substr(0, 2), 16);
        const g = parseInt(hexcolor.substr(2, 2), 16);
        const b = parseInt(hexcolor.substr(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

    function onRowClick(item) {
        setCurrentItem(item);
        setIsPartOverlayOpen(true);
        setCurrentQuant(item?.quantity);
        setCurrentNeeded(item?.needed);
    }

    function onExitClick() {
        setIsPartOverlayOpen(false);
        setCurrentItem(null);

        fetch("/partslist.json")
            .then(res => res.json())
            .then(data => setListResults(data))
            .catch(err => console.error("Error reloading JSON:", err));
    }


    const [query, setQuery] = useState("");
    const [listResults, setListResults] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [isPartOverlayOpen, setIsPartOverlayOpen] = useState(false);

    const toggleTag = (tagName) => {
        setSelectedTags(prev =>
            prev.includes(tagName)
                ? prev.filter(t => t !== tagName)
                : [...prev, tagName]
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        fetch("/taglist.json")
            .then(res => res.json())
            .then(data => setTags(data))
            .catch(err => console.error(err));
    }, []);

    const allTags = React.useMemo(() => {
        return Array.from(new Set(listResults.flatMap(part => part.tags || [])));
    }, [listResults]);

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await fetch("/partslist.json");
                const data = await response.json();
                setListResults(data);
            } catch (err) {
                console.error("Error loading JSON:", err);
            }
        };
        fetchParts();
    }, []);

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) return <RiExpandUpDownFill />;
        return sortConfig.direction === 'asc' ? <RiArrowUpSFill /> : <RiArrowDownSFill />;
    };

    const reloadPartsList = (sortKey) => {
        let direction = 'asc';
        if (sortConfig.key === sortKey && sortConfig.direction === 'asc') direction = 'desc';

        const sorted = [...listResults].sort((a, b) => {
            let aVal = a[sortKey] ?? "";
            let bVal = b[sortKey] ?? "";

            if (typeof aVal === "string") aVal = aVal.toLowerCase();
            if (typeof bVal === "string") bVal = bVal.toLowerCase();

            if (aVal < bVal) return direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setListResults(sorted);
        setSortConfig({ key: sortKey, direction });
    };

    const filteredResults = listResults.filter(item => {
        // 1. TAG PRIORITY (The Gatekeeper)
        // If user has selected tags, the item MUST match at least one selected tag.
        // If no tags are selected, we let everything through to the search filter.
        const matchesTags = selectedTags.length === 0 || 
            (item.tags && item.tags.some(tag => selectedTags.includes(tag)));

        if (!matchesTags) return false;

        // 2. SEARCH MATCH
        // Only items that passed the tag filter get checked for the search query.
        const lowerQuery = query.toLowerCase();
        const matchesQuery = (
            item.name.toLowerCase().includes(lowerQuery) ||
            (item.manufacturerId && item.manufacturerId.toLowerCase().includes(lowerQuery))
        );

        return matchesQuery;
    });

    return (
        <>
            <div className='d-homepagecontainer'>
                <div className='d-titlecontainer'>
                    <p>Parts</p>
                    <div className='d-inputwrapper'>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className='d-searchbar'
                            placeholder='Search...'
                        />
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
                            <div style={{ width: '15%' }}><span style={{ cursor: 'pointer', width: "100%", textAlign: "center" }} onClick={() => reloadPartsList('manufacturerId')}>Id {getSortIcon('manufacturerId')}</span></div>
                            <div style={{ width: '50%' }}><span style={{ cursor: 'pointer', width: "100%", textAlign: "center" }} onClick={() => reloadPartsList('name')}>Name {getSortIcon('name')}</span></div>
                            <div style={{ width: '15%' }}><span style={{ cursor: 'pointer', width: "100%", textAlign: "center" }} onClick={() => reloadPartsList('quantity')}>Quantity {getSortIcon('quantity')}</span></div>
                            <div style={{ width: '15%' }}><span style={{ cursor: 'pointer', width: "100%", textAlign: "center" }} onClick={() => reloadPartsList('needed')}>Needed {getSortIcon('needed')}</span></div>
                            <div style={{ width: '10%', display: 'flex', justifyContent: 'center' }}>
                                <div className="custom-tag-dropdown" ref={dropdownRef}>
                                    <button 
                                        type="button"
                                        className="d-dropdown-btn"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <span>
                                            {selectedTags.length > 0 
                                                ? `${selectedTags.length} Selected` 
                                                : "Tags"}
                                        </span>
                                        {isDropdownOpen ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="d-dropdown-menu">
                                            {tags.map(tag => (
                                                <label 
                                                    key={tag.name} 
                                                    className="d-tag-label"
                                                    style={{ 
                                                        backgroundColor: tag.color, 
                                                        color: getContrastYIQ(tag.color) 
                                                    }}
                                                >
                                                    <input 
                                                        type="checkbox" 
                                                        className="d-tag-checkbox"
                                                        checked={selectedTags.includes(tag.name)}
                                                        onChange={() => toggleTag(tag.name)}
                                                    />
                                                    {tag.name}
                                                </label>
                                            ))}

                                            <div className="d-add-button d-tag-label" onClick={() => console.log("Add Tag Logic Here")}>
                                                <span style={{ marginRight: '12px', fontSize: '1rem', lineHeight: 0 }}>+</span>Add Tag
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {filteredResults.map((item) => (
                            <PartItem key={item.id} part={item} onRowClick={onRowClick} />
                        ))}
                    </div>
                </div>
            </div>
            {isPartOverlayOpen && currentItem && (
                <div id="d-partoverlay" className='d-partoverlay'>
                    <div className='leftcontainer'>
                        <div className='thirdcontainer'>
                            <div className='d-titlecontainer' style={{paddingLeft:"5%", fontSize:"2rem"}}>
                                <p>{currentItem?.name}</p>
                            </div>
                            <img src={currentItem?.icon} alt={currentItem?.name} />
                            <div className='d-partoverlay-infodiv1'>
                                <p>Links:</p>
                                <ul>
                                    {currentItem?.links &&
                                        Object.entries(currentItem.links)
                                        .filter(([name, url]) => url)
                                        .map(([name, url]) => (
                                            <li key={name}>
                                            <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='thirdcontainer'>
                            <div className='d-partoverlay-infodiv1'>
                                <p>Stats:</p>
                                {renderStatContent()}
                            </div>
                            <div className='d-partoverlay-infodiv1'>
                                <div className='leftcontainer'>
                                    <div className='halfcontainer'>
                                        <div className='d-partoverlay-editquant'>
                                            <button onClick={() => handleNumChangeClick(0, 1)}>-</button>
                                            <p>Quantity: {currentQuant}</p>
                                            <button onClick={() => handleNumChangeClick(0, 0)}>+</button>
                                        </div>
                                    </div>
                                    <div className='halfcontainer'>
                                        <div className='d-partoverlay-editquant'>
                                            <button onClick={() => handleNumChangeClick(1, 1)}>-</button>
                                            <p>Needed: {currentNeeded}</p>
                                            <button onClick={() => handleNumChangeClick(1, 0)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='thirdcontainer'>
                            <div className='d-partoverlay-infodiv1'>
                                <p>Tags:</p>
                                <ul>
                                    {currentItem?.tags?.map(tag => (
                                        <li key={tag}>{tag}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <button className='d-partoverlay-exitbutton' onClick={onExitClick}>X</button>
                </div>
            )}
        </>
    )
}

export default PartsPageDesktop;