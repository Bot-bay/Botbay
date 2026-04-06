import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../localization/en.json";
import fr from "../localization/fr.json";

i18n.use(initReactI18next).init({
    fallbackLng: "en",

    resources: {
        en: { translation: en },
        fr: { translation: fr },
    },
});

export default i18n;
