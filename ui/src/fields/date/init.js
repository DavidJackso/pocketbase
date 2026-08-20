import { i18n } from "../../i18n.js";
import { input } from "./input";
import { settings } from "./settings";
import { view } from "./view";

window.app = window.app || {};
window.app.fieldTypes = window.app.fieldTypes || {};
window.app.fieldTypes.date = {
    icon: "ri-calendar-line",
    get label() {
        return i18n.t("field_types.date");
    },
    settings,
    input,
    view,
    dummyData: (f, forSubmit = false) => {
        return new Date().toISOString().replaceAll("T", " ");
    },
};
