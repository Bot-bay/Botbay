import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import "../../../styles/dashboard.css";

function HomePageDesktop() {
    const partDataRaw = localStorage.getItem("partData");
    const tagListRaw = localStorage.getItem("taglist");

    const partData = useMemo(() => {
        try {
            return partDataRaw ? JSON.parse(partDataRaw) : [];
        } catch (e) {
            return [];
        }
    }, [partDataRaw]);

    const tagList = useMemo(() => {
        try {
            return tagListRaw ? JSON.parse(tagListRaw) : [];
        } catch (e) {
            return [];
        }
    }, [tagListRaw]);

    const tagColorMap = useMemo(() => {
        return Object.fromEntries(tagList.map((t) => [t.name, t.color]));
    }, [tagList]);

    const chartData = useMemo(() => {
        const tagCounts = {};
        partData.forEach((part) => {
            part.tags?.forEach((tag) => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });
        return Object.keys(tagCounts).map((tag) => ({
            name: tag,
            value: tagCounts[tag],
            fill: tagColorMap[tag] || "#44327a",
        }));
    }, [partData, tagColorMap]);

    const totalParts = partData.length;
    const totalQuantity = partData.reduce(
        (acc, part) => acc + (part.quantity || 0),
        0,
    );

    const mostUsedTag = useMemo(() => {
        return (
            [...chartData].sort((a, b) => b.value - a.value)[0]?.name || "None"
        );
    }, [chartData]);

    const criticalStock = useMemo(() => {
        return partData.filter(
            (part) => part.quantity - part.needed < 0 || part.quantity === 0,
        );
    }, [partData]);

    return (
        <>
            <div className="d-homepagecontainer">
                <div className="d-titlecontainer">
                    <p>Home</p>
                </div>
                <div className="d-gridcontainer-3c2r">
                    <div className="d-griditem-2r">
                        <p id="d-griditem-title">Members</p>
                        <table id="d-griditem-membertable">
                            <tbody>
                                <tr>
                                    <th>Members</th>
                                    <th>Admin</th>
                                </tr>
                                <tr>
                                    <td>Test@email.com</td>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Test@email.com</td>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="d-griditem-membertable-bottombuttoncontainer">
                            <button id="d-griditem-membertable-bottombuttoncontainer-1">
                                Invite
                            </button>
                            <button id="d-griditem-membertable-bottombuttoncontainer-2">
                                Update
                            </button>
                        </div>
                    </div>

                    <div className="d-griditem-2r" style={{ gridColumn: 2 }}>
                        <p id="d-griditem-title">Parts Distribution</p>

                        <div
                            style={{
                                width: "100%",
                                height: "220px",
                                marginTop: "10px",
                            }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={80}
                                        dataKey="value"
                                        stroke="#1d1e2c"
                                        strokeWidth={2}
                                        isAnimationActive={true}
                                        activeShape={{
                                            outerRadius: 80,
                                            stroke: "#fff",
                                            strokeWidth: 2,
                                        }}
                                        activeIndex={chartData.findIndex(
                                            (d) => d.name === mostUsedTag,
                                        )}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.fill}
                                                style={{
                                                    outline: "none",
                                                    cursor: "default",
                                                }}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#1d1e2c",
                                            border: "1px solid #44327a",
                                            borderRadius: "8px",
                                            fontSize: "12px",
                                        }}
                                        itemStyle={{ color: "#fff" }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div style={{ padding: "0 20px", color: "white" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "8px 0",
                                    borderBottom:
                                        "1px solid rgba(255,255,255,0.05)",
                                    fontSize: "0.9rem",
                                }}
                            >
                                <span style={{ color: "#94a3b8" }}>
                                    Total Items
                                </span>
                                <span style={{ fontWeight: "600" }}>
                                    {totalParts}
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "8px 0",
                                    borderBottom:
                                        "1px solid rgba(255,255,255,0.05)",
                                    fontSize: "0.9rem",
                                }}
                            >
                                <span style={{ color: "#94a3b8" }}>
                                    Stock Volume
                                </span>
                                <span style={{ fontWeight: "600" }}>
                                    {totalQuantity}
                                </span>
                            </div>
                            <p
                                style={{
                                    marginTop: "15px",
                                    fontSize: "0.85rem",
                                    color: "#94a3b8",
                                    lineHeight: "1.5",
                                    textAlign: "center",
                                }}
                            >
                                Inventory is weighted toward{" "}
                                <span
                                    style={{
                                        color:
                                            tagColorMap[mostUsedTag] ||
                                            "#a78bfa",
                                        fontWeight: "600",
                                    }}
                                >
                                    {mostUsedTag}
                                </span>{" "}
                                components across {chartData.length} active
                                categories.
                            </p>
                        </div>

                        <div className="d-homedash-part-critical-container">
                            <p
                                style={{
                                    fontSize: "0.8rem",
                                    fontWeight: "700",
                                    color: "#ef4444",
                                    marginBottom: "10px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                Critical Stock ({criticalStock.length})
                            </p>
                            <div className="d-homedash-part-scroll-area">
                                {criticalStock.length > 0 ? (
                                    criticalStock.map((part, i) => (
                                        <div
                                            key={i}
                                            className="d-homedash-part-critical-item"
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: "0.85rem",
                                                        color: "white",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {part.name}
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: "0.7rem",
                                                        color: "#94a3b8",
                                                    }}
                                                >
                                                    {part.manufacturerId ||
                                                        "No ID"}
                                                </span>
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                <span
                                                    style={{
                                                        color: "#ef4444",
                                                        fontWeight: "700",
                                                        fontSize: "0.9rem",
                                                    }}
                                                >
                                                    {part.quantity -
                                                        part.needed}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p
                                        style={{
                                            fontSize: "0.8rem",
                                            color: "#64748b",
                                            textAlign: "center",
                                            marginTop: "10px",
                                        }}
                                    >
                                        All items in stock.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="d-griditem-2r" style={{ gridColumn: 3 }}>
                        <p id="d-griditem-title">Batteries</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePageDesktop;
