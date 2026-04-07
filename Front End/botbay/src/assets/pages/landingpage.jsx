import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import "../styles/landingpage.css";
import "../styles/sharedstyles.css";
import { switchToPage, WikiUrl } from "../scripts/navigation.js";

import { Link } from "react-router-dom";

import { FaInstagram, FaDiscord, FaEnvelope } from "react-icons/fa6";
import { MdShield } from "react-icons/md";

import multiDeviceIcon from "../images/multideviceicon.png";
import listIcon from "../images/listicon.png";
import bookIcon from "../images/bookicon.png";
import navlogo from "../images/LogoTrans.png";
import stormLogo from "../images/stormlogo.png";
import knightsLogo from "../images/knightslogo.png";
import dashboardImage from "../images/dashboard.png";

import landingImage1 from "../images/landingimagerest1.png";
import landingImage2 from "../images/landingimagerest2.png";
import landingImage3 from "../images/landingimagerest3.png";

import { useTranslation } from "react-i18next";
import i18n from "i18next";

import { languages } from "../scripts/localization.js";

function LandingPage() {
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
    const currentLanguage =
        languages.find((lang) => lang.code === i18n.language) || languages[0];

    const { t } = useTranslation();

    const isDesktop = useMediaQuery({ query: "(min-width: 1100px)" });
    const goToSignUp = switchToPage("/signup");
    const goToSignIn = switchToPage("/signin");
    const goToDashboard = switchToPage("/dashboard");

    const goToWiki = () => {
        window.open(WikiUrl);
    };

    const aboutRef = useRef(null);

    const scrollToAbout = () => {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
    };

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

    return (
        <>
            <div className="screencontainer">
                {isDesktop ? (
                    <>
                        <div className="navbar">
                            <div className="halfcontainer">
                                <div className="leftcontainer">
                                    <img
                                        draggable="false"
                                        className="navlogo"
                                        src={navlogo}
                                    ></img>
                                    <p className="navtitle">Botbay</p>
                                </div>
                            </div>
                            <div className="halfcontainer">
                                <div className="rightcontainer">
                                    <div
                                        className="navtexthelper"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <div
                                            className="nav-language-dropdown"
                                            ref={dropdownRef}
                                            style={{ position: "relative" }}
                                        >
                                            <button
                                                onClick={() =>
                                                    setLanguageMenuOpen(
                                                        (prev) => !prev,
                                                    )
                                                }
                                                style={{
                                                    background: "transparent",
                                                    border: "none",
                                                    color: "white",
                                                    cursor: "pointer",
                                                    fontSize: "1rem",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.3rem",
                                                }}
                                            >
                                                {`${currentLanguage.flag} ${currentLanguage.label}`}{" "}
                                                ▼
                                            </button>

                                            {languageMenuOpen && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: "100%",
                                                        left: "50%",
                                                        transform:
                                                            "translateX(-50%)",
                                                        zIndex: 10,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            background:
                                                                "rgba(255, 255, 255, 0.05)",
                                                            borderRadius: "4px",
                                                            boxShadow:
                                                                "0 2px 8px rgba(0,0,0,0.5)",
                                                            backdropFilter:
                                                                "blur(6px)",
                                                            minWidth: "5rem",
                                                            maxHeight: "10rem",
                                                            overflowY: "auto",
                                                        }}
                                                    >
                                                        {languages.map(
                                                            (lang) => (
                                                                <div
                                                                    key={
                                                                        lang.code
                                                                    }
                                                                    onClick={() => {
                                                                        i18n.changeLanguage(
                                                                            lang.code,
                                                                        );
                                                                        setLanguageMenuOpen(
                                                                            false,
                                                                        );
                                                                    }}
                                                                    style={{
                                                                        padding:
                                                                            "0.5rem 1rem",
                                                                        cursor: "pointer",
                                                                        color: "white",
                                                                        whiteSpace:
                                                                            "nowrap",
                                                                        transition:
                                                                            "background 0.2s",
                                                                        textAlign:
                                                                            "center",
                                                                    }}
                                                                    onMouseEnter={(
                                                                        e,
                                                                    ) =>
                                                                        (e.currentTarget.style.background =
                                                                            "rgba(255,255,255,0.1)")
                                                                    }
                                                                    onMouseLeave={(
                                                                        e,
                                                                    ) =>
                                                                        (e.currentTarget.style.background =
                                                                            "transparent")
                                                                    }
                                                                >
                                                                    {lang.flag}{" "}
                                                                    {lang.label}
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <p
                                            className="navunderlinebutton"
                                            onClick={goToWiki}
                                        >
                                            {t("wiki")}
                                        </p>
                                        <p
                                            className="navunderlinebutton"
                                            onClick={scrollToAbout}
                                        >
                                            {t("about")}
                                        </p>
                                        <button
                                            className="navbutton"
                                            onClick={goToSignIn}
                                        >
                                            {t("signin")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="herocontainer">
                            <div className="halfcontainer">
                                <div className="vertical33container">
                                    <p className="herotitle">
                                        {t("heroTitle")}
                                    </p>
                                </div>
                                <div className="vertical34container">
                                    <div className="halfcontainer">
                                        <div className="leftcontainer">
                                            <ul>
                                                <li>{t("point1")}</li>
                                                <li>{t("point2")}</li>
                                                <li>{t("point3")}</li>
                                                <li>{t("point4")}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="halfcontainer">
                                        <div className="rowcontainer">
                                            <img
                                                draggable="false"
                                                className="heroicon"
                                                src={multiDeviceIcon}
                                            ></img>
                                            <img
                                                draggable="false"
                                                className="heroicon"
                                                src={listIcon}
                                            ></img>
                                            <img
                                                draggable="false"
                                                className="heroicon"
                                                src={bookIcon}
                                            ></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="vertical33container">
                                    <div className="evenspreadflex">
                                        <button
                                            className="herobutton"
                                            onClick={goToSignUp}
                                        >
                                            {t("signup")}
                                        </button>
                                        <button
                                            className="herobutton"
                                            onClick={goToDashboard}
                                        >
                                            {t("tryitout")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="halfcontainer">
                                <img
                                    className="mainimage"
                                    alt="dashboard image"
                                    src={dashboardImage}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className="navbar"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div
                                className="halfcontainersmallnav"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                }}
                            >
                                <img
                                    draggable="false"
                                    className="navlogo"
                                    src={navlogo}
                                ></img>
                                <p className="navtitle">Botbay</p>
                            </div>

                            <div
                                className="nav-language-dropdown"
                                ref={dropdownRef}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    position: "relative",
                                }}
                            >
                                <button
                                    onClick={() =>
                                        setLanguageMenuOpen((prev) => !prev)
                                    }
                                    style={{
                                        background: "transparent",
                                        border: "none",
                                        color: "white",
                                        cursor: "pointer",
                                        fontSize: "3.5rem",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        padding: "0.5rem 1rem",
                                    }}
                                >
                                    {`${currentLanguage.flag} ${currentLanguage.label}`}{" "}
                                    ▼
                                </button>

                                {languageMenuOpen && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            zIndex: 10,
                                        }}
                                    >
                                        <div
                                            style={{
                                                background:
                                                    "rgba(255, 255, 255, 0.05)",
                                                borderRadius: "6px",
                                                boxShadow:
                                                    "0 3px 10px rgba(0,0,0,0.5)",
                                                backdropFilter: "blur(6px)",
                                                minWidth: "8rem",
                                                maxHeight: "15rem",
                                                overflowY: "auto",
                                            }}
                                        >
                                            {languages.map((lang) => (
                                                <div
                                                    key={lang.code}
                                                    onClick={() => {
                                                        i18n.changeLanguage(
                                                            lang.code,
                                                        );
                                                        setLanguageMenuOpen(
                                                            false,
                                                        );
                                                    }}
                                                    style={{
                                                        padding: "1rem 2rem",
                                                        cursor: "pointer",
                                                        color: "white",
                                                        whiteSpace: "nowrap",
                                                        transition:
                                                            "background 0.2s",
                                                        textAlign: "center",
                                                        fontSize: "3rem",
                                                    }}
                                                    onMouseEnter={(e) =>
                                                        (e.currentTarget.style.background =
                                                            "rgba(255,255,255,0.1)")
                                                    }
                                                    onMouseLeave={(e) =>
                                                        (e.currentTarget.style.background =
                                                            "transparent")
                                                    }
                                                >
                                                    {lang.flag} {lang.label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="halfcontainer">
                                <div className="navtexthelper">
                                    <p
                                        className="navunderlinebutton"
                                        onClick={goToWiki}
                                    >
                                        {t("wiki")}
                                    </p>
                                    <p
                                        className="navunderlinebutton"
                                        onClick={scrollToAbout}
                                    >
                                        {t("about")}
                                    </p>
                                    <button
                                        className="navbutton"
                                        onClick={goToSignIn}
                                    >
                                        {t("signin")}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="herocontainer">
                            <center>
                                <p className="herotitle">{t("heroTitle")}</p>
                                <ul className="herolist">
                                    <li>{t("point1")}</li>
                                    <li>{t("point2")}</li>
                                    <li>{t("point3")}</li>
                                    <li>{t("point4")}</li>
                                </ul>
                            </center>
                            <div className="rowcontainer">
                                <img
                                    draggable="false"
                                    className="heroicon"
                                    src={multiDeviceIcon}
                                ></img>
                                <img
                                    draggable="false"
                                    className="heroicon"
                                    src={listIcon}
                                ></img>
                                <img
                                    draggable="false"
                                    className="heroicon"
                                    src={bookIcon}
                                ></img>
                            </div>
                            <div className="evenspreadflex">
                                <button
                                    className="herobutton"
                                    onClick={goToSignUp}
                                >
                                    {t("signup")}
                                </button>
                                <button
                                    className="herobutton"
                                    onClick={goToDashboard}
                                >
                                    {t("tryitout")}
                                </button>
                            </div>
                            <div
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <img
                                    className="mainimage"
                                    alt="dashboard image"
                                    src={dashboardImage}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="aboutcontainer" ref={aboutRef}>
                <p className="herotitle">{t("whatisbotbay")}</p>
                <p className="abouttext">{t("abouttext1")}</p>
                <p className="abouttext">{t("abouttext2")}</p>
                <p className="abouttext">{t("abouttext3")}</p>
                <div className="teamlogocontainer">
                    <a
                        href="https://storm16423.ca/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            draggable="false"
                            className="teamlogo"
                            src={stormLogo}
                        />
                    </a>

                    <a
                        href="https://ftc-events.firstinspires.org/team/27966"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            draggable="false"
                            className="teamlogo"
                            src={knightsLogo}
                        />
                    </a>
                </div>
            </div>

            {isDesktop ? (
                <>
                    <div
                        className="landingherocontainer"
                        style={{
                            background:
                                "linear-gradient(to bottom, #000029 0%, #000029 15%, #000056 45%, #2b0056 75%, #002b56 100%)",
                        }}
                    >
                        <div className="halfcontainer">
                            <p
                                className="herotitle"
                                style={{ textAlign: "center" }}
                            >
                                {t("parttracking")}
                            </p>
                            <p className="abouttext" style={{ width: "75%" }}>
                                {t("parttrackingsub")}
                            </p>
                        </div>
                        <div className="halfcontainer">
                            <img
                                className="mainimage"
                                alt="dashboard image"
                                src={landingImage1}
                            />
                        </div>
                    </div>

                    <div
                        className="landingherocontainer"
                        style={{
                            background:
                                "linear-gradient(to top, #000029 0%, #000029 15%, #000056 45%, #2b0056 75%, #002b56 100%)",
                        }}
                    >
                        <div className="halfcontainer">
                            <img
                                className="mainimage"
                                alt="dashboard image"
                                src={landingImage3}
                            />
                        </div>
                        <div className="halfcontainer">
                            <p
                                className="herotitle"
                                style={{ textAlign: "center" }}
                            >
                                {t("batterytracking")}
                            </p>
                            <p className="abouttext" style={{ width: "75%" }}>
                                {t("batterytrackingsub")}
                            </p>
                        </div>
                    </div>

                    <div
                        className="landingherocontainer"
                        style={{
                            backgroundColor: "#000029",
                            flexDirection: "column",
                            gap: "30px",
                            userSelect: "none",
                            boxSizing: "border-box",
                        }}
                    >
                        <p
                            className="herotitle"
                            style={{ textAlign: "center" }}
                        >
                            {t("everymemberslogan")}
                        </p>
                        <img
                            alt="dashboard image"
                            src={landingImage2}
                            style={{ width: "80%" }}
                        />
                        <div
                            style={{
                                width: "100%",
                                paddingBottom: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <button className="herobutton" onClick={goToSignUp}>
                                {t("elevateteamnow")}
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className="landingherocontainer"
                        style={{
                            background:
                                "linear-gradient(to bottom, #000029 0%, #000029 15%, #000056 45%, #2b0056 75%, #002b56 100%)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            padding: "30px 20px",
                            gap: "20px",
                            boxSizing: "border-box",
                        }}
                    >
                        <p className="herotitle">{t("parttracking")}</p>

                        <p className="abouttext" style={{ maxWidth: "500px" }}>
                            {t("parttrackingsub")}
                        </p>

                        <img
                            className="mainimage"
                            alt="dashboard image"
                            src={landingImage1}
                            style={{ width: "100%", maxWidth: "500px" }}
                        />
                    </div>

                    <div
                        className="landingherocontainer"
                        style={{
                            background:
                                "linear-gradient(to top, #000029 0%, #000029 15%, #000056 45%, #2b0056 75%, #002b56 100%)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            padding: "30px 20px",
                            gap: "20px",
                            boxSizing: "border-box",
                        }}
                    >
                        <p className="herotitle">{t("batterytracking")}</p>

                        <p className="abouttext" style={{ maxWidth: "500px" }}>
                            {t("batterytrackingsub")}
                        </p>

                        <img
                            className="mainimage"
                            alt="dashboard image"
                            src={landingImage3}
                            style={{ width: "100%", maxWidth: "500px" }}
                        />
                    </div>

                    <div
                        className="landingherocontainer"
                        style={{
                            backgroundColor: "#000029",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            gap: "30px",
                            userSelect: "none",
                            boxSizing: "border-box",
                        }}
                    >
                        <p className="herotitle">{t("everymemberslogan")}</p>

                        <img
                            alt="dashboard image"
                            src={landingImage2}
                            style={{ width: "100%", maxWidth: "600px" }}
                        />

                        <div style={{ width: "100%", padding: "10px" }}>
                            <button className="herobutton" onClick={goToSignUp}>
                                {t("elevateteamnow")}
                            </button>
                        </div>
                    </div>
                </>
            )}

            <footer className="footer-container">
                <div className="footer-content">
                    <div className="footer-left">
                        <p className="footer-header">{t("socials")}</p>
                        <div className="footer-social-row">
                            <a
                                href="https://www.instagram.com/sdhs_stormbot16423/"
                                target="_blank"
                                rel="noreferrer"
                                className="footer-link"
                                title="16423 Instagram"
                            >
                                <FaInstagram
                                    style={{
                                        marginRight: "8px",
                                        verticalAlign: "middle",
                                    }}
                                />{" "}
                                16423 Instagram
                            </a>
                            <a
                                href="https://www.instagram.com/knightsofloopfunction/"
                                target="_blank"
                                rel="noreferrer"
                                className="footer-link"
                                title="27966 Instagram"
                            >
                                <FaInstagram
                                    style={{
                                        marginRight: "8px",
                                        verticalAlign: "middle",
                                    }}
                                />{" "}
                                27966 Instagram
                            </a>
                        </div>
                    </div>

                    <div className="footer-center">
                        <img
                            src={navlogo}
                            className="footer-logo"
                            alt="Botbay Logo"
                            onClick={() =>
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                        />
                    </div>

                    <div className="footer-right">
                        <p className="footer-header">{t("resources")}</p>
                        <div>
                            <Link to="/privacy" className="footer-link">
                                <MdShield
                                    style={{
                                        cursor: "pointer",
                                        marginRight: "8px",
                                        verticalAlign: "middle",
                                    }}
                                />
                                {t("privacypolicy")}
                            </Link>
                            <a
                                href="mailto:botbay-dev@outlook.com"
                                className="footer-link"
                            >
                                <FaEnvelope
                                    style={{
                                        marginRight: "8px",
                                        verticalAlign: "middle",
                                    }}
                                />{" "}
                                {t("email")}
                            </a>
                            <a
                                href="https://discord.gg/73AJ2WuAJK"
                                target="_blank"
                                rel="noreferrer"
                                className="footer-link"
                            >
                                <FaDiscord
                                    style={{
                                        marginRight: "8px",
                                        verticalAlign: "middle",
                                    }}
                                />{" "}
                                Discord
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default LandingPage;
