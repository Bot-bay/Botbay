import React, { useState, useEffect } from "react";
import signUpLogo from "../images/LogoTrans.png";
import { sendPasswordResetEmail } from "../scripts/auth.js";
import { useTranslation } from "react-i18next";

import "../styles/signupstyles.css";
import "../styles/sharedstyles.css";

function ResetPasswordPage() {
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [notice, setNotice] = useState({ message: "", color: "transparent" });
    const [loading, setLoading] = useState(false);

    const [isPhone, setIsPhone] = useState(window.innerWidth <= 1199);

    useEffect(() => {
        const handleResize = () => setIsPhone(window.innerWidth <= 1199);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleResetAction = async (e) => {
        e.preventDefault();
        if (!email) {
            setNotice({ message: t("enteremail"), color: "red" });
            return;
        }

        setLoading(true);
        try {
            await sendPasswordResetEmail(email);
            setNotice({ message: t("resetlinksent"), color: "green" });
        } catch (err) {
            setNotice({
                message: err.message || t("networkerror"),
                color: "red",
            });
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
                        <p className="signupheader">Botbay</p>
                    </div>
                    <form
                        className="inputcontainer"
                        onSubmit={handleResetAction}
                    >
                        <p className="inputheader">{t("resetpassword")}</p>
                        <input
                            className="signupinput"
                            type="email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                        <div className="bottomcontainer">
                            <p className="bottomtext">{t("inputyouremail")}</p>
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
                                {loading ? t("sending") : t("resetpassword")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
