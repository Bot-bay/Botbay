import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { MdDownload, MdUpload } from "react-icons/md";
import {
    RiExpandUpDownFill,
    RiArrowDownSFill,
    RiArrowUpSFill,
} from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import PartItem from "../../components/partItem";
import MotorList from "../../components/partStatComponents/Desktop/motor";
import ServoList from "../../components/partStatComponents/Desktop/servo";
import StructuralList from "../../components/partStatComponents/Desktop/structural";
import ElectricalList from "../../components/partStatComponents/Desktop/electrical";
import SensorList from "../../components/partStatComponents/Desktop/sensor";
import PrintedList from "../../components/partStatComponents/Desktop/3dprint";
import MachinedList from "../../components/partStatComponents/Desktop/machined";
import Blocker from "../../components/blocker";
import Sketch from "@uiw/react-color-sketch";
import WarningPopup from "../../components/warningpopup";

import { AddItemMenuDesktop } from "../../components/addItem";

function PartsPageDesktop() {
    const [isEditPartOpen, setIsEditPartOpen] = useState(false);

    function handleEditOpen() {
        setIsEditPartOpen(true);
        onExitClick();

        const partTypeMap = {
            motor: 0,
            servo: 1,
            structural: 2,
            electrical: 3,
            sensor: 4,
            "3d-printed": 5,
            machined: 6,
            other: 7,
            wheel: 8,
        };
        setPartType(partTypeMap[item.stats.type]);
        setCurrentItem(item);
    }

    function handleEditClose() {
        setIsEditPartOpen(false);
        onExitClick();
    }

    const [isManageTagPopupOpen, setIsManageTagPopupOpen] = useState(false);
    const [deletingTagName, setDeletingTagName] = useState(null);

    const [newTagName, setNewTagName] = useState("");
    const [tagError, setTagError] = useState("");

    const [currentItem, setCurrentItem] = useState(null);
    const [currentQuant, setCurrentQuant] = useState(0);
    const [currentNeeded, setCurrentNeeded] = useState(0);

    const [isAddItemOpen, setIsAddItemOpen] = useState(false);

    const [query, setQuery] = useState("");
    const [listResults, setListResults] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

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
        const newTag = { name: tagName, color, deletable: true };
        setTags((prevTags) => {
            const updatedTags = [...prevTags, newTag];
            localStorage.setItem("taglist", JSON.stringify(updatedTags));
            return updatedTags;
        });
        onTagExitClick();
    };

    const deleteTag = (tagName) => {
        // 1. Get the freshest data directly from Storage to avoid state-sync issues
        const rawParts = JSON.parse(localStorage.getItem("partData") || "[]");
        const rawTags = JSON.parse(localStorage.getItem("taglist") || "[]");

        // 2. Filter out the tag from the Master Tag List
        const updatedTagList = rawTags.filter((tag) => tag.name !== tagName);

        // 3. Scrub the tag from every single part's tag array
        const updatedParts = rawParts.map((part) => {
            if (part.tags && Array.isArray(part.tags)) {
                return {
                    ...part,
                    tags: part.tags.filter((t) => t !== tagName),
                };
            }
            return part;
        });

        // 4. Update LocalStorage (The Source of Truth)
        localStorage.setItem("taglist", JSON.stringify(updatedTagList));
        localStorage.setItem("partData", JSON.stringify(updatedParts));

        // 5. Update React State (The UI)
        setTags(updatedTagList);
        setListResults(updatedParts);

        // 6. Remove from active filters if it was selected
        setSelectedTags((prev) => prev.filter((t) => t !== tagName));

        // 7. UI Cleanup
        setDeletingTagName(null);
    };

    const [hex, setHex] = useState("#fff");

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleTag = (tagName) => {
        setSelectedTags((prev) =>
            prev.includes(tagName)
                ? prev.filter((t) => t !== tagName)
                : [...prev, tagName],
        );
    };

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

    const renderStatContent = () => {
        switch (partType) {
            case 0:
                return <MotorList part={currentItem} />;
            case 1:
                return <ServoList part={currentItem} />;
            case 2:
                return <StructuralList part={currentItem} />;
            case 3:
                return <ElectricalList part={currentItem} />;
            case 4:
                return <SensorList part={currentItem} />;
            case 5:
                return <PrintedList part={currentItem} />;
            case 6:
                return <MachinedList part={currentItem} />;
            case 7:
                return null;
            case 8:
                return null;
            default:
                return <MotorList part={currentItem} />;
        }
    };

    function handleTagManageOpen() {
        setIsManageTagPopupOpen(true);
        setIsBlockerOpen(true);
    }

    function handleTagManageClose() {
        setIsManageTagPopupOpen(false);
        setIsBlockerOpen(false);
    }

    const getContrastYIQ = (hexcolor) => {
        if (!hexcolor) return "black";

        // Remove hash
        let cleanHex = hexcolor.replace("#", "");

        // Convert 3-digit hex (#fff) to 6-digit (#ffffff)
        if (cleanHex.length === 3) {
            cleanHex = cleanHex
                .split("")
                .map((char) => char + char)
                .join("");
        }

        // If it's not a valid 6-digit hex now, just return black
        if (cleanHex.length !== 6) return "black";

        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);

        const yiq = (r * 299 + g * 587 + b * 114) / 1000;

        return yiq >= 128 ? "black" : "white";
    };

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

    function onAddItemExitClick() {
        setIsAddItemOpen(false);
        const savedData = localStorage.getItem("partData");
        setListResults(savedData ? JSON.parse(savedData) : []);
    }

    const onRowClick = (item) => {
        const partTypeMap = {
            motor: 0,
            servo: 1,
            structural: 2,
            electrical: 3,
            sensor: 4,
            "3d-printed": 5,
            machined: 6,
            other: 7,
            wheel: 8,
        };

        setPartType(partTypeMap[item.stats.type]);

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
    };

    const onTagOpenClick = () => {
        setIsBlockerOpen(true);
        setIsCreateTagOpen(true);
    };

    const handleNumChangeClick = (target, operation) => {
        if (target === 0) {
            const newQuant =
                operation === 0
                    ? currentQuant + 1
                    : Math.max(currentQuant - 1, 0);
            setCurrentQuant(newQuant);
            updatePartData(currentItem.id, newQuant, currentNeeded);
        } else {
            const newNeeded =
                operation === 0
                    ? currentNeeded + 1
                    : Math.max(currentNeeded - 1, 0);
            setCurrentNeeded(newNeeded);
            updatePartData(currentItem.id, currentQuant, newNeeded);
        }
    };

    const updatePartData = (id, newQuant, newNeeded) => {
        setListResults((prevList) => {
            const updatedList = prevList.map((part) => {
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
        return sortConfig.direction === "asc" ? (
            <RiArrowUpSFill />
        ) : (
            <RiArrowDownSFill />
        );
    };

    const reloadPartsList = (sortKey) => {
        let direction = "asc";
        if (sortConfig.key === sortKey && sortConfig.direction === "asc")
            direction = "desc";

        const sorted = [...listResults].sort((a, b) => {
            let aVal = a[sortKey] ?? "";
            let bVal = b[sortKey] ?? "";

            if (typeof aVal === "string") aVal = aVal.toLowerCase();
            if (typeof bVal === "string") bVal = bVal.toLowerCase();

            if (aVal < bVal) return direction === "asc" ? -1 : 1;
            if (aVal > bVal) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setListResults(sorted);
        setSortConfig({ key: sortKey, direction });
    };

    const filteredResults = listResults.filter((item) => {
        // 1. Tag Filtering (Case-Insensitive)
        const matchesTags =
            selectedTags.length === 0 ||
            (item.tags &&
                item.tags.some((partTag) =>
                    selectedTags.some(
                        (selected) =>
                            selected.toLowerCase() === partTag.toLowerCase(),
                    ),
                ));

        if (!matchesTags) return false;

        // 2. Search Query Filtering
        const lowerQuery = query.toLowerCase();
        const matchesQuery =
            item.name.toLowerCase().includes(lowerQuery) ||
            (item.manufacturerId &&
                item.manufacturerId.toLowerCase().includes(lowerQuery));

        return matchesQuery;
    });

    return (
        <>
            <div className="d-homepagecontainer">
                <div className="d-titlecontainer">
                    <p>Parts</p>
                    <div className="d-inputwrapper">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="d-searchbar"
                            placeholder="Search..."
                        />
                    </div>
                </div>

                <div className="d-partslistcontainer">
                    <div className="d-titlecontainer-small">
                        <button onClick={() => setIsAddItemOpen(true)}>
                            + Add Item
                        </button>
                        <div className="d-titlecontainer-small-downloadwrapper">
                            <button onClick={handleTagManageOpen}>
                                <FaTags />
                                <span style={{ marginLeft: 4 }}>
                                    Manage Tags
                                </span>
                            </button>
                            <button>
                                <MdDownload />
                                <span style={{ marginLeft: 4 }}>JSON</span>
                            </button>
                            <button>
                                <MdUpload />
                                <span style={{ marginLeft: 4 }}>Import</span>
                            </button>
                        </div>
                    </div>

                    <div className="d-partslistwrapper" id="partslistwrapper">
                        <div className="d-partslistheader">
                            <div style={{ width: "15%" }}>
                                <span
                                    style={{
                                        cursor: "pointer",
                                        width: "100%",
                                        textAlign: "center",
                                    }}
                                    onClick={() =>
                                        reloadPartsList("manufacturerId")
                                    }
                                >
                                    Id {getSortIcon("manufacturerId")}
                                </span>
                            </div>
                            <div style={{ width: "50%" }}>
                                <span
                                    style={{
                                        cursor: "pointer",
                                        width: "100%",
                                        textAlign: "center",
                                    }}
                                    onClick={() => reloadPartsList("name")}
                                >
                                    Name {getSortIcon("name")}
                                </span>
                            </div>
                            <div style={{ width: "15%" }}>
                                <span
                                    style={{
                                        cursor: "pointer",
                                        width: "100%",
                                        textAlign: "center",
                                    }}
                                    onClick={() => reloadPartsList("quantity")}
                                >
                                    Quantity {getSortIcon("quantity")}
                                </span>
                            </div>
                            <div style={{ width: "15%" }}>
                                <span
                                    style={{
                                        cursor: "pointer",
                                        width: "100%",
                                        textAlign: "center",
                                    }}
                                    onClick={() => reloadPartsList("needed")}
                                >
                                    Needed {getSortIcon("needed")}
                                </span>
                            </div>
                            <div
                                style={{
                                    width: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    className="custom-tag-dropdown"
                                    ref={dropdownRef}
                                >
                                    <button
                                        type="button"
                                        className="d-dropdown-btn"
                                        onClick={() =>
                                            setIsDropdownOpen(!isDropdownOpen)
                                        }
                                    >
                                        <span>
                                            {selectedTags.length > 0
                                                ? `${selectedTags.length} Selected`
                                                : "Tags"}
                                        </span>
                                        {isDropdownOpen ? (
                                            <RiArrowUpSFill />
                                        ) : (
                                            <RiArrowDownSFill />
                                        )}
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="d-dropdown-menu">
                                            {/* Filter tags to only show those present in partData */}
                                            {tags
                                                .filter((tag) =>
                                                    // Checks if ANY part has this tag, ignoring capital letters
                                                    listResults.some(
                                                        (part) =>
                                                            part.tags &&
                                                            part.tags.some(
                                                                (t) =>
                                                                    t.toLowerCase() ===
                                                                    tag.name.toLowerCase(),
                                                            ),
                                                    ),
                                                )
                                                .map((tag) => (
                                                    <label
                                                        key={tag.name}
                                                        className="d-tag-label"
                                                        style={{
                                                            backgroundColor:
                                                                tag.color,
                                                            color: getContrastYIQ(
                                                                tag.color,
                                                            ),
                                                        }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="d-tag-checkbox"
                                                            checked={selectedTags.includes(
                                                                tag.name,
                                                            )}
                                                            onChange={() =>
                                                                toggleTag(
                                                                    tag.name,
                                                                )
                                                            }
                                                        />
                                                        {tag.name}
                                                    </label>
                                                ))}

                                            <div
                                                className="d-add-button d-tag-label"
                                                onClick={onTagOpenClick}
                                            >
                                                <span
                                                    style={{
                                                        marginRight: "12px",
                                                        fontSize: "1rem",
                                                        lineHeight: 0,
                                                    }}
                                                >
                                                    +
                                                </span>
                                                Add Tag
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {filteredResults.map((item) => (
                            <PartItem
                                key={item.id}
                                part={item}
                                onRowClick={onRowClick}
                                onEdit={handleEditOpen}
                                onDelete={() =>
                                    setListResults(
                                        JSON.parse(
                                            localStorage.getItem("partData"),
                                        ) || [],
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>

            {isPartOverlayOpen && currentItem && (
                <div id="d-partoverlay" className="d-partoverlay">
                    <div className="leftcontainer">
                        <div className="thirdcontainer">
                            <div
                                className="d-titlecontainer"
                                style={{ paddingLeft: "5%", fontSize: "2rem" }}
                            >
                                <p>{currentItem?.name}</p>
                            </div>
                            <img
                                src={currentItem?.icon}
                                alt={currentItem?.name}
                            />
                            <div className="d-partoverlay-infodiv1">
                                <p>Links:</p>
                                <ul>
                                    {currentItem?.links &&
                                        Object.entries(currentItem.links)
                                            .filter(([name, url]) => url)
                                            .map(([name, url]) => (
                                                <li key={name}>
                                                    <a
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {name}
                                                    </a>
                                                </li>
                                            ))}
                                </ul>
                            </div>
                        </div>

                        <div className="thirdcontainer">
                            <div className="d-partoverlay-infodiv1">
                                <p>Stats:</p>
                                {renderStatContent()}
                            </div>
                            <div className="d-partoverlay-infodiv1">
                                <div className="leftcontainer">
                                    <div className="halfcontainer">
                                        <div className="d-partoverlay-editquant">
                                            <button
                                                onClick={() =>
                                                    handleNumChangeClick(0, 1)
                                                }
                                            >
                                                -
                                            </button>
                                            <p>Quantity: {currentQuant}</p>
                                            <button
                                                onClick={() =>
                                                    handleNumChangeClick(0, 0)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="halfcontainer">
                                        <div className="d-partoverlay-editquant">
                                            <button
                                                onClick={() =>
                                                    handleNumChangeClick(1, 1)
                                                }
                                            >
                                                -
                                            </button>
                                            <p>Needed: {currentNeeded}</p>
                                            <button
                                                onClick={() =>
                                                    handleNumChangeClick(1, 0)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="thirdcontainer">
                            <div className="d-partoverlay-infodiv1">
                                <p>Tags:</p>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(4, 1fr)",
                                        gap: "10px",
                                        listStyle: "none",
                                        marginTop: "10px",
                                    }}
                                >
                                    {currentItem?.tags?.map((tagName) => {
                                        const tagData = tags.find(
                                            (t) => t.name === tagName,
                                        );
                                        const bgColor = tagData
                                            ? tagData.color
                                            : "#ccc";
                                        const textColor =
                                            getContrastYIQ(bgColor);

                                        return (
                                            <div
                                                key={tagName}
                                                style={{
                                                    textTransform: "capitalize",
                                                    backgroundColor: bgColor,
                                                    color: textColor,
                                                    padding: "6px 10px",
                                                    borderRadius: "12px",
                                                    textAlign: "center",
                                                    fontSize: "0.8rem",
                                                    fontWeight: "bold",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    minHeight: "30px",
                                                }}
                                            >
                                                {tagName}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="d-partoverlay-exitbutton"
                        onClick={onExitClick}
                    >
                        X
                    </button>
                </div>
            )}
            {isBlockerOpen && <Blocker id="blocker1"></Blocker>}
            {isCreateTagOpen && (
                <div className="d-createtagoverlay">
                    <button
                        className="d-partoverlay-exitbutton"
                        onClick={onTagExitClick}
                    >
                        X
                    </button>
                    <p>Custom Tag</p>
                    {tagError && (
                        <p
                            style={{
                                color: "red",
                                margin: "0 0 5px 0",
                                fontSize: "0.9rem",
                            }}
                        >
                            {tagError}
                        </p>
                    )}
                    <input
                        id="createtaginput"
                        placeholder="Tag Name..."
                        value={newTagName}
                        onChange={(e) => {
                            setNewTagName(e.target.value);
                            setTagError("");
                        }}
                        style={{
                            border: tagError
                                ? "1px solid red"
                                : "1px solid #ccc",
                            padding: "6px 10px",
                            borderRadius: "4px",
                            width: "100%",
                            boxSizing: "border-box",
                        }}
                    />
                    <Sketch
                        style={{ backgroundColor: "#ffffff", color: "white" }}
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
                            const isDuplicate = tags.some(
                                (tag) =>
                                    tag.name.toLowerCase() ===
                                    trimmedName.toLowerCase(),
                            );
                            if (isDuplicate) {
                                setTagError("Tag name already exists");
                                return;
                            }

                            // Add tag
                            addTag(trimmedName, hex);
                            setNewTagName(""); // reset input
                            setTagError(""); // clear any previous error
                        }}
                    >
                        Create Tag
                    </button>
                </div>
            )}

            {isAddItemOpen && (
                <AddItemMenuDesktop onClose={onAddItemExitClick} />
            )}

            {isManageTagPopupOpen && (
                <div className="d-createtagoverlay">
                    <button
                        className="d-partoverlay-exitbutton"
                        onClick={handleTagManageClose}
                    >
                        X
                    </button>
                    <p>Manage Tags</p>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                            marginTop: "10px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                width: "100%",
                                maxWidth: "400px",
                            }}
                        >
                            {JSON.parse(localStorage.getItem("taglist") || "[]")
                                .filter((tag) => tag.deletable === true)
                                .map((tag) => {
                                    const bgColor = tag.color || "#ccc";
                                    const textColor = getContrastYIQ(bgColor);

                                    return (
                                        <div
                                            key={tag.name}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "10px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    textTransform: "capitalize",
                                                    backgroundColor: bgColor,
                                                    color: textColor,
                                                    padding: "4px 12px",
                                                    borderRadius: "12px",
                                                    fontSize: "0.8rem",
                                                    fontWeight: "bold",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    minHeight: "30px",
                                                    flexGrow: 1,
                                                }}
                                            >
                                                {tag.name}
                                            </div>

                                            <div
                                                className="d-partitem-iconbutton2"
                                                onClick={() =>
                                                    setDeletingTagName(tag.name)
                                                }
                                                style={{
                                                    cursor: "pointer",
                                                    width: "3rem",
                                                    height: "3rem",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexShrink: 0,
                                                    fontSize: "2.6rem",
                                                    color: "white",
                                                }}
                                            >
                                                <IoTrashSharp />
                                            </div>
                                            {deletingTagName === tag.name && (
                                                <WarningPopup
                                                    message={`This will delete ${tag.name}`}
                                                    complete={() => {
                                                        deleteTag(tag.name);
                                                        setDeletingTagName(
                                                            null,
                                                        );
                                                    }}
                                                    close={() =>
                                                        setDeletingTagName(null)
                                                    }
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}

            {isEditPartOpen && (
                <>
                    <div id="d-partoverlay" className="d-partoverlay">
                        <button
                            className="d-partoverlay-exitbutton"
                            onClick={handleEditClose}
                        >
                            X
                        </button>
                        <div className="centercontainer">
                            <p>test</p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default PartsPageDesktop;
