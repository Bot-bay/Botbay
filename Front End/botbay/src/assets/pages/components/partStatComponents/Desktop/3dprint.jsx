import React from 'react';

function PrintedList({ part }) {
    const { stats } = part || {};
    if (!stats) return null;

    const rows = [
        {
            label: "Dimensions",
            value: stats.size?.length === 3 ? `${stats.size[0]} x ${stats.size[1]} x ${stats.size[2]} mm` : null
        },
        {
            label: "Filament Type",
            value: stats.filament ?? null
        },
        {
            label: "Filament Used",
            value: stats.filament_amount != null ? `${stats.filament_amount} g` : null
        },
        {
            label: "Cost",
            value: stats.cost != null ? `$${stats.cost.toFixed(2)}` : null
        },
        {
            label: "Print Time",
            value: Array.isArray(stats.time) && stats.time.length === 2 
                ? `${stats.time[0]}h ${stats.time[1]}m` 
                : null
        },
        {
            label: "Infill",
            value: stats.infill != null ? `${stats.infill}% (${stats.infill_pattern})` : null
        },
        {
            label: "Wall Loops",
            value: stats.wall_loops ?? null
        },
        {
            label: "Supports",
            value: stats.support !== null ? (stats.support ? `Enabled (${stats.support_type ?? 'Standard'})` : "Disabled") : null
        },
        {
            label: "Brim",
            value: stats.brim_type !== "none" && stats.brim_type != null ? `${stats.brim_type}` : null
        },
        {
            label: "Threshold Angle",
            value: stats.threshold_angle != null ? `${stats.threshold_angle}°` : null
        }
    ];

    return (
        <ul>
            {rows
                .filter(row => row.value != null && row.value !== "")
                .map(({ label, value }) => (
                    <li key={label}>
                        <strong>{label}:</strong> {value}
                    </li>
                ))}
        </ul>
    );
}

export default PrintedList;