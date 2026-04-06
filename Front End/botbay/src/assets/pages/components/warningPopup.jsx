import React from "react";
import { createPortal } from "react-dom";
import Blocker from "./blocker";
import "../../styles/status.css";

import { useTranslation } from "react-i18next";

function WarningPopup({ message, complete, close }) {
    const { t } = useTranslation();
    const content = (
        <>
            <div className="s-popup" style={{ zIndex: 10006 }}>
                <p id="s-popup-warning-title">{t("warning")}</p>
                <p>{message}</p>
                <p>{t("areyousure")}</p>
                <div className="leftcontainer">
                    <div className="halfcontainer">
                        <button id="s-popup-warning-button-no" onClick={close}>
                            {t("no")}
                        </button>
                    </div>
                    <div className="halfcontainer">
                        <button
                            id="s-popup-warning-button-yes"
                            onClick={complete}
                        >
                            {t("yes")}
                        </button>
                    </div>
                </div>
            </div>
            <Blocker id="global-blocker" style={{ zIndex: 10005 }} />
        </>
    );

    return createPortal(content, document.body);
}

export default WarningPopup;
