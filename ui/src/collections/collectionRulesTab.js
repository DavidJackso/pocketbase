import { i18n } from "../i18n.js";

export function collectionRulesTab(upsertData) {
    const local = store({
        showRulesInfo: false,
        showAuthRules: false,
    });

    const systemRuleTooltip = () =>
        app.attrs.tooltip(
            upsertData.originalCollection?.system ? i18n.t("collection_rules.system_rule_locked") : null,
            "top-left",
        );

    function autocomplete(word) {
        return app.utils.collectionAutocompleteKeys(upsertData.collection, word);
    }

    return t.div(
        { className: "collection-tab-content collection-rules-tab-content" },
        t.div(
            { className: "grid" },
            t.div(
                { className: "col-12" },
                t.div(
                    { className: "flex txt-hint txt-sm" },
                    t.span(
                        { className: "txt" },
                        () => i18n.t("collection_rules.all_rules_follow") + " ",
                        t.a({
                            target: "_blank",
                            rel: "noopener noreferrer",
                            href: import.meta.env.PB_RULES_SYNTAX_DOCS,
                            textContent: i18n.t("collection_rules.filter_syntax_and_operators"),
                        }),
                        ".",
                    ),
                    t.strong({
                        tabIndex: -1,
                        className: "m-l-auto link-hint",
                        textContent: () =>
                            (local.showRulesInfo
                                ? i18n.t("collection_rules.hide_available_fields")
                                : i18n.t("collection_rules.show_available_fields")),
                        onclick: () => (local.showRulesInfo = !local.showRulesInfo),
                    }),
                ),
                app.components.slide(
                    () => local.showRulesInfo,
                    t.div(
                        { className: "alert warning m-t-sm" },
                        t.div(
                            { className: "content" },
                            t.p(null, i18n.t("collection_rules.available_fields_intro")),
                            t.div({ className: "flex flex-wrap gap-5" }, () => {
                                const identifiers = app.utils.getAllCollectionIdentifiers(upsertData.collection);
                                return identifiers.map((f) => {
                                    return t.code(null, f);
                                });
                            }),
                            t.hr({ className: "m-t-10 m-b-10" }),
                            t.p(
                                null,
                                () => i18n.t("collection_rules.request_fields_intro") + " ",
                                t.strong(null, "@request"),
                                " " + i18n.t("collection_rules.fields_suffix") + ":",
                            ),
                            t.div(
                                { className: "flex flex-wrap gap-5" },
                                t.code(null, "@request.headers.*"),
                                t.code(null, "@request.query.*"),
                                t.code(null, "@request.body.*"),
                                t.code(null, "@request.auth.*"),
                            ),
                            t.hr({ className: "m-t-10 m-b-10" }),
                            t.p(
                                null,
                                () => i18n.t("collection_rules.collection_field_intro") + " ",
                                t.strong(null, "@collection"),
                                " " + i18n.t("collection_rules.field_suffix") + ":",
                            ),
                            t.div(
                                { className: "flex flex-wrap gap-5" },
                                t.code(null, "@collection.ANY_COLLECTION_NAME.*"),
                            ),
                            t.hr({ className: "m-t-10 m-b-10" }),
                            t.p(null, i18n.t("collection_rules.example_rule")),
                            () => {
                                const dateField = upsertData.collection.fields?.find(
                                    (f) => f.type == "date" || f.type == "autodate",
                                );
                                if (dateField) {
                                    return t.code(
                                        null,
                                        `@request.auth.id != "" && ${dateField.name} > "2022-01-01 00:00:00.000Z"`,
                                    );
                                }
                                return t.code(null, `@request.auth.id != ""`);
                            },
                        ),
                    ),
                ),
            ),
            t.div(
                { className: "col-12", ariaDescription: systemRuleTooltip() },
                app.components.ruleField({
                    label: i18n.t("collections_overview.list_search_rule"),
                    name: "listRule",
                    autocomplete: autocomplete,
                    disabled: () => upsertData.originalCollection?.system,
                    value: () => upsertData.collection.listRule,
                    oninput: (val) => (upsertData.collection.listRule = val),
                }),
            ),
            t.div(
                { className: "col-12", ariaDescription: systemRuleTooltip() },
                app.components.ruleField({
                    label: i18n.t("collections_overview.view_rule"),
                    name: "viewRule",
                    autocomplete: autocomplete,
                    disabled: () => upsertData.originalCollection?.system,
                    value: () => upsertData.collection.viewRule,
                    oninput: (val) => (upsertData.collection.viewRule = val),
                }),
            ),
            () => {
                // view collections has only List and View API rules
                if (upsertData.collection.type == "view") {
                    return;
                }

                return [
                    t.div(
                        { className: "col-12", ariaDescription: systemRuleTooltip() },
                        app.components.ruleField({
                            label: [
                                t.span({ className: "txt", textContent: i18n.t("collections_overview.create_rule") }),
                                t.i({
                                    hidden: () => upsertData.collection.createRule == null,
                                    className: "ri-information-line link-hint",
                                    ariaDescription: app.attrs.tooltip(i18n.t("collection_rules.create_rule_help")),
                                }),
                            ],
                            name: "createRule",
                            autocomplete: autocomplete,
                            disabled: () => upsertData.originalCollection?.system,
                            value: () => upsertData.collection.createRule,
                            oninput: (val) => (upsertData.collection.createRule = val),
                        }),
                    ),
                    t.div(
                        { className: "col-12", ariaDescription: systemRuleTooltip() },
                        app.components.ruleField({
                            label: [
                                t.span({ className: "txt", textContent: i18n.t("collections_overview.update_rule") }),
                                t.i({
                                    hidden: () => upsertData.collection.updateRule == null,
                                    className: "ri-information-line link-hint",
                                    ariaDescription: app.attrs.tooltip(i18n.t("collection_rules.update_rule_help")),
                                }),
                            ],
                            name: "updateRule",
                            autocomplete: autocomplete,
                            disabled: () => upsertData.originalCollection?.system,
                            value: () => upsertData.collection.updateRule,
                            oninput: (val) => (upsertData.collection.updateRule = val),
                        }),
                    ),
                    t.div(
                        { className: "col-12", ariaDescription: systemRuleTooltip() },
                        app.components.ruleField({
                            label: i18n.t("collections_overview.delete_rule"),
                            name: "deleteRule",
                            autocomplete: autocomplete,
                            disabled: () => upsertData.originalCollection?.system,
                            value: () => upsertData.collection.deleteRule,
                            oninput: (val) => (upsertData.collection.deleteRule = val),
                        }),
                    ),
                ];
            },
        ),
        // auth specific fields
        () => {
            if (upsertData.collection.type != "auth") {
                return;
            }

            return [
                t.hr({ className: "m-t-base m-b-base" }),
                t.button(
                    {
                        type: "button",
                        onmount: () => {
                            local.showAuthRules = upsertData.collection.manageRule !== null
                                || upsertData.collection.authRule !== "";
                        },
                        className: () => `btn secondary sm ${local.showAuthRules ? "" : "transparent"}`,
                        onclick: () => {
                            local.showAuthRules = !local.showAuthRules;
                        },
                    },
                    t.span({ className: "txt" }, i18n.t("collection_rules.additional_auth_rules")),
                    t.i({
                        ariaHidden: true,
                        className: () => (local.showAuthRules ? "ri-arrow-drop-up-line" : "ri-arrow-drop-down-line"),
                    }),
                ),
                app.components.slide(
                    () => local.showAuthRules,
                    t.div(
                        { className: "grid sm m-t-sm" },
                        t.div(
                            { className: "col-12", ariaDescription: systemRuleTooltip() },
                            app.components.ruleField({
                                label: i18n.t("collection_rules.authentication_rule"),
                                name: "authRule",
                                placeholder: "",
                                autocomplete: autocomplete,
                                disabled: () => upsertData.originalCollection?.system,
                                value: () => upsertData.collection.authRule,
                                oninput: (val) => (upsertData.collection.authRule = val),
                            }),
                            t.div(
                                { className: "field-help" },
                                t.p(
                                    null,
                                    () => i18n.t("collection_rules.auth_rule_help1a") + " ",
                                    t.strong(null, i18n.t("collection_rules.auth_rule_help1b")),
                                    " " + i18n.t("collection_rules.auth_rule_help1c"),
                                ),
                                t.p(
                                    null,
                                    () => i18n.t("collection_rules.auth_rule_help2") + " ",
                                    t.code(null, "verified = true"),
                                    ".",
                                ),
                                t.p(null, i18n.t("collection_rules.auth_rule_help3")),
                                t.p(null, i18n.t("collection_rules.auth_rule_help4")),
                            ),
                        ),
                        t.div(
                            { className: "col-12", ariaDescription: systemRuleTooltip() },
                            app.components.ruleField({
                                label: i18n.t("collections_overview.manage_rule"),
                                name: "manageRule",
                                autocomplete: autocomplete,
                                disabled: () => upsertData.originalCollection?.system,
                                value: () => upsertData.collection.manageRule,
                                oninput: (val) => (upsertData.collection.manageRule = val),
                            }),
                            t.div(
                                { className: "field-help" },
                                t.p(
                                    null,
                                    () => i18n.t("collection_rules.manage_rule_help1a") + " ",
                                    t.strong(null, i18n.t("collection_rules.create")),
                                    " " + i18n.t("common.and") + " ",
                                    t.strong(null, i18n.t("collection_rules.update")),
                                    " " + i18n.t("collection_rules.manage_rule_help1b"),
                                ),
                                t.p(
                                    null,
                                    i18n.t("collection_rules.manage_rule_help2"),
                                ),
                            ),
                        ),
                    ),
                ),
            ];
        },
    );
}
