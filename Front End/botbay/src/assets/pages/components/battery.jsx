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
        if (!item.mcStatus || !item.startTime) return item.startLevel || 0;
        const elapsedHours =
            (Date.now() - new Date(item.startTime).getTime()) /
            (1000 * 60 * 60);
        const addedCharge = elapsedHours * (item.chargerSpeed || 2);
        const addedPercent = (addedCharge / (item.capacity || 12)) * 100;
        return Math.min(Math.floor((item.startLevel || 0) + addedPercent), 100);
    };

    const getStatusColor = (item, level) => {
        if (!item.mcStatus) return "#64748b";
        if (level >= 90) return "#3b82f6";
        if (level >= 75) return "#10b981";
        if (level <= 20) return "#7c0000";
        return "#f97316";
    };

    return (
        <div className="d-battery-listitem">
            <style>{`
                @keyframes battery-sync-glow {
                    0%, 100% {
                        /* When idle, this color is transparent, making the pulse invisible but RUNNING */
                        box-shadow: 0 0 2px var(--glow-active-color);
                        opacity: var(--glow-opacity-min);
                    }
                    50% {
                        box-shadow: 0 0 18px 4px var(--glow-active-color);
                        opacity: var(--glow-opacity-max);
                    }
                }

                .status-col-cell {
                    width: 40px;
                    padding-left: 15px;
                    vertical-align: middle;
                }

                .indicator-light {
                    width: 18px;
                    height: 18px;
                    min-width: 18px;
                    min-height: 18px;
                    border-radius: 50%;
                    display: block;
                    aspect-ratio: 1 / 1;
                    /* ALWAYS RUNNING - DO NOT MOVE OR TOGGLE THIS */
                    animation: battery-sync-glow 2s infinite ease-in-out;
                }
            `}</style>

            <table>
                <thead>
                    <tr>
                        <th className="status-col-cell"></th>
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
                        table.map((item, index) => {
                            const currentLevel = calculatePercent(item);
                            const statusColor = getStatusColor(
                                item,
                                currentLevel,
                            );

                            return (
                                <tr key={item.name}>
                                    {" "}
                                    {/* Use item.name as key to prevent React from re-mounting incorrectly */}
                                    <td className="status-col-cell">
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <span
                                                className="indicator-light"
                                                style={{
                                                    backgroundColor:
                                                        statusColor,
                                                    /* If charging, use color. If idle, use transparent. */
                                                    "--glow-active-color":
                                                        item.mcStatus
                                                            ? statusColor
                                                            : "transparent",
                                                    /* If charging, pulse opacity. If idle, keep solid 1. */
                                                    "--glow-opacity-min":
                                                        item.mcStatus
                                                            ? "0.4"
                                                            : "1",
                                                    "--glow-opacity-max":
                                                        item.mcStatus
                                                            ? "1"
                                                            : "1",
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: "600" }}>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.type === "dh"
                                            ? "Driver Hub"
                                            : "Battery"}
                                    </td>
                                    <td>
                                        {item.mcStatus
                                            ? formatDuration(item.toc)
                                            : "--:--"}
                                    </td>
                                    <td>
                                        <div className="d-status-container">
                                            {item.mcStatus ? (
                                                <>
                                                    <IoFlash
                                                        style={{
                                                            color: "#fbbf24",
                                                        }}
                                                    />{" "}
                                                    Charging {currentLevel}%
                                                </>
                                            ) : (
                                                <>
                                                    <IoBatteryDead
                                                        style={{
                                                            color: "#64748b",
                                                        }}
                                                    />{" "}
                                                    Idle
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
                                                                value={
                                                                    exactValue
                                                                }
                                                                onChange={(e) =>
                                                                    setExactValue(
                                                                        parseInt(
                                                                            e
                                                                                .target
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
                                                            {[
                                                                0, 25, 50, 75,
                                                            ].map((lvl) => (
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
                                                            ))}
                                                        </div>
                                                    )}
                                                    <button
                                                        className="d-cancel-x"
                                                        onClick={() =>
                                                            setPendingBattery(
                                                                null,
                                                            )
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
                                                        disabled={
                                                            !item.mcStatus
                                                        }
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
                                                onClick={() =>
                                                    onDelete(item.name)
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
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
