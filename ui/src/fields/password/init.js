import { i18n } from "../../i18n.js";
import { settings } from "./settings";

window.app = window.app || {};
window.app.fieldTypes = window.app.fieldTypes || {};
window.app.fieldTypes.password = {
    icon: "ri-lock-password-line",
    get label() {
        return i18n.t("record_upsert.password");
    },
    settings,
};
