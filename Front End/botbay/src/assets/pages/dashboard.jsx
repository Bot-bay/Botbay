import "../styles/phone-dashboard.css";
import React, { useState, useEffect } from "react";
import "../styles/sharedstyles.css";
import "../styles/dashboard.css";
import { useMediaQuery } from "react-responsive";

import {
    FaHome,
    FaTools,
    FaBatteryFull,
    FaBars,
    FaTimes,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

import HomePageDesktop from "./sub-pages/desktop/dashboardHome";

import PartsPageDesktop from "./sub-pages/desktop/dashboardParts";
import PartsPagePhone from "./sub-pages/phone/dashboardParts";

import BatteryPageDesktop from "./sub-pages/desktop/dashboardBattery";
import BatteryPagePhone from "./sub-pages/phone/dashboardBattery";

import SettingsPageDesktop from "./sub-pages/desktop/dashboardSettings";
import SettingsPagePhone from "./sub-pages/phone/dashboardSettings";

import sidebarLogo from "../images/LogoTrans.png";

import { getCloudData } from "../scripts/database.js";

import { fetchGroupData } from "../scripts/auth.js";

function Dashboard() {
    const [partToRun, setPartToRun] = React.useState(null);
    const [usePartToRun, setUsePartToRun] = React.useState(false);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [isMobileExpanded, setIsMobileExpanded] = React.useState(false);

    const isDesktop = useMediaQuery({ query: "(min-width: 1100px)" });

    const [isHydrating, setIsHydrating] = React.useState(true);

    useEffect(() => {
        const hydrateDashboard = async () => {
            try {
                // 1. Check if data is already there (Hydration Guard)
                if (localStorage.getItem("partData")) {
                    setIsHydrating(false);
                    return;
                }

                // 2. Fetch Group ID and User Context via auth.js
                const groupData = await fetchGroupData();

                if (groupData.success && groupData.groupId) {
                    // 3. Pull the "Save Slot" from Python via database.js
                    const cloudData = await getCloudData(groupData.groupId);

                    if (cloudData && !cloudData.error) {
                        localStorage.setItem(
                            "partData",
                            JSON.stringify(cloudData.parts || []),
                        );
                        localStorage.setItem(
                            "tagslist",
                            JSON.stringify(cloudData.tags || []),
                        );
                        localStorage.setItem(
                            "batteryList",
                            JSON.stringify(cloudData.batteries || []),
                        );
                    }
                }
            } catch (err) {
                console.error("Hydration failed:", err);
            } finally {
                setIsHydrating(false);
            }
        };

        hydrateDashboard();
    }, []);

    function handleLowStockClick(part) {
        if (
            part.links.Store !== "" &&
            part.links.Store !== null &&
            part.links.Store !== undefined
        ) {
            window.open(part.links.Store, "_blank", "noopener,noreferrer");
        } else {
            setUsePartToRun(true);
            setPartToRun(part);
            setPageIndex(1);
        }
    }

    function handleReturnToDashboard() {
        setPageIndex(0);
    }

    function handleResetOfPart() {
        setUsePartToRun(false);
        setPartToRun(null);
    }

    const navItems = [
        { name: "Home", icon: <FaHome />, index: 0 },
        { name: "Parts", icon: <FaTools />, index: 1 },
        { name: "Batteries", icon: <FaBatteryFull />, index: 2 },
        { name: "Settings", icon: <IoMdSettings />, index: 3 },
    ];

    const renderPageContent = () => {
        if (isDesktop) {
            switch (pageIndex) {
                case 0:
                    return (
                        <HomePageDesktop
                            handleLowStockClick={handleLowStockClick}
                            handleBatteryClick={() => setPageIndex(2)}
                        />
                    );
                case 1:
                    return (
                        <PartsPageDesktop
                            partToRun={partToRun}
                            usePartToRun={usePartToRun}
                            onReturn={handleReturnToDashboard}
                            onReset={handleResetOfPart}
                        />
                    );
                case 2:
                    return <BatteryPageDesktop />;
                case 3:
                    return <SettingsPageDesktop />;
                default:
                    return <HomePageDesktop />;
            }
        } else {
            switch (pageIndex) {
                case 0:
                    return (
                        <HomePageDesktop
                            handleLowStockClick={handleLowStockClick}
                            handleBatteryClick={() => setPageIndex(2)}
                        />
                    );
                case 1:
                    return (
                        <PartsPageDesktop
                            partToRun={partToRun}
                            usePartToRun={usePartToRun}
                            onReturn={handleReturnToDashboard}
                            onReset={handleResetOfPart}
                        />
                    );
                case 2:
                    return <BatteryPageDesktop />;
                case 3:
                    return <SettingsPageDesktop />;
                default:
                    return <HomePagePhone />;
            }
        }
    };

    if (isHydrating) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "#1a1a1a",
                    color: "white",
                    fontFamily: "sans-serif",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 9999,
                }}
            >
                {/* The Spinner */}
                <div
                    style={{
                        width: isDesktop ? "50px" : "40px",
                        height: isDesktop ? "50px" : "40px",
                        border: "5px solid rgba(255, 255, 255, 0.1)",
                        borderTop: "5px solid #ffffff",
                        borderRadius: "50%",
                        marginBottom: "20px",
                        animation: "spin 1s linear infinite",
                    }}
                />

                {/* The Text */}
                <p
                    style={{
                        fontSize: isDesktop ? "1.2rem" : "1rem",
                        fontWeight: "500",
                        margin: 0,
                    }}
                >
                    Syncing with cloud...
                </p>

                {/* Inline Animation Definition */}
                <style>
                    {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
                </style>
            </div>
        );
    }

    return (
        <div className="dashboardscreencontainer">
            {!isDesktop && (
                <div
                    className={`phone-sidebar-overlay ${isMobileExpanded ? "phone-sidebar-overlay-active" : ""}`}
                    onClick={() => setIsMobileExpanded(false)}
                />
            )}

            {isDesktop ? (
                <div className="sidebar">
                    <img className="sidebarlogo" src={sidebarLogo} alt="logo" />
                    <div className="sidebaritemcontainer">
                        {navItems.map((item) => (
                            <div
                                key={item.index}
                                className={`sidebaritem ${pageIndex === item.index ? "sidebaritemhighlighted" : ""}`}
                                onClick={() => setPageIndex(item.index)}
                            >
                                <p>
                                    {item.icon}
                                    <span style={{ marginLeft: "12px" }}>
                                        {item.name}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div
                    className={`phone-sidebar ${isMobileExpanded ? "phone-sidebar-expanded" : ""}`}
                >
                    <div
                        className="phone-sidebar-toggle"
                        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
                    >
                        {isMobileExpanded ? <FaTimes /> : <FaBars />}
                    </div>

                    {isMobileExpanded && (
                        <img
                            className="phone-sidebar-logo"
                            src={sidebarLogo}
                            alt="logo"
                        />
                    )}

                    <div className="phone-sidebar-item-container">
                        {navItems.map((item) => (
                            <div
                                key={item.index}
                                className={`phone-sidebar-item ${pageIndex === item.index ? "phone-sidebar-item-highlighted" : ""}`}
                                onClick={() => {
                                    setPageIndex(item.index);
                                    setIsMobileExpanded(false);
                                }}
                            >
                                <div className="phone-sidebar-icon-wrapper">
                                    {item.icon}
                                </div>
                                {isMobileExpanded && (
                                    <p className="phone-sidebar-text">
                                        {item.name}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="dashboardcontainer">{renderPageContent()}</div>
        </div>
    );
}

export default Dashboard;
