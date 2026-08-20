import { i18n } from "../../i18n.js";

// {
//     record: undefined,
//     field: undefined,
//     short: false,
// }
export function view(props) {
    return t.div(
        { className: "record-field-view field-type-email" },
        () => {
            const value = props.record[props.field.name] || "";

            if (!value) {
                return t.span({ className: "missing-value", "html-data-missing-label": i18n.t("common.na") });
            }

            if (props.short) {
                return t.span({
                    className: "txt txt-ellipsis",
                    textContent: app.utils.truncate(value),
                });
            }

            return value;
        },
    );
}
