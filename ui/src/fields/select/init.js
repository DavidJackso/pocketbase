import { i18n } from "../../i18n.js";
import { input } from "./input";
import { settings } from "./settings";
import { view } from "./view";

window.app = window.app || {};
window.app.fieldTypes = window.app.fieldTypes || {};
window.app.fieldTypes.select = {
    icon: "ri-list-check",
    get label() {
        return i18n.t("field_types.select");
    },
    settings,
    input,
    view,
    filterModifiers: (f) => {
        return f.maxSelect > 1 ? ["each", "length"] : [];
    },
    dummyData: (f, forSubmit = false) => {
        if (f.maxSelect > 1) {
            return f.values?.slice(0, 2) || [];
        }
        return f.values?.[0] || "";
    },
};
