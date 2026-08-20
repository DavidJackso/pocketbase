import { i18n } from "../../i18n.js";
import { input } from "./input";
import { settings } from "./settings";
import { view } from "./view";

window.app = window.app || {};
window.app.fieldTypes = window.app.fieldTypes || {};
window.app.fieldTypes.geoPoint = {
    icon: "ri-map-pin-2-line",
    get label() {
        return i18n.t("field_types.geo_point");
    },
    settings,
    input,
    view,
    identifierExtractor: function(field, prefix = "") {
        return [prefix + field.name + ".lon", prefix + field.name + ".lat"];
    },
    dummyData: (f, forSubmit = false) => {
        return { lon: 0, lat: 0 };
    },
};
