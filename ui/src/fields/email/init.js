import { i18n } from "../../i18n.js";
import { input } from "./input";
import { settings } from "./settings";
import { view } from "./view";

window.app = window.app || {};
window.app.fieldTypes = window.app.fieldTypes || {};
window.app.fieldTypes.email = {
    icon: "ri-mail-line",
    get label() {
        return i18n.t("field_types.email");
    },
    settings,
    input,
    view,
    filterModifiers: (f) => {
        return ["lower"];
    },
    dummyData: (f, forSubmit = false) => {
        return `test_${app.utils.randomString(3, "123567890")}@example.com`;
    },
};
