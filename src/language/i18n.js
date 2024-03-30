import i18next from "i18next";

import english from "./en/english.json";
import vietnam from "./vn/vietnam.json";

import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'Vn',
    resources:{
        En: english,
        Vn: vietnam
    },
    react: {
        useSuspense: false,

    }
})
export default i18next