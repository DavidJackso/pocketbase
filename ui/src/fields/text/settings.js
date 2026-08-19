import { i18n } from "../../i18n.js";

// {
//     originalCollection: undefined,
//     collection: undefined,
//     field
//     get fieldIndex: int/-1,
//     get originalField: undefined
// }
export function settings(props) {
    const uniqueId = "f_" + app.utils.randomString();

    return app.components.fieldSettings(props, {
        content: () =>
            t.div(
                { className: "grid sm" },
                t.div(
                    { className: "col-sm-6" },
                    t.div(
                        { className: "field" },
                        t.label(
                            { htmlFor: uniqueId + ".min" },
                            t.span({ className: "txt" }, i18n.t("field_settings.min_length")),
                            t.i({
                                className: "ri-information-line link-hint",
                                ariaDescription: app.attrs.tooltip(i18n.t("field_settings.clear_for_no_limit")),
                            }),
                        ),
                        t.input({
                            type: "number",
                            id: uniqueId + ".min",
                            name: () => `fields.${props.fieldIndex}.min`,
                            step: 1,
                            min: 0,
                            max: Number.MAX_SAFE_INTEGER,
                            placeholder: i18n.t("field_settings.no_min_limit"),
                            value: () => props.field.min || "",
                            oninput: (e) => {
                                // temp skip invalid numbers with leading 0 while typing to avoid reseting the entire input
                                // (always normalized in onchange)
                                if (e.target.value?.length > 1 && e.target.value[0] == "0") {
                                    return;
                                }

                                props.field.min = parseInt(e.target.value, 10);
                            },
                            onchange: (e) => {
                                props.field.min = null; // reset reactivity
                                props.field.min = parseInt(e.target.value, 10);
                            },
                        }),
                    ),
                ),
                t.div(
                    { className: "col-sm-6" },
                    t.div(
                        { className: "field" },
                        t.label(
                            { htmlFor: uniqueId + ".max" },
                            t.span({ className: "txt" }, i18n.t("field_settings.max_length")),
                            t.i({
                                className: "ri-information-line link-hint",
                                ariaDescription: app.attrs.tooltip(i18n.t("field_settings.clear_for_default_limit")),
                            }),
                        ),
                        t.input({
                            type: "number",
                            id: uniqueId + ".max",
                            name: () => `fields.${props.fieldIndex}.max`,
                            step: 1,
                            min: () => props.field.min || 0,
                            max: Number.MAX_SAFE_INTEGER,
                            placeholder: i18n.t("text_field.default_max_length"),
                            value: () => props.field.max || "",
                            oninput: (e) => {
                                // temp skip invalid numbers with leading 0 while typing to avoid reseting the entire input
                                // (always normalized in onchange)
                                if (e.target.value?.length > 1 && e.target.value[0] == "0") {
                                    return;
                                }

                                props.field.max = parseInt(e.target.value, 10);
                            },
                            onchange: (e) => {
                                props.field.max = null; // reset reactivity
                                props.field.max = parseInt(e.target.value, 10);
                            },
                        }),
                    ),
                ),
                t.div(
                    { className: "col-sm-6" },
                    t.div(
                        { className: "field" },
                        t.label(
                            { htmlFor: uniqueId + ".pattern" },
                            t.span({ className: "txt" }, i18n.t("field_settings.validation_pattern")),
                            () => {
                                if (props.field.primaryKey) {
                                    return t.i({
                                        className: "ri-information-line link-hint",
                                        ariaDescription: app.attrs.tooltip(i18n.t("text_field.pk_pattern_help")),
                                    });
                                }
                            },
                        ),
                        t.input({
                            type: "text",
                            id: uniqueId + ".pattern",
                            name: () => `fields.${props.fieldIndex}.pattern`,
                            value: () => props.field.pattern || "",
                            oninput: (e) => (props.field.pattern = e.target.value),
                        }),
                    ),
                    t.div({ className: "field-help" }, i18n.t("field_settings.example_prefix") + " ", t.code(null, "^[a-z0-9]+$")),
                ),
                t.div(
                    { className: "col-sm-6" },
                    t.div(
                        { className: "field" },
                        t.label(
                            { htmlFor: uniqueId + ".autogeneratePattern" },
                            t.span({ className: "txt" }, i18n.t("field_settings.autogenerate_pattern")),
                            t.i({
                                className: "ri-information-line link-hint",
                                ariaDescription: app.attrs.tooltip(i18n.t("field_settings.autogenerate_pattern_help")),
                            }),
                        ),
                        t.input({
                            type: "text",
                            id: uniqueId + ".autogeneratePattern",
                            name: () => `fields.${props.fieldIndex}.autogeneratePattern`,
                            value: () => props.field.autogeneratePattern || "",
                            oninput: (e) => (props.field.autogeneratePattern = e.target.value),
                        }),
                    ),
                    t.div({ className: "field-help" }, i18n.t("field_settings.example_prefix") + " ", t.code(null, "[a-z0-9]{30}")),
                ),
                t.div(
                    { className: "col-sm-12" },
                    t.div(
                        { className: "field" },
                        t.label({ htmlFor: uniqueId + ".help" }, i18n.t("field_settings.help_text")),
                        t.input({
                            type: "text",
                            id: uniqueId + ".help",
                            name: () => `fields.${props.fieldIndex}.help`,
                            value: () => props.field.help || "",
                            oninput: (e) => (props.field.help = e.target.value),
                        }),
                    ),
                ),
            ),
        footer: () => [
            t.div(
                { className: "field" },
                t.input({
                    className: "sm",
                    type: "checkbox",
                    id: uniqueId + ".required",
                    name: () => `fields.${props.fieldIndex}.required`,
                    checked: () => !!props.field.required,
                    onchange: (e) => (props.field.required = e.target.checked),
                }),
                t.label(
                    { htmlFor: uniqueId + ".required" },
                    t.span({ className: "txt" }, i18n.t("common.required")),
                    t.small({ className: "txt-hint" }, "(!='')"),
                    t.i({
                        className: "ri-information-line link-hint",
                        ariaDescription: app.attrs.tooltip(i18n.t("text_field.required_help")),
                    }),
                ),
            ),
        ],
    });
}
