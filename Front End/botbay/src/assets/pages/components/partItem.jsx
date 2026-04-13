import React, { useState, useEffect } from "react";
import { IoTrashSharp } from "react-icons/io5";
import { PiPencilSimple, PiPencilSimpleSlash } from "react-icons/pi";
import WarningPopup from "./warningpopup";

import { cloudDeletePart } from "../../scripts/database";

import { useTranslation } from "react-i18next";

function PartItem({ part, onRowClick, onDelete, onEdit }) {
    const { t } = useTranslation();

    const [imgLoaded, setImgLoaded] = useState(true);
    const [warningOn, setWarningOn] = useState(false);
    const [visible, setVisible] = useState(true);

    const statusColor = part.needed > part.quantity ? "#d94a4a" : "inherit";

    if (!visible) return null;

    const deletePart = async () => {
        await cloudDeletePart(part.id);

        setVisible(false);

        if (onDelete) onDelete();
    };

    const [isPhone, setIsPhone] = useState(window.innerWidth < 1200);

    useEffect(() => {
        const handleResize = () => {
            setIsPhone(window.innerWidth < 1200);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // --- PHONE CARD LAYOUT ---
    if (isPhone) {
        return (
            <>
                <div
                    className="phone-part-card"
                    onClick={() => onRowClick(part)}
                >
                    <div className="phone-card-top-row">
                        <div className="phone-card-id-section">
                            {part.icon && imgLoaded && (
                                <img
                                    src={part.icon}
                                    className="phone-card-icon"
                                    alt=""
                                    style={{ width: "7rem", height: "7rem" }}
                                    onError={() => setImgLoaded(false)}
                                />
                            )}
                            <span
                                className="phone-card-mfr-id"
                                style={{ fontSize: "3rem" }}
                            >
                                {part.manufacturerId}
                            </span>
                        </div>
                        <div
                            className="phone-card-actions"
                            onClick={(e) => e.stopPropagation()}
                            style={{ gap: "8rem" }}
                        >
                            <div
                                onClick={() => part.editable && onEdit(part)}
                                className="phone-card-action-btn"
                            >
                                {part.editable ? (
                                    <PiPencilSimple size="6rem" />
                                ) : (
                                    <PiPencilSimpleSlash size="6rem" />
                                )}
                            </div>
                            <div
                                onClick={() => setWarningOn(true)}
                                className="phone-card-action-btn phone-delete-btn"
                            >
                                <IoTrashSharp size="6rem" />
                            </div>
                        </div>
                    </div>

                    <div
                        className="phone-card-part-name"
                        style={{ color: statusColor }}
                    >
                        {part.name}
                    </div>

                    <div className="phone-card-stats-row">
                        <div className="phone-card-stat">
                            <label style={{ fontSize: "3rem" }}>
                                {t("quantitycaps")}
                            </label>
                            <span style={{ color: statusColor }}>
                                {part.quantity}
                            </span>
                        </div>
                        <div className="phone-card-stat">
                            <label style={{ fontSize: "3rem" }}>
                                {t("neededcaps")}
                            </label>
                            <span style={{ color: statusColor }}>
                                {part.needed || 0}
                            </span>
                        </div>
                    </div>
                </div>

                {warningOn && (
                    <WarningPopup
                        message={t("deleteitemmessage", {
                            itemName: part.name,
                        })}
                        complete={deletePart}
                        close={() => setWarningOn(false)}
                    />
                )}
            </>
        );
    }

    // --- DESKTOP TABLE ROW (UNTOUCHED) ---
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
                    <div
                        onClick={() => onEdit(part)}
                        className={
                            part.editable ? "d-partitem-iconbutton1" : ""
                        }
                    >
                        {part.editable ? (
                            <PiPencilSimple />
                        ) : (
                            <PiPencilSimpleSlash />
                        )}
                    </div>
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
                    message={t("deleteitemmessage", { itemName: part.name })}
                    complete={deletePart}
                    close={() => setWarningOn(false)}
                />
            )}
        </>
    );
}

export default PartItem;
