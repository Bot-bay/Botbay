import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { supabase, updatePassword } from "../scripts/auth.js";
import signUpLogo from "../images/LogoTrans.png";

import { useTranslation } from "react-i18next";

function UpdatePasswordPage() {
    const { t } = useTranslation();

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [notice, setNotice] = useState({ message: "", color: "transparent" });
    const [loading, setLoading] = useState(false);
    const [sessionReady, setSessionReady] = useState(false);

    useEffect(() => {
        async function handleResetSession() {
            const { error } = await supabase.auth.setSessionFromUrl({
                storeSession: false,
            });
            if (error) {
                setNotice({ message: error.message, color: "red" });
            } else {
                setSessionReady(true);
            }
        }

        handleResetSession();
    }, []);

    const [isPhone, setIsPhone] = useState(window.innerWidth <= 1199);

    useEffect(() => {
        const handleResize = () => setIsPhone(window.innerWidth <= 1199);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleUpdateAction = async (e) => {
        e.preventDefault();
        if (!sessionReady) {
            setNotice({
                message: t("authseshmissing"),
                color: "red",
            });
            return;
        }

        if (password.length < 6) {
            setNotice({
                message: t("passwordtooweak"),
                color: "red",
            });
            return;
        }

        setLoading(true);
        try {
            await updatePassword(password);
            setNotice({
                message: t("successredirect"),
                color: "green",
            });
            setTimeout(() => {
                window.location.hash = "#/signin";
            }, 2000);
        } catch (err) {
            setNotice({ message: err.message, color: "red" });
        } finally {
            setLoading(false);
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
                        <p className="signupheader">{t("newpassword")}</p>
                    </div>
                    <form
                        className="inputcontainer"
                        onSubmit={handleUpdateAction}
                    >
                        <p className="inputheader">{t("enternewpassword")}</p>
                        <div style={{ position: "relative", width: "100%" }}>
                            <input
                                className="signupinput"
                                type={showPassword ? "text" : "password"}
                                placeholder="******"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: "100%" }}
                                autoFocus
                            />
                            <div
                                className="eye-icon"
                                onClick={togglePasswordVisibility}
                                style={{
                                    position: "absolute",
                                    right: "15px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {showPassword ? (
                                    <EyeOff size={24} />
                                ) : (
                                    <Eye size={24} />
                                )}
                            </div>
                        </div>

                        <div className="bottomcontainer">
                            <p className="bottomtext">
                                {t("choosestrongpassword")}
                            </p>
                            <p
                                id="noticetext"
                                style={{
                                    color: notice.color,
                                    fontSize: notice.message
                                        ? isPhone
                                            ? "4rem"
                                            : "1rem"
                                        : "0rem",
                                    transition: "0.3s ease",
                                    marginTop: isPhone ? "20px" : "10px",
                                    textAlign: "center",
                                }}
                            >
                                {notice.message || ""}
                            </p>
                        </div>
                        <div className="bottomcontainer">
                            <button
                                className="signupbutton"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? t("updating") : t("updatepassword")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdatePasswordPage;
