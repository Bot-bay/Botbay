import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function MotorList({ part }) {
    const { t } = useTranslation();
    const { stats } = part || {};
    if (!stats) return null;

    const rows = [
        {
            label: t("connectortypes"),
            value: stats.connector_types?.join(", "),
        },
        {
            label: t("maxpower"),
            value: stats.max_power != null ? `${stats.max_power} W` : null,
        },
        {
            label: t("stallcurrent"),
            value:
                stats.stall_current != null ? `${stats.stall_current} A` : null,
        },
        {
            label: t("voltage"),
            value: stats.voltage != null ? `${stats.voltage} V` : null,
        },
        {
            label: t("outputshaftlength"),
            value:
                stats.output_shaft_length != null
                    ? `${stats.output_shaft_length} mm`
                    : null,
        },
        {
            label: t("noloadspeed"),
            value:
                stats.no_load_speed != null
                    ? `${stats.no_load_speed} RPM`
                    : null,
        },
        {
            label: t("cpr"),
            value: stats.cpr,
        },
        {
            label: t("pulsesperrevolution"),
            value: stats.ppr,
        },
        {
            label: t("stalltorque"),
            value:
                stats.stall_torque != null ? `${stats.stall_torque} Nm` : null,
        },
        {
            label: t("shafttype"),
            value: stats.shaft_type,
        },
    ];

    return (
        <ul>
            {rows
                .filter((row) => row.value != null && row.value !== "")
                .map(({ label, value }) => (
                    <li key={label}>
                        {label}: {value}
                    </li>
                ))}
        </ul>
    );
}

export default MotorList;
