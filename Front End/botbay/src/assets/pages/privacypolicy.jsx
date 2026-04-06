import React from "react";
import "../styles/landingpage.css";
import "../styles/sharedstyles.css";
import { Trans, useTranslation } from "react-i18next";

function PrivacyPolicy() {
    const { t } = useTranslation();
    return (
        <div className="privacycontainer">
            <h1 className="herotitle">{t("privacypolicy")}</h1>

            <p className="abouttext">
                <span className="abouttext-bold">{t("privacytitle1")}</span>{" "}
                {t("privacytext1")}
            </p>

            <h2 className="abouttext">
                <span className="abouttext-bold">{t("privacytitle2")}</span>
            </h2>
            <p className="abouttext">
                <Trans
                    i18nKey="privacytext2"
                    components={{ bold: <span className="abouttext-bold" /> }}
                />
            </p>

            <h2 className="abouttext">
                <span className="abouttext-bold">{t("privacytitle3")}</span>
            </h2>
            <p className="abouttext">{t("privacytext3")}</p>

            <h2 className="abouttext">
                <span className="abouttext-bold">{t("privacytitle4")}</span>
            </h2>
            <p className="abouttext">{t("privacytext4")}</p>

            <h2 className="abouttext">
                <span className="abouttext-bold">{t("privacytitle5")}</span>
            </h2>
            <p className="abouttext">{t("privacytext5")}</p>

            <h2 className="abouttext">
                <span className="abouttext-bold">{t("privacytitle6")}</span>
            </h2>
            <p className="abouttext">{t("privacytext6")}</p>

            <h2 className="abouttext">
                <span className="abouttext-bold">{t("privacytitle7")}</span>
            </h2>
            <p className="abouttext">
                <Trans
                    i18nKey="privacytext7"
                    components={{ bold: <span className="abouttext-bold" /> }}
                />
            </p>
        </div>
    );
}

export default PrivacyPolicy;
