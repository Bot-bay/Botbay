import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function MachinedList({ part }) {
    const { t } = useTranslation();
    const { stats } = part || {};
    if (!stats) return null;

    const rows = [
        {
            label: t("sizelwhmm"),
            value: stats.size?.map((v) => `${v}mm`).join(", ") ?? "",
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

export default MachinedList;
