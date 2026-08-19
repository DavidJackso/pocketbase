import { i18n } from "../../i18n.js";

// {
//     record: undefined,
//     field: undefined,
//     short: false,
// }
export function view(props) {
    return t.div(
        { className: "record-field-view field-type-url" },
        () => {
            const value = props.record[props.field.name] || "";

            if (!value) {
                return t.span({ className: "missing-value" });
            }

            return t.a({
                href: () => value,
                className: () => `txt ${props.short ? "txt-ellipsis" : ""}`,
                rel: "noopener noreferrer",
                target: "_blank",
                textContent: app.utils.truncate(value),
                ariaDescription: app.attrs.tooltip(i18n.t("file_preview.open_in_new_tab")),
                onclick: (e) => {
                    e.stopPropagation();
                },
            });
        },
    );
}
