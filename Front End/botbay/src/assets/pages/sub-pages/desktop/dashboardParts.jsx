import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { MdDownload, MdUpload } from "react-icons/md";
import { RiExpandUpDownFill, RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import PartItem from '../../components/partItem';
import MotorList from '../../components/partStatComponents/Desktop/motor';
import Blocker from '../../components/blocker';
import Sketch from '@uiw/react-color-sketch';
import WarningPopup from '../../components/warningpopup';

function PartsPageDesktop() {
    const [newTagName, setNewTagName] = useState("");
    const [tagError, setTagError] = useState("");

    const [partType, setPartType] = useState(0);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentQuant, setCurrentQuant] = useState(0);
    const [currentNeeded, setCurrentNeeded] = useState(0);

    const [query, setQuery] = useState("");
    const [listResults, setListResults] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isPartOverlayOpen, setIsPartOverlayOpen] = useState(false);

    const [isBlockerOpen, setIsBlockerOpen] = useState(false);
    const [isCreateTagOpen, setIsCreateTagOpen] = useState(false);

    // Load parts from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem("partData");
        if (savedData) {
            setListResults(JSON.parse(savedData));
        } else {
            setListResults([]);
        }
    }, []);

    // Load tags from localStorage
    useEffect(() => {
        const savedTags = localStorage.getItem("taglist");
        if (savedTags) {
            setTags(JSON.parse(savedTags));
        } else {
            setTags([]); // fallback to empty array
            localStorage.setItem("taglist", JSON.stringify([])); // initialize localStorage
        }
    }, []);

    // Add new tag
    const addTag = (tagName, color) => {
        const newTag = { name: tagName, color };
        setTags(prevTags => {
            const updatedTags = [...prevTags, newTag];
            localStorage.setItem("taglist", JSON.stringify(updatedTags));
            return updatedTags;
        });
        onTagExitClick();
    };

    const [hex, setHex] = useState("#fff");
    

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleTag = (tagName) => {
        setSelectedTags(prev =>
            prev.includes(tagName)
                ? prev.filter(t => t !== tagName)
                : [...prev, tagName]
        );
    };

    const renderStatContent = () => <MotorList part={currentItem} />;

    const getContrastYIQ = (hexcolor) => {
        if (!hexcolor) return 'black';
        hexcolor = hexcolor.replace("#", "");
        const r = parseInt(hexcolor.substr(0, 2), 16);
        const g = parseInt(hexcolor.substr(2, 2), 16);
        const b = parseInt(hexcolor.substr(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    };

    const onRowClick = (item) => {
        setCurrentItem(item);
        setIsPartOverlayOpen(true);
        setCurrentQuant(item?.quantity);
        setCurrentNeeded(item?.needed);
    };

    const onExitClick = () => {
        setIsPartOverlayOpen(false);
        setCurrentItem(null);

        const savedData = localStorage.getItem("partData");
        setListResults(savedData ? JSON.parse(savedData) : []);
    };

    const onTagExitClick = () => {
        setIsBlockerOpen(false);
        setIsCreateTagOpen(false);
    }

    const onTagOpenClick = () => {
        setIsBlockerOpen(true);
        setIsCreateTagOpen(true);
    }

    const handleNumChangeClick = (target, operation) => {
        if (target === 0) {
            const newQuant = operation === 0 ? currentQuant + 1 : Math.max(currentQuant - 1, 0);
            setCurrentQuant(newQuant);
            updatePartData(currentItem.id, newQuant, currentNeeded);
        } else {
            const newNeeded = operation === 0 ? currentNeeded + 1 : Math.max(currentNeeded - 1, 0);
            setCurrentNeeded(newNeeded);
            updatePartData(currentItem.id, currentQuant, newNeeded);
        }
    };

    const updatePartData = (id, newQuant, newNeeded) => {
        setListResults(prevList => {
            const updatedList = prevList.map(part => {
                if (part.id === id) {
                    return { ...part, quantity: newQuant, needed: newNeeded };
                }
                return part;
            });
            localStorage.setItem("partData", JSON.stringify(updatedList));
            return updatedList;
        });
    };

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
        const matchesTags = selectedTags.length === 0 || 
            (item.tags && item.tags.some(tag => selectedTags.includes(tag)));

        if (!matchesTags) return false;

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
                            <div style={{ width: '15%' }}>
                                <span style={{ cursor: 'pointer', width: "100%", textAlign: "center" }} onClick={() => reloadPartsList('manufacturerId')}>
                                    Id {getSortIcon('manufacturerId')}
                                </span>
                            </div>
                            <div style={{ width: '50%' }}>
                                <span style={{ cursor: 'pointer', width: "100%", textAlign: "center" }} onClick={() => reloadPartsList('name')}>
                                    Name {getSortIcon('name')}
                                </span>
                            </div>
                            <div style={{ width: '15%' }}>
                                <span style={{ cursor: 'pointer', width: "100%", textAlign: "center" }} onClick={() => reloadPartsList('quantity')}>
                                    Quantity {getSortIcon('quantity')}
                                </span>
                            </div>
                            <div style={{ width: '15%' }}>
                                <span style={{ cursor: 'pointer', width: "100%", textAlign: "center" }} onClick={() => reloadPartsList('needed')}>
                                    Needed {getSortIcon('needed')}
                                </span>
                            </div>
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
                                            <div className="d-add-button d-tag-label" onClick={onTagOpenClick}>
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
            {isBlockerOpen && (<Blocker id="blocker1"></Blocker>)}
            {isCreateTagOpen &&(
                <div className='d-createtagoverlay'>
                    <button className='d-partoverlay-exitbutton' onClick={onTagExitClick}>X</button>
                    <p>Custom Tag</p>
                    {tagError && <p style={{ color: 'red', margin: '0 0 5px 0', fontSize: '0.9rem' }}>{tagError}</p>}
                    <input
                        id="createtaginput"
                        placeholder="Tag Name..."
                        value={newTagName}
                        onChange={(e) => {
                            setNewTagName(e.target.value);
                            setTagError("");
                        }}
                        style={{
                            border: tagError ? '1px solid red' : '1px solid #ccc',
                            padding: '6px 10px',
                            borderRadius: '4px',
                            width: '100%',
                            boxSizing: 'border-box'
                        }}
                    />
                    <Sketch
                        style={{ backgroundColor:"#ffffff", color:'white' }}
                        color={hex}
                        disableAlpha={true}
                        onChange={(color) => {
                            setHex(color.hex);
                        }}
                    />
                    <button
                        onClick={() => {
                            const trimmedName = newTagName.trim();
                            
                            // 1 Check for empty input
                            if (!trimmedName) {
                                setTagError("Tag name cannot be empty");
                                return;
                            }

                            // 2 Check for duplicates
                            const isDuplicate = tags.some(tag => tag.name.toLowerCase() === trimmedName.toLowerCase());
                            if (isDuplicate) {
                                setTagError("Tag name already exists");
                                return;
                            }

                            // Add tag
                            addTag(trimmedName, hex);
                            setNewTagName("");  // reset input
                            setTagError("");       // clear any previous error
                        }}
                    >
                    Create Tag
                    </button>
                </div>
            )}
        </>
    )
}

export default PartsPageDesktop;
