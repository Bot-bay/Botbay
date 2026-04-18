import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, MailCheck, Loader2 } from "lucide-react";
import signUpLogo from "../images/LogoTrans.png";
import { switchToPage } from "../scripts/navigation.js";
import { signUpUser } from "../scripts/auth.js";
import GroupSelection from "./groupsection.jsx";

import "../styles/signupstyles.css";
import "../styles/sharedstyles.css";

import { useTranslation } from "react-i18next";

function SignUpPage() {
    const { t } = useTranslation();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPhone, setIsPhone] = useState(window.innerWidth <= 1199);

    const [hasAgreed, setHasAgreed] = useState(false);
    const [view, setView] = useState("form");

    const goToSignIn = switchToPage("/signin");

    useEffect(() => {
        const handleResize = () => setIsPhone(window.innerWidth <= 1199);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        setErrorMessage("");

        if (!hasAgreed) {
            setErrorMessage(t("privacyagreement"));
            return;
        }

        if (!email || !password) {
            setErrorMessage(t("fillallfields"));
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await signUpUser(email, password);

            if (error) {
                if (error.message.includes("Password should contain")) {
                    setErrorMessage(t("weakpassword"));
                } else {
                    setErrorMessage(error.message);
                }
            } else {
                if (data?.user && data?.session) {
                    setView("group-menu");
                } else {
                    setView("success");
                }
            }
        } catch (err) {
            setErrorMessage(t("networkerror"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="screencontainer">
            <div className="centercontainer-signup">
                <div className="contentcontainer">
                    <div className="logocontainer">
                        <img
                            className="signuplogo"
                            src={signUpLogo}
                            alt="Logo"
                        />
                        <p className="signupheader">Botbay</p>
                    </div>

                    {/* SUCCESS / EMAIL VERIFICATION */}
                    {view === "success" && (
                        <div
                            className="success-container"
                            style={{ textAlign: "center", padding: "20px" }}
                        >
                            <MailCheck
                                size={isPhone ? 120 : 60}
                                color="#4ade80"
                                style={{ marginBottom: "20px" }}
                            />
                            <h2
                                style={{
                                    fontSize: isPhone ? "5rem" : "2rem",
                                    color: "white",
                                }}
                            >
                                {t("checkyouremail")}
                            </h2>
                            <p
                                style={{
                                    fontSize: isPhone ? "4rem" : "1.1rem",
                                    color: "#aaa",
                                    marginTop: "10px",
                                    lineHeight: "1.4",
                                }}
                            >
                                {t("emailsentto")} <br />
                                <strong style={{ color: "white" }}>
                                    {email}
                                </strong>
                            </p>
                            <button
                                className="signupbutton"
                                onClick={goToSignIn}
                                style={{
                                    marginTop: "30px",
                                    fontSize: isPhone ? "4rem" : "",
                                }}
                            >
                                {t("backtosignin")}
                            </button>
                        </div>
                    )}

                    {/* SIGN UP FORM */}
                    {view === "form" && (
                        <>
                            {errorMessage && (
                                <p
                                    className="error-text"
                                    style={{
                                        color: "red",
                                        textAlign: "center",
                                        fontSize: isPhone ? "4rem" : "1rem",
                                        marginBottom: "10px",
                                    }}
                                >
                                    {errorMessage}
                                </p>
                            )}

                            <form
                                className="inputcontainer"
                                onSubmit={handleSignUp}
                            >
                                <p
                                    className="inputheader"
                                    style={{ fontSize: isPhone ? "4rem" : "" }}
                                >
                                    {t("email")}
                                </p>
                                <input
                                    className="signupinput"
                                    disabled={isLoading}
                                    style={{
                                        borderColor:
                                            errorMessage && !email ? "red" : "",
                                        fontSize: isPhone ? "4rem" : "",
                                        opacity: isLoading ? 0.7 : 1,
                                    }}
                                    type="email"
                                    placeholder="email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
                                />

                                <p
                                    className="inputheader"
                                    style={{ fontSize: isPhone ? "4rem" : "" }}
                                >
                                    {t("password")}
                                </p>
                                <div className="password-wrapper">
                                    <input
                                        className="passwordinput"
                                        disabled={isLoading}
                                        style={{
                                            borderColor:
                                                errorMessage && !password
                                                    ? "red"
                                                    : "",
                                            fontSize: isPhone ? "4rem" : "",
                                            opacity: isLoading ? 0.7 : 1,
                                        }}
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="eye-button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        style={{
                                            width: isPhone ? "4rem" : "auto",
                                        }}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={isPhone ? 48 : 22} />
                                        ) : (
                                            <Eye size={isPhone ? 48 : 22} />
                                        )}
                                    </button>
                                </div>

                                <div
                                    className="privacy-agreement-container"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        marginTop: "20px",
                                        marginBottom: "10px",
                                        justifyContent: isPhone
                                            ? "center"
                                            : "flex-start",
                                        width: "100%",
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        id="privacyAgree"
                                        checked={hasAgreed}
                                        onChange={(e) =>
                                            setHasAgreed(e.target.checked)
                                        }
                                        style={{
                                            width: isPhone ? "3rem" : "1.2rem",
                                            height: isPhone ? "3rem" : "1.2rem",
                                            cursor: "pointer",
                                            accentColor: "#60a5fa",
                                        }}
                                    />
                                    <label
                                        htmlFor="privacyAgree"
                                        style={{
                                            color: "rgba(255, 255, 255, 0.8)",
                                            fontSize: isPhone
                                                ? "3.5rem"
                                                : "0.9rem",
                                            fontFamily: "Inter",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {t("iagree")}{" "}
                                        <Link
                                            to="/privacy"
                                            style={{
                                                color: "#60a5fa",
                                                textDecoration: "underline",
                                            }}
                                        >
                                            {t("privacypolicy")}
                                        </Link>
                                    </label>
                                </div>

                                <div className="bottomcontainer">
                                    <p
                                        className="bottomtext"
                                        style={{
                                            fontSize: isPhone ? "4rem" : "",
                                        }}
                                    >
                                        {t("alreadyhaveaccount")}{" "}
                                        <span
                                            className="forgotpasswordspan"
                                            onClick={goToSignIn}
                                        >
                                            {t("clickhere")}
                                        </span>
                                    </p>
                                </div>

                                <div className="bottomcontainer">
                                    <button
                                        className="signupbutton"
                                        type="submit"
                                        disabled={isLoading}
                                        style={{
                                            fontSize: isPhone ? "4rem" : "",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "10px",
                                            opacity: isLoading ? 0.7 : 1,
                                        }}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2
                                                    className="animate-spin"
                                                    size={20}
                                                />
                                                {t("processing")}
                                            </>
                                        ) : (
                                            t("signup")
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {/* GROUP SELECTION */}
                    {view === "group-menu" && (
                        <GroupSelection isPhone={isPhone} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
