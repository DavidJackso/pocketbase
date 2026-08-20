import { i18n } from "../../i18n.js";

window.app = window.app || {};
window.app.oauth2 = window.app.oauth2 || {};

// note: data is the providerSettingsModal form store
window.app.oauth2.microsoft = function(providerInfo, namePrefix, data) {
    const uniqueId = "microsoft_" + app.utils.randomString();

    const idTokenEmailClaimOptions = [
        {
            value: "",
            get selected() {
                return i18n.t("oauth2.ms_graph_mail_field_selected");
            },
            label: () => {
                return t.div(
                    { className: "option-content" },
                    t.strong(
                        null,
                        i18n.t("oauth2.ms_graph_mail_field_a") + " ",
                        t.code(null, "mail"),
                        " " + i18n.t("oauth2.ms_graph_mail_field_b"),
                    ),
                    t.br(),
                    t.small(
                        { className: "txt-hint" },
                        i18n.t("oauth2.ms_graph_mail_field_help"),
                    ),
                );
            },
        },
        {
            value: "email",
            get selected() {
                return i18n.t("oauth2.ms_email_claim_selected");
            },
            label: () => {
                return t.div(
                    { className: "option-content" },
                    t.strong(null, t.code(null, "email"), " " + i18n.t("oauth2.ms_id_token_claim")),
                    t.br(),
                    t.small(
                        { className: "txt-hint" },
                        i18n.t("oauth2.ms_email_claim_help"),
                    ),
                );
            },
        },
        {
            value: "email_and_xms_edov",
            get selected() {
                return i18n.t("oauth2.ms_email_xms_edov_selected");
            },
            label: () => {
                return t.div(
                    { className: "option-content" },
                    t.strong(
                        null,
                        t.code(null, "email"),
                        " + ",
                        t.code(null, "xms_edov"),
                        " " + i18n.t("oauth2.ms_id_token_claims"),
                    ),
                    t.br(),
                    t.small(
                        { className: "txt-hint" },
                        i18n.t("oauth2.ms_email_xms_edov_help"),
                    ),
                );
            },
        },
        {
            value: "verified_primary_email",
            get selected() {
                return i18n.t("oauth2.ms_verified_primary_email_selected");
            },
            label: () => {
                return t.div(
                    { className: "option-content" },
                    t.strong(null, t.code(null, "verified_primary_email"), " " + i18n.t("oauth2.ms_id_token_claim")),
                    t.br(),
                    t.small(
                        { className: "txt-hint" },
                        i18n.t("oauth2.ms_verified_primary_email_help"),
                    ),
                );
            },
        },
        {
            value: "any_verified",
            get selected() {
                return i18n.t("oauth2.ms_any_verified_selected");
            },
            label: () => {
                return t.div(
                    { className: "option-content" },
                    t.strong(
                        null,
                        i18n.t("oauth2.ms_either") + " ",
                        t.code(null, "verified_primary_email"),
                        " " + i18n.t("common.or") + " ",
                        t.code(null, "email"),
                        " + ",
                        t.code(null, "xms_edov"),
                        " " + i18n.t("oauth2.ms_id_token_claims"),
                    ),
                    t.br(),
                    t.small({ className: "txt-hint" }, i18n.t("oauth2.ms_any_verified_help")),
                );
            },
        },
    ];

    return t.div(
        { pbEvent: "oauth2MicrosoftOptions", className: "oauth2-microsoft-options" },
        t.p({ className: "txt-bold" }, "Azure AD / Entra ID"),
        t.div(
            { className: "grid" },
            t.div(
                { className: "col-12" },
                t.div(
                    { className: "field" },
                    t.label({ htmlFor: uniqueId + ".authURL" }, i18n.t("oauth2.auth_url")),
                    t.input({
                        id: uniqueId + ".authURL",
                        name: namePrefix + ".authURL",
                        type: "url",
                        required: true,
                        value: () => data.config.authURL || "",
                        oninput: (e) => data.config.authURL = e.target.value,
                    }),
                ),
                t.div(
                    { className: "field-help" },
                    "Ex. https://login.microsoftonline.com/YOUR_DIRECTORY_TENANT_ID/oauth2/v2.0/authorize",
                ),
            ),
            t.div(
                { className: "col-12" },
                t.div(
                    { className: "field" },
                    t.label({ htmlFor: uniqueId + ".tokenURL" }, i18n.t("oauth2.token_url")),
                    t.input({
                        id: uniqueId + ".tokenURL",
                        name: namePrefix + ".tokenURL",
                        type: "url",
                        required: true,
                        value: () => data.config.tokenURL || "",
                        oninput: (e) => data.config.tokenURL = e.target.value,
                    }),
                ),
                t.div(
                    { className: "field-help" },
                    "Ex. https://login.microsoftonline.com/YOUR_DIRECTORY_TENANT_ID/oauth2/v2.0/token",
                ),
            ),
            t.div(
                { className: "col-12" },
                t.div(
                    { className: "field" },
                    t.label({ htmlFor: uniqueId + ".extra.idTokenEmailClaim" }, i18n.t("oauth2.extract_email_from")),
                    app.components.select({
                        id: uniqueId + ".extra.idTokenEmailClaim",
                        options: idTokenEmailClaimOptions,
                        value: () => data.config.extra?.idTokenEmailClaim || "",
                        onchange: (selectedOpts) => {
                            data.config.extra = data.config.extra || {};
                            data.config.extra.idTokenEmailClaim = selectedOpts[0]?.value;
                        },
                    }),
                ),
                t.div(
                    { className: "field-help" },
                    t.p(null, () => i18n.t("oauth2.default_scopes") + " ", t.code(null, "User.Read"), () => {
                        if (data.config.extra?.idTokenEmailClaim) {
                            return [
                                " " + i18n.t("common.and") + " ",
                                t.code(null, "openid"),
                                " (" + i18n.t("oauth2.for_id_token") + ")",
                            ];
                        }
                    }, "."),
                    t.p(
                        null,
                        () => i18n.t("oauth2.optional_claim_note_a") + " ",
                        t.code(null, "email"),
                        () => " " + i18n.t("oauth2.optional_claim_note_b"),
                    ),
                ),
            ),
        ),
    );
};
