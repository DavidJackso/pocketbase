import { input } from "./input";
import { settings } from "./settings";
import { view } from "./view";
import { i18n } from "../../i18n.js";

window.app = window.app || {};
window.app.fieldTypes = window.app.fieldTypes || {};
window.app.fieldTypes.relation = {
    icon: "ri-mind-map",
    get label() {
        return i18n.t("field_types.relation");
    },
    settings,
    input,
    view,
    filterModifiers: (f) => {
        return f.maxSelect > 1 ? ["each", "length"] : [];
    },
    dummyData: (f, forSubmit = false) => {
        return f.maxSelect > 1 ? ["RECORD_ID1", "RECORD_ID2"] : "RECORD_ID";
    },
};
