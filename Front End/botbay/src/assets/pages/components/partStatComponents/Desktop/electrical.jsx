import React from "react";
import { useTranslation } from "react-i18next";

function ElectricalList({ part }) {
    const { t } = useTranslation();
    const { stats } = part || {};
    if (!stats) return null;

    const rows = [
        {
            label: t("connectortypes"),
            value: stats.connector_types?.join(", ") ?? null,
        },
        {
            label: t("voltage"),
            value: stats.voltage != null ? `${stats.voltage} V` : null,
        },
        {
            label: t("batterycapacity"),
            value: stats.capacity != null ? `${stats.capacity} Ah` : null,
        },
        {
            label: t("wiregauge"),
            value: stats.wire_gauge != null ? `${stats.wire_gauge} AWG` : null,
        },
        {
            label: t("wirelength"),
            value: stats.wire_length != null ? `${stats.wire_length} mm` : null,
        },
        {
            label: t("maxdischarge"),
            value:
                stats.max_discharge != null ? `${stats.max_discharge} A` : null,
        },
        {
            label: t("chargerates"),
            value:
                stats.charge_rates != null ? `${stats.charge_rates} C` : null,
        },
        {
            label: t("weightg"),
            value: stats.weight != null ? `${stats.weight} g` : null,
        },
        {
            label: t("replaceablefuse"),
            value:
                stats.replaceable_fuse != null
                    ? stats.replaceable_fuse
                        ? t("yes")
                        : t("no")
                    : null,
        },
        {
            label: t("sizelwhmm"),
            value:
                stats.size &&
                stats.size.length === 3 &&
                stats.size.every(
                    (v) => v !== null && v !== undefined && v !== "",
                )
                    ? stats.size.map((v) => `${v}mm`).join(", ")
                    : "",
        },
    ];

    return (
        <ul>
            {rows
                .filter((row) => row.value != null && row.value !== "")
                .map(({ label, value }) => (
                    <li key={label}>
                        <strong>{label}:</strong> {value}
                    </li>
                ))}
        </ul>
    );
}

export default ElectricalList;
