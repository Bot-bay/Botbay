import React, { useState } from "react";
import BatteryList from "../../components/battery";

function BatteryPageDesktop() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const [newType, setNewType] = useState("b");

    const [savedBatteries, setSavedBatteries] = useState(() => {
        const localData = localStorage.getItem("batteryList");
        return localData ? JSON.parse(localData) : [];
    });

    const addBattery = (e) => {
        e.preventDefault();
        if (!newName.trim()) return;

        const newBattery = {
            name: newName,
            type: newType,
            toc: Date.now(),
            mcStatus: false,
        };

        const updatedList = [...savedBatteries, newBattery];
        setSavedBatteries(updatedList);
        localStorage.setItem("batteryList", JSON.stringify(updatedList));

        setNewName("");
        setIsPopupOpen(false);
    };

    const deleteBattery = (nameToDelete) => {
        const updatedList = savedBatteries.filter(
            (battery) => battery.name !== nameToDelete,
        );

        setSavedBatteries(updatedList);

        localStorage.setItem("batteryList", JSON.stringify(updatedList));
    };

    function handlePopUpOpen() {
        setIsPopupOpen(true);
    }

    function handlePopUpClose() {
        setIsPopupOpen(false);
    }

    const updateBatteryStatus = (name, isCharging) => {
        const updatedList = savedBatteries.map((item) => {
            if (item.name === name) {
                return {
                    ...item,
                    mcStatus: isCharging,
                    toc: Date.now(),
                };
            }
            return item;
        });

        setSavedBatteries(updatedList);
        localStorage.setItem("batteryList", JSON.stringify(updatedList));
    };

    const hasBatteries = savedBatteries && savedBatteries.length > 0;

    return (
        <>
            <div className="d-battery-titlecontainer">
                <p>Batteries</p>
                <button
                    className="d-battery-add-trigger"
                    onClick={() => handlePopUpOpen(true)}
                >
                    + Add New Battery
                </button>
            </div>
            <div className="d-battery-centercontainer">
                {hasBatteries ? (
                    <BatteryList
                        table={savedBatteries}
                        onUpdate={updateBatteryStatus}
                        onDelete={deleteBattery}
                    />
                ) : (
                    <p style={{ color: "white" }}>
                        You are not tracking any batteries...
                    </p>
                )}

                {isPopupOpen && (
                    <div className="d-battery-popup-overlay">
                        <div className="d-battery-modal">
                            <h3>Track New Battery</h3>
                            <form onSubmit={addBattery}>
                                <input
                                    type="text"
                                    placeholder="Battery Name (e.g. Unit 1)"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    required
                                />
                                <select
                                    value={newType}
                                    onChange={(e) => setNewType(e.target.value)}
                                >
                                    <option value="b">Standard Battery</option>
                                    <option value="dh">Driver Hub</option>
                                </select>
                                <div className="d-battery-popup-buttons">
                                    <button
                                        type="submit"
                                        className="d-battery-pocbutton"
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handlePopUpClose(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default BatteryPageDesktop;
