import { i18n } from "../../i18n.js";
import { input } from "./input";
import { settings } from "./settings";
import { view } from "./view";

window.app = window.app || {};
window.app.fieldTypes = window.app.fieldTypes || {};
window.app.fieldTypes.bool = {
    icon: "ri-toggle-line",
    get label() {
        return i18n.t("field_types.bool");
    },
    settings,
    input,
    view,
    dummyData: (f, forSubmit = false) => {
        return [true, false][Math.floor(Math.random() * 2)];
    },
};
