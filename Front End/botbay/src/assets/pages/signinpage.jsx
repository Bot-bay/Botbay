import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import signUpLogo from "../images/LogoTrans.png";
import { switchToPage } from "../scripts/navigation.js";
import { signInUser, getUserGroup } from "../scripts/auth.js";
import GroupSelection from "./groupsection.jsx";

import "../styles/signupstyles.css";
import "../styles/sharedstyles.css";

import { useTranslation } from "react-i18next";

function SignInPage() {
    const { t } = useTranslation();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPhone, setIsPhone] = useState(window.innerWidth <= 1199);

    const [view, setView] = useState("form"); // form or group-menu

    const goToSignUp = switchToPage("/signup");
    const goToForgot = switchToPage("/forgotpassword");

    useEffect(() => {
        const handleResize = () => setIsPhone(window.innerWidth <= 1199);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        setErrorMessage("");
        setIsLoading(true);

        if (!email || !password) {
            setErrorMessage(t("fillallfields"));
            setIsLoading(false);
            return;
        }

        const { data, error } = await signInUser(email, password);

        if (error) {
            setErrorMessage(
                error.message === "Invalid login credentials"
                    ? t("invalidcredentials")
                    : error.message,
            );
            setIsLoading(false);
        } else {
            try {
                const { group, error: groupError } = await getUserGroup();
                if (groupError) throw groupError;

                if (group) {
                    window.location.hash = "#/dashboard";
                } else {
                    setView("group-menu");
                }
            } catch (err) {
                setView("group-menu");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div
            className="screencontainer"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
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

                    {view === "form" ? (
                        <>
                            {errorMessage && (
                                <p
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

                            <div className="inputcontainer">
                                <p
                                    className="inputheader"
                                    style={{ fontSize: isPhone ? "4rem" : "" }}
                                >
                                    {t("email")}
                                </p>
                                <input
                                    className="signupinput"
                                    style={{
                                        borderColor: errorMessage ? "red" : "",
                                        fontSize: isPhone ? "4rem" : "",
                                    }}
                                    type="email"
                                    placeholder="email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                        style={{
                                            borderColor: errorMessage
                                                ? "red"
                                                : "",
                                            fontSize: isPhone ? "4rem" : "",
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

                                <div className="bottomcontainer">
                                    <p
                                        className="bottomtext"
                                        style={{
                                            fontSize: isPhone ? "4rem" : "",
                                        }}
                                    >
                                        {t("forgotpassword")}
                                        <span
                                            className="forgotpasswordspan"
                                            onClick={goToForgot}
                                        >
                                            {" "}
                                            {t("clickhere")}
                                        </span>
                                    </p>
                                    <p
                                        className="bottomtext"
                                        style={{
                                            fontSize: isPhone ? "4rem" : "",
                                        }}
                                    >
                                        {t("noaccount")}
                                        <span
                                            className="forgotpasswordspan"
                                            onClick={goToSignUp}
                                        >
                                            {" "}
                                            {t("clickhere")}
                                        </span>
                                    </p>
                                </div>

                                <div className="bottomcontainer">
                                    <button
                                        className="signupbutton"
                                        onClick={handleSignIn}
                                        disabled={isLoading}
                                        style={{
                                            fontSize: isPhone ? "4rem" : "",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2
                                                    className="animate-spin"
                                                    size={20}
                                                />
                                                {t("loggingin")}
                                            </>
                                        ) : (
                                            t("signin")
                                        )}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <GroupSelection isPhone={isPhone} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
