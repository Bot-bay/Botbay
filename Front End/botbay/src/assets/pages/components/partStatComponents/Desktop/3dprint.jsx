import React from "react";
import { useTranslation } from "react-i18next";

function PrintedList({ part }) {
    const { t } = useTranslation();
    const { stats } = part || {};
    if (!stats) return null;

    const rows = [
        {
            label: t("sizelwhmm"),
            value:
                stats.size?.length === 3
                    ? `${stats.size[0]} x ${stats.size[1]} x ${stats.size[2]} mm`
                    : null,
        },
        {
            label: t("3dprintstatex1"),
            value: stats.filament ?? null,
        },
        {
            label: t("filamentamount"),
            value:
                stats.filament_amount != null
                    ? `${stats.filament_amount} g`
                    : null,
        },
        {
            label: t("cost"),
            value: stats.cost != null ? `$${stats.cost.toFixed(2)}` : null,
        },
        {
            label: t("time"),
            value:
                Array.isArray(stats.time) &&
                stats.time.length === 2 &&
                stats.time.some((tVal) => Number(tVal) > 0)
                    ? `${stats.time[0]}h ${stats.time[1]}m`
                    : null,
        },
        {
            label: t("infill"),
            value:
                stats.infill != null
                    ? `${stats.infill}%${
                          stats.infill_pattern
                              ? ` (${stats.infill_pattern} pattern)`
                              : ""
                      }`
                    : null,
        },
        {
            label: t("wallloops"),
            value: stats.wall_loops ?? null,
        },
        {
            label: t("supports"),
            value:
                stats.support !== null
                    ? stats.support
                        ? `${t("yes")} (${stats.support_type ?? t("standard")})`
                        : t("no")
                    : null,
        },
        {
            label: t("onbuildplateonly"),
            value:
                stats.on_buildplate_only != null
                    ? stats.on_buildplate_only
                        ? t("yes")
                        : t("no")
                    : null,
        },
        {
            label: t("removesmalloverhangs"),
            value:
                stats.remove_small_overhangs != null
                    ? stats.remove_small_overhangs
                        ? t("yes")
                        : t("no")
                    : null,
        },
        {
            label: t("thresholdangle"),
            value:
                stats.threshold_angle != null
                    ? `${stats.threshold_angle}°`
                    : null,
        },
        {
            label: t("brimtype"),
            value:
                stats.brim_type !== "none" &&
                stats.brim_type != null &&
                stats.brim_type !== ""
                    ? `${stats.brim_type}${
                          stats.brim_width ? ` (${stats.brim_width}mm)` : ""
                      }`
                    : null,
        },
        {
            label: t("brimobjectgap"),
            value:
                stats.brim_object_gap != null && stats.brim_object_gap !== ""
                    ? `${stats.brim_object_gap} mm`
                    : null,
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

export default PrintedList;
