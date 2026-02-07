import React, { useState } from "react";

export function AddItemMenuDesktop() {
    // Part type indexes:
    // null -> not open
    // 0 -> Motor
    // 1 -> Servo
    // 2 -> Structural
    // 3 -> Electrical
    // 4 -> Sensor
    // 5 -> 3D Printed
    // 6 -> Machined
    // 7 -> Other
    // 8 -> Wheel
    const [partIndexOpen, setPartIndexOpen] = useState(null);

    <>
        <div className=""></div>
    </>;
}

export function AddItemMenuPhone() {}
