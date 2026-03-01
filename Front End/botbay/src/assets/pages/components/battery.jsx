import React, { useState, useEffect } from "react";
import {
    IoTrashSharp,
    IoFlash,
    IoBatteryDead,
    IoCheckmarkCircle,
} from "react-icons/io5";

function BatteryList({ table, onUpdate, onDelete }) {
    const [pendingBattery, setPendingBattery] = useState(null);
    const [exactValue, setExactValue] = useState(50);
    const [, setTick] = useState(0);

    // Forces a re-render every 10 seconds to update charging percentages
    useEffect(() => {
        const interval = setInterval(() => setTick((t) => t + 1), 10000);
        return () => clearInterval(interval);
    }, []);

    const handleConfirm = (name, startLevel) => {
        onUpdate(name, true, startLevel);
        setPendingBattery(null);
        setExactValue(50);
    };

    const calculatePercent = (item) => {
        if (!item.mcStatus || !item.startTime) return 0;

        // Math: Current % = Start % + ((Elapsed Hours * Charger Amps) / Capacity Ah) * 100
        const elapsedHours =
            (Date.now() - new Date(item.startTime).getTime()) /
            (1000 * 60 * 60);
        const addedCharge = elapsedHours * (item.chargerSpeed || 2);
        const addedPercent = (addedCharge / (item.capacity || 12)) * 100;

        const totalPercent = Math.floor((item.startLevel || 0) + addedPercent);
        return Math.min(totalPercent, 100);
    };

    return (
        <div className="d-battery-listitem">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Current Session</th>
                        <th>Status</th>
                        <th>Manage</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {table &&
                        table.map((item, index) => (
                            <tr key={index}>
                                <td style={{ fontWeight: "600" }}>
                                    <div>{item.name}</div>
                                </td>
                                <td>
                                    <div>
                                        {item.type === "dh"
                                            ? "Driver Hub"
                                            : "Battery"}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {item.mcStatus
                                            ? formatDuration(item.toc)
                                            : "--:--"}
                                    </div>
                                </td>
                                <td>
                                    <div className="d-status-container">
                                        {item.mcStatus ? (
                                            <>
                                                <IoFlash
                                                    style={{ color: "#fbbf24" }}
                                                />
                                                <span className="d-charging-text">
                                                    Charging{" "}
                                                    {calculatePercent(item)}%
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <IoBatteryDead
                                                    style={{ color: "#64748b" }}
                                                />
                                                <span className="d-idle-text">
                                                    Idle
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div className="d-manage-wrapper">
                                        {pendingBattery === item.name ? (
                                            <div className="d-selector-container">
                                                {item.type === "dh" ? (
                                                    <div className="d-slider-box">
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            value={exactValue}
                                                            onChange={(e) =>
                                                                setExactValue(
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                    ),
                                                                )
                                                            }
                                                        />
                                                        <span className="d-exact-val">
                                                            {exactValue}%
                                                        </span>
                                                        <IoCheckmarkCircle
                                                            className="d-confirm-icon"
                                                            onClick={() =>
                                                                handleConfirm(
                                                                    item.name,
                                                                    exactValue,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="d-preset-box">
                                                        {[0, 25, 50, 75].map(
                                                            (lvl) => (
                                                                <button
                                                                    key={lvl}
                                                                    onClick={() =>
                                                                        handleConfirm(
                                                                            item.name,
                                                                            lvl,
                                                                        )
                                                                    }
                                                                >
                                                                    {lvl}%
                                                                </button>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                                <button
                                                    className="d-cancel-x"
                                                    onClick={() =>
                                                        setPendingBattery(null)
                                                    }
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="d-action-buttons">
                                                <button
                                                    className="d-battery-pocbutton"
                                                    disabled={item.mcStatus}
                                                    onClick={() => {
                                                        setPendingBattery(
                                                            item.name,
                                                        );
                                                        setExactValue(0);
                                                    }}
                                                >
                                                    Put on Charger
                                                </button>
                                                <button
                                                    className="d-battery-tocbutton"
                                                    disabled={!item.mcStatus}
                                                    onClick={() =>
                                                        onUpdate(
                                                            item.name,
                                                            false,
                                                            0,
                                                        )
                                                    }
                                                >
                                                    Take off
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div className="d-trash-wrapper">
                                        <IoTrashSharp
                                            className="d-battery-trash"
                                            onClick={() => onDelete(item.name)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default BatteryList;

function formatDuration(toc) {
    if (!toc) return "0:00";
    const diffInMs = Date.now() - toc;
    const totalMinutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
}
