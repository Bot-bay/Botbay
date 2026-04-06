import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function ServoList({ part }) {
    const { t } = useTranslation();
    const { stats } = part || {};
    if (!stats) return null;

    const rows = [
        {
            label: t("sizelwhmm"),
            value: stats.size?.map((v) => `${v}mm`).join(", ") ?? "",
        },
        {
            label: t("weightg"),
            value: stats.weight != null ? `${stats.weight} g` : null,
        },
        {
            label: t("stallcurrent"),
            value:
                stats.stall_current != null ? `${stats.stall_current} A` : null,
        },
        {
            label: t("angularrange"),
            value:
                stats.angular_range != null ? `${stats.angular_range}°` : null,
        },
        {
            label: t("gearmaterial"),
            value:
                stats.gear_material != null ? `${stats.gear_material}` : null,
        },
        {
            label: t("voltage"),
            value: stats.voltage != null ? `${stats.voltage} V` : null,
        },
        {
            label: t("speedsec60"),
            value: stats.speed != null ? `${stats.speed} s/60°` : null,
        },
        {
            label: t("stalltorque"),
            value:
                stats.stall_torque != null ? `${stats.stall_torque} Nm` : null,
        },
        {
            label: t("splinetype"),
            value: stats.spline_type != null ? `${stats.spline_type}` : null,
        },
        {
            label: t("splinethreadtype"),
            value:
                stats.spline_thread_type != null
                    ? `${stats.spline_thread_type}`
                    : null,
        },
        {
            label: t("splineinternaldepthmm"),
            value:
                stats.spline_internal_depth != null
                    ? `${stats.spline_internal_depth} mm`
                    : null,
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

export default ServoList;
