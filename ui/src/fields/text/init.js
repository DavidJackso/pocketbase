import { input } from "./input";
import { settings } from "./settings";
import { view } from "./view";
import { i18n } from "../../i18n.js";

window.app = window.app || {};
window.app.fieldTypes = window.app.fieldTypes || {};
window.app.fieldTypes.text = {
    icon: "ri-text",
    get label() {
        return i18n.t("field_types.text");
    },
    settings,
    input,
    view,
    filterModifiers: (f) => {
        return ["lower"];
    },
    dummyData: (f, forSubmit = false) => {
        return f.primaryKey ? app.utils.randomString(15) : "example text";
    },
};
