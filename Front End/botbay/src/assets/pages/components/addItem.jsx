import React, { useState } from "react";

export function AddItemMenuDesktop({ onClose }) {
    const [partIndexOpen, setPartIndexOpen] = useState(null);
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
    function renderCorrectItemToAdd() {
        switch (partIndexOpen) {
            case 0:
                return <AddMotor onReturn={() => setPartIndexOpen(null)} />;
            case 1:
                return <AddServo onReturn={() => setPartIndexOpen(null)} />;
            case 2:
                return (
                    <AddStructural onReturn={() => setPartIndexOpen(null)} />
                );
            case 3:
                return (
                    <AddElectrical onReturn={() => setPartIndexOpen(null)} />
                );
            case 4:
                return <AddSensor onReturn={() => setPartIndexOpen(null)} />;
            case 5:
                return <Add3dPrinted onReturn={() => setPartIndexOpen(null)} />;
            case 6:
                return <AddMachined onReturn={() => setPartIndexOpen(null)} />;
            case 7:
                return <AddOther onReturn={() => setPartIndexOpen(null)} />;
        }
    }

    return (
        <>
            <div className="d-partoverlay">
                <button className="d-partoverlay-exitbutton" onClick={onClose}>
                    X
                </button>
                <div className={`d-titlecontainer d-titlecontainer-centered`}>
                    <p>Add Item</p>
                </div>
                {partIndexOpen === null && (
                    <div className="centercontainer">
                        <div className="d-createitem-middlecontainer">
                            <button onClick={() => setPartIndexOpen(0)}>
                                Motor
                            </button>
                            <button onClick={() => setPartIndexOpen(1)}>
                                Servo
                            </button>
                            <button onClick={() => setPartIndexOpen(2)}>
                                Structural
                            </button>
                            <button onClick={() => setPartIndexOpen(3)}>
                                Electrical
                            </button>
                            <button onClick={() => setPartIndexOpen(4)}>
                                Sensor
                            </button>
                            <button onClick={() => setPartIndexOpen(5)}>
                                3D Printed
                            </button>
                            <button onClick={() => setPartIndexOpen(6)}>
                                Machined
                            </button>
                            <button onClick={() => setPartIndexOpen(7)}>
                                Other
                            </button>
                        </div>
                    </div>
                )}
                {partIndexOpen !== null && renderCorrectItemToAdd()}
            </div>
        </>
    );
}

export function AddItemMenuPhone() {}

function AddMotor({ onReturn }) {
    const [formData, setFormData] = useState({
        manufacturerId: "",
        name: "",
        tags: [],
        manufacturer: "",
        connectorTypes: [],
        maxPower: "",
        stallCurrent: "",
        voltage: "",
        outputShaftLength: "",
        noLoadSpeed: "",
        cpr: "",
        ppr: "",
        stallTorque: "",
        shaftType: "",
        iconLink: "",
        cadLink: "",
        storeLink: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the page from reloading
        console.log("Form Submitted:", formData);
    };
    return (
        <>
            <button className="d-partoverlay-returnbutton" onClick={onReturn}>
                &lt;
            </button>

            <form onSubmit={handleSubmit} className="d-createitem-form">
                <h5 className="d-createitem-form-subtitle">
                    Motor Specifications
                </h5>

                <div className="d-createitem-input-group">
                    <label>Name</label>
                    <input
                        name="name"
                        placeholder="e.g. GoBilda 5203"
                        value={formData.name || ""}
                        onChange={handleChange}
                        min={0}
                    />
                </div>

                <div className="d-createitem-input-row">
                    <div className="d-createitem-input-group">
                        <label>Voltage (V)</label>
                        <input
                            type="number"
                            name="voltage"
                            value={formData.voltage || ""}
                            onChange={handleChange}
                            min={0}
                        />
                    </div>
                    <div className="d-createitem-input-group">
                        <label>No-Load Speed (RPM)</label>
                        <input
                            type="number"
                            name="noLoadSpeed"
                            value={formData.noLoadSpeed || ""}
                            onChange={handleChange}
                            min={0}
                        />
                    </div>
                </div>

                <button type="submit" className="d-createitem-submit-button">
                    Create Motor
                </button>
            </form>
        </>
    );
}

function AddServo({ onReturn }) {
    return (
        <>
            <button className="d-partoverlay-returnbutton" onClick={onReturn}>
                &lt;
            </button>
        </>
    );
}

function AddStructural({ onReturn }) {
    return (
        <>
            <button className="d-partoverlay-returnbutton" onClick={onReturn}>
                &lt;
            </button>
        </>
    );
}

function AddElectrical({ onReturn }) {
    return (
        <>
            <button className="d-partoverlay-returnbutton" onClick={onReturn}>
                &lt;
            </button>
        </>
    );
}

function AddSensor({ onReturn }) {
    return (
        <>
            <button className="d-partoverlay-returnbutton" onClick={onReturn}>
                &lt;
            </button>
        </>
    );
}

function Add3dPrinted({ onReturn }) {
    return (
        <>
            <button className="d-partoverlay-returnbutton" onClick={onReturn}>
                &lt;
            </button>
        </>
    );
}

function AddMachined({ onReturn }) {
    return (
        <>
            <button className="d-partoverlay-returnbutton" onClick={onReturn}>
                &lt;
            </button>
        </>
    );
}

function AddOther({ onReturn }) {
    return (
        <>
            <button className="d-partoverlay-returnbutton" onClick={onReturn}>
                &lt;
            </button>
        </>
    );
}
