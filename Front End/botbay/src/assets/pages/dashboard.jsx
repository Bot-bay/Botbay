import "../styles/phone-dashboard.css";
import React, { useState, useEffect, useRef } from "react";
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
import { isUserSignedIn } from "../scripts/auth.js";
import { io } from "socket.io-client";
import { setSocketId } from "../scripts/database.js";

import { useTranslation } from "react-i18next";

import { languages } from "../scripts/localization.js";

function Dashboard() {
    const { t, i18n } = useTranslation();

    const [partToRun, setPartToRun] = React.useState(null);
    const [usePartToRun, setUsePartToRun] = React.useState(false);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [isMobileExpanded, setIsMobileExpanded] = React.useState(false);

    const isDesktop = useMediaQuery({ query: "(min-width: 1100px)" });

    const [isHydrating, setIsHydrating] = React.useState(true);

    const [teamId, setTeamId] = useState(null);

    const LanguageDropdown = () => {
        const currentLang =
            languages.find((l) => l.code === i18n.language) || languages[0];

        return (
            <div
                ref={dropdownRef}
                className="nav-language-dropdown"
                style={{
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                }}
            >
                <div
                    onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                    style={{
                        cursor: "pointer",
                        width: isDesktop ? "85%" : "90%",
                        padding: isDesktop ? "12px 15px" : "15px",
                        color: languageMenuOpen ? "white" : "#94a3b8",
                        background: languageMenuOpen
                            ? "rgba(255, 255, 255, 0.05)"
                            : "transparent",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "15px",
                        transition: "all 200ms ease",
                        boxSizing: "border-box",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                            "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                        if (!languageMenuOpen) {
                            e.currentTarget.style.backgroundColor =
                                "transparent";
                            e.currentTarget.style.color = "#94a3b8";
                        }
                    }}
                >
                    <span style={{ fontSize: isDesktop ? "1.2rem" : "4rem" }}>
                        {currentLang.flag}
                    </span>
                    <span
                        style={{
                            fontFamily: "Inter",
                            fontSize: isDesktop ? "1.1rem" : "4rem",
                            fontWeight: languageMenuOpen ? "700" : "500",
                            margin: 0,
                        }}
                    >
                        {currentLang.label}
                    </span>
                </div>

                {languageMenuOpen && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: "calc(100% + 10px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: isDesktop ? "85%" : "90%",
                            backgroundColor: "#1d1e2c",
                            borderRadius: "8px",
                            boxShadow: "0 10px 5px rgba(0,0,0,0.6)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            zIndex: 1000,
                            maxHeight: isDesktop ? "220px" : "50vh",
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            padding: "6px 0",
                            boxSizing: "border-box",
                        }}
                    >
                        {languages.map((lang) => (
                            <div
                                key={lang.code}
                                onClick={() => {
                                    i18n.changeLanguage(lang.code);
                                    setLanguageMenuOpen(false);
                                }}
                                style={{
                                    padding: isDesktop ? "12px 15px" : "5px",
                                    cursor: "pointer",
                                    color:
                                        i18n.language === lang.code
                                            ? "white"
                                            : "#94a3b8",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "20px",
                                    fontSize: isDesktop ? "1.1rem" : "3.5rem",
                                    background:
                                        i18n.language === lang.code
                                            ? "#281a68"
                                            : "transparent",
                                    transition: "all 200ms ease",
                                    fontFamily: "Inter",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        i18n.language === lang.code
                                            ? "#281a68"
                                            : "rgba(255,255,255,0.05)";
                                    e.currentTarget.style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        i18n.language === lang.code
                                            ? "#281a68"
                                            : "transparent";
                                    if (i18n.language !== lang.code)
                                        e.currentTarget.style.color = "#94a3b8";
                                }}
                            >
                                <span>{lang.flag}</span>
                                <span
                                    style={{
                                        fontWeight:
                                            i18n.language === lang.code
                                                ? "700"
                                                : "500",
                                    }}
                                >
                                    {lang.label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setLanguageMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRealtimeSync = (action, payload) => {
        // 1. Determine which key we are touching
        let storageKey = "";
        if (action.includes("part") || action.includes("quant"))
            storageKey = "partData";
        else if (action.includes("battery")) storageKey = "batteryList";
        else if (action.includes("tag")) storageKey = "taglist";

        // Safety: If no key or no payload, stop immediately
        if (!storageKey || !payload) return;

        // --- FULL OVERWRITE CHECK ---
        if (Array.isArray(payload)) {
            localStorage.setItem(storageKey, JSON.stringify(payload));
            window.dispatchEvent(new Event("storage"));
            console.log(`[Sync]Full overwrite applied to ${storageKey}`);
            return;
        }

        // 2. FETCH AND PARSE DATA
        const raw = localStorage.getItem(storageKey);
        let currentData = [];
        try {
            currentData = JSON.parse(raw || "[]");
        } catch (e) {
            console.error("Storage Parse Error:", e);
            return;
        }

        // 3. IDENTIFIER EXTRACTION (The "Smart Match")
        // We look for .id first (Parts), then .name (Batteries/Tags)
        const incomingId = payload.id !== undefined ? String(payload.id) : null;
        const incomingName = payload.name || null;
        const targetVal = incomingId || incomingName;

        if (!targetVal) {
            console.warn("[Sync]No identifier found in payload:", payload);
            return;
        }

        // Helper to get the ID/Name of an item in the existing array
        const getIdentifier = (item) =>
            item.id !== undefined ? String(item.id) : item.name;

        // 4. THE ECHO SHIELD
        const exists = currentData.some(
            (item) => getIdentifier(item) === targetVal,
        );

        if (action.endsWith("_added") && exists) return;
        if (action.endsWith("_deleted") && !exists) return;

        let updatedData = [...currentData];

        // 5. PERFORM THE ACTION
        if (action.endsWith("_added")) {
            updatedData = [...currentData, payload];
            console.log(`Sync Add: ${targetVal}`);
        } else if (action.endsWith("_deleted")) {
            updatedData = currentData.filter(
                (item) => getIdentifier(item) !== targetVal,
            );
            console.log(`Sync Delete: ${targetVal}`);
        } else if (
            action.includes("update") ||
            action.includes("logic") ||
            action.includes("quant")
        ) {
            // This handles "quant_updated", "part_updated", and "overwrite-logic"
            if (!exists) {
                // Fallback: If we missed the 'add' event, add it now
                updatedData = [...currentData, payload];
            } else {
                updatedData = currentData.map((item) =>
                    getIdentifier(item) === targetVal
                        ? { ...item, ...payload }
                        : item,
                );
            }
            console.log(`Sync Update: ${targetVal}`);
        }

        // 6. PERSIST AND NOTIFY UI
        localStorage.setItem(storageKey, JSON.stringify(updatedData));
        window.dispatchEvent(new Event("storage"));
    };

    // 1. WebSocket Listener for Real-time Updates
    useEffect(() => {
        if (!teamId) return;

        // Use a single instance and clean up properly
        const socket = io(
            "https://botbay-python-services-latest.onrender.com",
            {
                transports: ["websocket", "polling"],
                reconnection: true,
            },
        );

        socket.on("connect", () => {
            console.log("SOCKET: Connected! ID:", socket.id);

            setSocketId(socket.id);

            const getFreshToken = () => {
                const key =
                    Object.keys(localStorage).find((k) =>
                        k.includes("-auth-token"),
                    ) ||
                    Object.keys(sessionStorage).find((k) =>
                        k.includes("-auth-token"),
                    );
                if (!key) return null;
                try {
                    const data = JSON.parse(
                        localStorage.getItem(key) ||
                            sessionStorage.getItem(key),
                    );
                    return data?.access_token || null;
                } catch {
                    return null;
                }
            };

            socket.emit("join_team_room", {
                teamId: teamId,
                token: getFreshToken(),
            });
        });

        socket.on("joined", (resp) => {
            console.log("SOCKET: Confirmed in Room:", resp.room);
        });

        // THE LISTENER
        socket.on("database_update", (data) => {
            console.log("SOCKET DATA ARRIVED:", data);
            handleRealtimeSync(data.action, data.payload);
        });

        socket.on("disconnect", (reason) => {
            console.warn("SOCKET: Disconnected:", reason);
        });

        return () => {
            console.log("SOCKET: Cleaning up connection...");
            socket.off("database_update");
            socket.off("joined");
            socket.disconnect();
        };
    }, [teamId]);

    useEffect(() => {
        const hydrateDashboard = async () => {
            console.log("attempting hydrate 1: Initialization");
            try {
                // 1. Sign-In Guard: Check BOTH Session and Local Storage for the Supabase token
                const findAuthToken = () => {
                    const sKey = Object.keys(sessionStorage).find((k) =>
                        k.includes("-auth-token"),
                    );
                    const lKey = Object.keys(localStorage).find((k) =>
                        k.includes("-auth-token"),
                    );
                    return (
                        (sKey ? sessionStorage.getItem(sKey) : null) ||
                        (lKey ? localStorage.getItem(lKey) : null)
                    );
                };

                const sessionData = findAuthToken();

                if (!sessionData) {
                    console.log(
                        "Hydration stopped: No active session found in storage.",
                    );
                    setIsHydrating(false);
                    return;
                }

                console.log("attempting hydrate 2: Session verified");

                // 2. Aggression Guard: If we already have data, DON'T overwrite it.
                const localParts = localStorage.getItem("partData");
                if (localParts && localParts !== "[]") {
                    console.log(
                        "Hydration skipped: Local cache already populated.",
                    );
                    setIsHydrating(false);
                    return;
                }

                // 3. Fetch Team Identity
                const groupData = await fetchGroupData();
                console.log(
                    "attempting hydrate 3: Group metadata fetched",
                    groupData,
                );

                if (groupData.success && groupData.groupId) {
                    const groupData = await fetchGroupData();
                    setTeamId(groupData.groupId);
                    console.log(
                        "attempting hydrate 4: Fetching cloud inventory for Team",
                        groupData.groupId,
                    );

                    const cloudData = await getCloudData(groupData.groupId);

                    if (cloudData && !cloudData.error) {
                        // Atomic save to LocalStorage
                        localStorage.setItem(
                            "partData",
                            JSON.stringify(cloudData.parts || []),
                        );
                        localStorage.setItem(
                            "taglist",
                            JSON.stringify(cloudData.tags || []),
                        );
                        localStorage.setItem(
                            "batteryList",
                            JSON.stringify(cloudData.batteries || []),
                        );

                        window.dispatchEvent(new Event("storage"));
                        console.log(
                            "Hydration Complete: Dashboard synced with Cloud.",
                        );
                    }
                } else {
                    console.warn(
                        "Hydration failed: Could not link user to a valid Group ID.",
                    );
                }
            } catch (err) {
                console.error("Hydration Critical Failure:", err);
            } finally {
                console.log(
                    "attempting hydrate 5: Cleaning up hydration state",
                );
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
        { name: t("home"), icon: <FaHome />, index: 0 },
        { name: t("parts"), icon: <FaTools />, index: 1 },
        { name: t("batteries"), icon: <FaBatteryFull />, index: 2 },
        { name: t("settings"), icon: <IoMdSettings />, index: 3 },
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
                        fontSize: isDesktop ? "1.2rem" : "3rem",
                        fontWeight: "500",
                        margin: 0,
                    }}
                >
                    {t("syncingwithcloud")}
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
                    <div style={{ marginTop: "auto" }}>
                        <LanguageDropdown />
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
                    {isMobileExpanded && (
                        <div style={{ marginTop: "auto" }}>
                            <LanguageDropdown />
                        </div>
                    )}
                </div>
            )}
            <div className="dashboardcontainer">{renderPageContent()}</div>
        </div>
    );
}

export default Dashboard;
