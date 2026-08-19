import { i18n } from "../i18n.js";

export function expandInfo() {
    return t.div(
        { className: "api-expand-info" },
        t.p(null, i18n.t("api_preview.expand_info_intro")),
        app.components.codeBlock({
            value: `?expand=relField1,relField2.subRelField`,
        }),
        t.p(
            null,
            i18n.t("api_preview.expand_info_depth"),
            t.br(),
            i18n.t("api_preview.expand_info_appended") + " ",
            t.code(null, "expand"),
            " " + i18n.t("api_preview.expand_info_property_eg") + " ",
            t.code(null, `"expand": {"relField1": {...}, ...}`),
            ").",
        ),
        t.p(
            null,
            i18n.t("api_preview.expand_info_only") + " ",
            t.strong(null, i18n.t("api_preview.expand_info_view")),
            " " + i18n.t("api_preview.expand_info_will_be_expanded"),
        ),
    );
}
