import { i18n } from "../../i18n.js";

// {
//     record: undefined,
//     field: undefined,
//     short: false,
// }
export function view(props) {
    return t.div(
        { className: "record-field-view field-type-select" },
        () => {
            const opts = app.utils.toArray(props.record[props.field.name], false);

            if (!opts.length) {
                return t.span({ className: "missing-value", "html-data-missing-label": i18n.t("common.na") });
            }

            return opts.map((opt) => {
                return t.span({
                    className: "label",
                    title: opt,
                    textContent: app.utils.truncate(opt, 100),
                });
            });
        },
    );
}
