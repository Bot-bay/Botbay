import React from "react";
import { IoTrashSharp } from "react-icons/io5";

function BatteryList({ table, onUpdate, onDelete }) {
    return (
        <div className="d-battery-listitem">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Time on Charger</th>
                        <th>Charging Status</th>
                        <th>Manage</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {table &&
                        table.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>
                                    {item.type === "dh"
                                        ? "Driver Hub"
                                        : item.type === "b"
                                          ? "Battery"
                                          : item.type}
                                </td>
                                <td>
                                    {item.mcStatus
                                        ? formatDuration(item.toc)
                                        : "N/A"}
                                </td>
                                <td>
                                    {item.mcStatus
                                        ? "Charging..."
                                        : "Not charging"}
                                </td>
                                <td>
                                    <button
                                        className="d-battery-pocbutton"
                                        disabled={item.mcStatus === true}
                                        onClick={() =>
                                            onUpdate(item.name, true)
                                        }
                                    >
                                        Put on Charger
                                    </button>

                                    <button
                                        className="d-battery-tocbutton"
                                        disabled={item.mcStatus === false}
                                        onClick={() =>
                                            onUpdate(item.name, false)
                                        }
                                    >
                                        Take off Charger
                                    </button>
                                </td>
                                <td>
                                    <div
                                        className="d-battery-trash"
                                        onClick={() => onDelete(item.name)}
                                    >
                                        <IoTrashSharp />
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
    const diffInMs = Date.now() - toc;

    // 1. Convert total ms to total minutes
    const totalMinutes = Math.floor(diffInMs / (1000 * 60));

    // 2. Extract hours
    const hours = Math.floor(totalMinutes / 60);

    // 3. Extract remaining minutes
    const minutes = totalMinutes % 60;

    // 4. Format with padding for minutes (so 5 mins looks like :05)
    const paddedMinutes = minutes.toString().padStart(2, "0");

    return `${hours}:${paddedMinutes}`;
}

function BatteryListRow(name, type, toc, mcStatus) {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {type === "dh" ? "Driver Hub" : type === "b" ? "Battery" : type}
            </td>
            <td>{formatDuration(toc)}</td>
            <td>{mcStatus ? "Charging..." : "Not charging"}</td>
            <td>
                <button
                    className="d-battery-pocbutton"
                    disabled={mcStatus === true}
                >
                    Put on Charger
                </button>

                <button
                    className="d-battery-tocbutton"
                    disabled={mcStatus === false}
                >
                    Take off Charger
                </button>
            </td>
        </tr>
    );
}
