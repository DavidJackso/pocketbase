import { settings } from "./settings";
import { i18n } from "../../i18n.js";

window.app = window.app || {};
window.app.fieldTypes = window.app.fieldTypes || {};
window.app.fieldTypes.password = {
    icon: "ri-lock-password-line",
    get label() {
        return i18n.t("record_upsert.password");
    },
    settings,
};
