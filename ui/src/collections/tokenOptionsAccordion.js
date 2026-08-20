import { i18n } from "../i18n.js";

export function tokenOptionsAccordion(collection) {
    const uniqueId = "token_" + app.utils.randomString();

    const data = store({
        get tokensList() {
            if (collection?.name === "_superusers") {
                return [
                    { key: "authToken", label: i18n.t("token_options.auth") },
                    { key: "passwordResetToken", label: i18n.t("token_options.password_reset") },
                    { key: "fileToken", label: i18n.t("token_options.protected_file") },
                ];
            }

            return [
                { key: "authToken", label: i18n.t("token_options.auth") },
                { key: "verificationToken", label: i18n.t("token_options.email_verification") },
                { key: "passwordResetToken", label: i18n.t("token_options.password_reset") },
                { key: "emailChangeToken", label: i18n.t("token_options.email_change") },
                { key: "fileToken", label: i18n.t("token_options.protected_file") },
            ];
        },
    });

    return t.details(
        {
            pbEvent: "tokenOptionsAccordion",
            name: "other",
            className: "accordion token-options-accordion",
        },
        t.summary(
            null,
            t.i({ className: "ri-key-2-line", ariaHidden: true }),
            t.span({ className: "txt", textContent: i18n.t("token_options.title") }),
        ),
        t.div({ className: "grid sm" }, () => {
            return data.tokensList.map((token) => {
                const fieldId = uniqueId + token.key;

                return t.div(
                    { className: "col-sm-6" },
                    t.div(
                        { className: "field token-field" },
                        t.label({
                            htmlFor: fieldId,
                            textContent: () => token.label + " " + i18n.t("common.duration_seconds_lower"),
                        }),
                        t.input({
                            id: fieldId,
                            type: "number",
                            min: 1,
                            step: 1,
                            required: true,
                            name: () => token.key + ".duration",
                            value: () => collection[token.key].duration,
                            oninput: (e) => (collection[token.key].duration = parseInt(e.target.value, 10)),
                        }),
                    ),
                    t.div(
                        { className: "field-help m-b-10" },
                        t.button({
                            type: "button",
                            className: () => `link-hint ${collection[token.key].secret ? "txt-success" : ""}`,
                            textContent: i18n.t("token_options.invalidate_all"),
                            onclick: () => {
                                // toggle
                                if (collection[token.key].secret) {
                                    delete collection[token.key].secret;
                                } else {
                                    collection[token.key].secret = app.utils.randomSecret(50);
                                }
                            },
                        }),
                    ),
                );
            });
        }),
    );
}
