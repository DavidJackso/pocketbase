import { i18n } from "../i18n.js";

export function mfaAccordion(collection) {
    const uniqueId = "mfa_" + app.utils.randomString();

    const data = store({
        get config() {
            if (!collection.mfa) {
                collection.mfa = {
                    enabled: false,
                    duration: 600,
                    rule: "",
                };
            }

            return collection.mfa;
        },
        get isSuperusers() {
            return collection.system && collection.name == "_superusers";
        },
    });

    return t.details(
        {
            pbEvent: "mfaAccordion",
            name: "auth-methods",
            className: "accordion mfa-accordion",
        },
        t.summary(
            null,
            t.i({ className: "ri-shield-check-line", ariaHidden: true }),
            t.span({ className: "txt", textContent: i18n.t("mfa.title") }),
            t.span({
                className: () => `label m-l-auto ${data.config.enabled ? "success" : ""}`,
                textContent: () => (data.config.enabled ? i18n.t("common.enabled") : i18n.t("common.disabled")),
            }),
            () => {
                if (!app.store.errors?.mfa) {
                    return;
                }

                return t.i({
                    className: "ri-error-warning-fill txt-danger",
                    ariaDescription: app.attrs.tooltip(i18n.t("common.has_errors"), "left"),
                });
            },
        ),
        t.div(
            { className: "grid sm" },
            t.div(
                { className: "col-sm-12" },
                t.div(
                    { className: "alert info" },
                    t.div(
                        { className: "content" },
                        t.p(
                            null,
                            () => i18n.t("mfa.description") + " ",
                            t.a({
                                href: import.meta.env.PB_MFA_DOCS,
                                className: "link-hint",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                textContent: i18n.t("mfa.learn_more"),
                            }),
                        ),
                    ),
                ),
            ),
            t.div(
                { className: "col-sm-12" },
                t.div(
                    { className: "field" },
                    t.input({
                        type: "checkbox",
                        id: uniqueId + ".enabled",
                        name: "mfa.enabled",
                        className: "switch",
                        checked: () => data.config.enabled,
                        onchange: (e) => {
                            data.config.enabled = e.target.checked;

                            if (data.isSuperusers) {
                                collection.otp.enabled = e.target.checked;
                            }
                        },
                    }),
                    t.label({
                        htmlFor: uniqueId + ".enabled",
                        textContent: i18n.t("common.enable"),
                    }),
                ),
            ),
            t.div(
                { className: "col-sm-12" },
                t.div(
                    { className: "field" },
                    t.label({
                        htmlFor: uniqueId + ".duration",
                        textContent: i18n.t("mfa.duration_label"),
                    }),
                    t.input({
                        type: "number",
                        id: uniqueId + ".duration",
                        name: "mfa.duration",
                        min: 1,
                        step: 1,
                        required: true,
                        value: () => data.config.duration || "",
                        oninput: (e) => (data.config.duration = parseInt(e.target.value, 10)),
                    }),
                ),
            ),
            t.div(
                { className: "col-sm-12" },
                app.components.ruleField({
                    label: i18n.t("mfa.rule_label"),
                    id: uniqueId + ".rule",
                    name: "mfa.rule",
                    nullable: false,
                    placeholder: i18n.t("mfa.rule_placeholder"),
                    autocomplete: (word) => {
                        return app.utils.collectionAutocompleteKeys(collection, word);
                    },
                    value: () => data.config.rule || "",
                    oninput: (newVal) => (data.config.rule = newVal),
                }),
                t.div(
                    { className: "field-help" },
                    t.p(null, i18n.t("mfa.rule_help1")),
                    t.p(
                        null,
                        () => i18n.t("mfa.rule_help2") + " ",
                        t.code(null, "email != ''"),
                        ".",
                    ),
                    t.p(null, i18n.t("mfa.rule_help3")),
                ),
            ),
        ),
    );
}
