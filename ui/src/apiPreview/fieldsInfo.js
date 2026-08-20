import { i18n } from "../i18n.js";

export function fieldsInfo() {
    return t.div(
        { className: "api-fields-info" },
        t.p(
            null,
            i18n.t("api_preview.fields_info_intro"),
        ),
        app.components.codeBlock({
            value:
                `// return all root level fields and only\n// "relField.someField" from expand\n?fields=*,expand.relField.someField`,
        }),
        t.p(null, i18n.t("api_preview.fields_info_use") + " ", t.code(null, "*"), " " + i18n.t("api_preview.fields_info_target_depth")),
        t.p(null, i18n.t("api_preview.fields_info_modifiers")),
        t.ul(
            null,
            t.li(
                null,
                t.code(null, ":excerpt(maxLength, withEllipsis?)"),
                t.br(),
                i18n.t("api_preview.fields_info_excerpt") + " ",
                t.code(null, "?fields=*,someTextField:excerpt(200,true)"),
            ),
        ),
    );
}
