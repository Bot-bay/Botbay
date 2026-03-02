import React, { useState } from "react";
import { IoTrashSharp } from "react-icons/io5";
import { PiPencilSimple } from "react-icons/pi";
import { PiPencilSimpleSlash } from "react-icons/pi";
import WarningPopup from "./warningpopup";

function PartItem({ part, onRowClick, onDelete, onEdit }) {
    const [imgLoaded, setImgLoaded] = useState(true);
    const [warningOn, setWarningOn] = useState(false);
    const [visible, setVisible] = useState(true);

    const statusColor =
        (part.needed || 0) > part.quantity ? "#d94a4a" : "inherit";

    if (!visible) {
        return null;
    }

    const deletePart = () => {
        // get current data from localStorage
        const data = JSON.parse(localStorage.getItem("partData")) || [];
        const updated = data.filter((p) => p.id !== part.id);

        // save back to localStorage
        localStorage.setItem("partData", JSON.stringify(updated));

        // hide this item from UI
        setVisible(false);
        onDelete();
    };

    return (
        <>
            <div className="d-partitem" onClick={() => onRowClick(part)}>
                <div
                    style={{
                        width: "15%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    {part.icon && imgLoaded && (
                        <img
                            src={part.icon}
                            style={{
                                width: "2.5rem",
                                height: "2.5rem",
                                marginRight: "0.9375rem",
                                borderRadius: "5px",
                            }}
                            alt={`${part.name} icon`}
                            onError={() => setImgLoaded(false)}
                        />
                    )}
                    {part.manufacturerId}
                </div>
                <div style={{ width: "50%", color: statusColor }}>
                    {part.name}
                </div>
                <div style={{ width: "15%", color: statusColor }}>
                    {part.quantity}
                </div>
                <div style={{ width: "15%", color: statusColor }}>
                    {part.needed || 0}
                </div>
                <div style={{ width: "5%", height: "100%" }}>
                    {part.editable ? (
                        <div
                            onClick={() => onEdit(part)}
                            className={
                                part.editable ? "d-partitem-iconbutton1" : ""
                            }
                        >
                            <PiPencilSimple />
                        </div>
                    ) : (
                        <div
                            className={
                                part.editable ? "d-partitem-iconbutton1" : ""
                            }
                        >
                            <PiPencilSimpleSlash />
                        </div>
                    )}
                </div>
                <div style={{ width: "5%", height: "100%" }}>
                    <div
                        className="d-partitem-iconbutton2"
                        onClick={(e) => {
                            e.stopPropagation();
                            setWarningOn(true);
                        }}
                    >
                        <IoTrashSharp />
                    </div>
                </div>
            </div>
            {warningOn && (
                <WarningPopup
                    message={`This will delete ${part.name}`}
                    complete={deletePart}
                    close={() => setWarningOn(false)}
                />
            )}
        </>
    );
}

export default PartItem;
