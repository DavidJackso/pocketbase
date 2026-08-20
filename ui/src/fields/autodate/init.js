import { i18n } from "../../i18n.js";
import { onrecordduplicate } from "./onrecordduplicate";
import { settings } from "./settings";
import { view } from "./view";

window.app = window.app || {};
window.app.fieldTypes = window.app.fieldTypes || {};
window.app.fieldTypes.autodate = {
    icon: "ri-calendar-check-line",
    get label() {
        return i18n.t("field_types.autodate");
    },
    settings,
    view,
    onrecordduplicate,
    dummyData: (f, forSubmit = false) => {
        if (forSubmit) {
            return undefined; // hide
        }

        return new Date().toISOString().replaceAll("T", " ");
    },
};
