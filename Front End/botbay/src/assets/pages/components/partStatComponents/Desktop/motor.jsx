import React, { useState } from 'react';

function MotorList({ part }) {
    return (
        <ul>
            <li>Connector Types: {part.stats.connector_types.join(', ')}</li>
            <li>Max Power: {part.stats.max_power} W</li>
            <li>Stall Current: {part.stats.stall_current} A</li>
            <li>Voltage: {part.stats.voltage} V</li>
            <li>Output Shaft Length: {part.stats.output_shaft_length} mm</li>
            <li>No Load Speed: {part.stats.no_load_speed} RPM</li>
            <li>CPR: {part.stats.cpr}</li>
            <li>PPR: {part.stats.ppr}</li>
            <li>Stall Torque: {part.stats.stall_torque} Nm</li>
            <li>Shaft Type: {part.stats.shaft_type}</li>
        </ul>
    );
}


export default MotorList;
