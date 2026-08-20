import { toDeleteProp } from "@/base/fieldSettings";
import { i18n } from "../i18n.js";

window.app = window.app || {};
window.app.modals = window.app.modals || {};

window.app.modals.openCollectionChangesConfirmation = async function(
    oldCollection,
    newCollection,
    yesCallback,
    noCallback,
) {
    const data = store({
        isLoadingConflictingOIDCProviders: false,
        conflictingOIDCProviders: [],
        // ---
        get isCollectionRenamed() {
            return oldCollection?.name != newCollection?.name;
        },
        get isNewCollectionAuth() {
            return newCollection?.type === "auth";
        },
        get isNewCollectionView() {
            return newCollection?.type === "view";
        },
        get renamedFields() {
            if (data.isNewCollectionView) {
                return [];
            }

            return newCollection?.fields?.filter?.((f) => {
                let oldField;
                if (f.id && !f[toDeleteProp]) {
                    oldField = oldCollection.fields?.find?.((old) => old.id == f.id);
                }

                return oldField && oldField.name != f.name;
            }) || [];
        },
        get deletedFields() {
            if (data.isNewCollectionView) {
                return [];
            }

            return newCollection?.fields?.filter?.((f) => {
                return f.id && f[toDeleteProp];
            }) || [];
        },
        get multipleToSingleFields() {
            if (data.isNewCollectionView) {
                return [];
            }

            return newCollection?.fields?.filter?.((newField) => {
                const oldField = oldCollection?.fields?.find?.((f) => f.id == newField.id);
                if (!oldField || typeof oldField.maxSelect == "undefined") {
                    return false;
                }

                // normalize
                const oldMaxSelect = oldField.maxSelect || 1;
                const newMaxSelect = newField.maxSelect || 1;

                return oldMaxSelect > 1 && newMaxSelect == 1;
            }) || [];
        },
        get changedRules() {
            // for now enable only for "production"
            if (window.location.protocol != "https:") {
                return [];
            }

            const result = [];

            const ruleProps = ["listRule", "viewRule"];
            if (!data.isNewCollectionView) {
                ruleProps.push("createRule", "updateRule", "deleteRule");
            }
            if (data.isNewCollectionAuth) {
                ruleProps.push("manageRule", "authRule");
            }

            let oldRule, newRule;
            for (let prop of ruleProps) {
                oldRule = oldCollection?.[prop];
                newRule = newCollection?.[prop];
                if (oldRule === newRule) {
                    continue;
                }

                result.push({ prop, oldRule, newRule });
            }

            return result;
        },
        get needConfirmation() {
            return !app.utils.isEmpty(oldCollection?.id) && (
                data.isCollectionRenamed
                || data.renamedFields.length
                || data.deletedFields.length
                || data.multipleToSingleFields.length
                || data.changedRules.length
                || data.conflictingOIDCProviders.length
            );
        },
    });

    const knownOIDCProviders = ["oidc", "oidc2", "oidc3"];

    async function detectConflictingOIDCProviders() {
        if (app.utils.isEmpty(oldCollection?.id) || !data.isNewCollectionAuth) {
            return;
        }

        data.isLoadingConflictingOIDCProviders = true;

        try {
            data.conflictingOIDCProviders = [];

            for (const name of knownOIDCProviders) {
                const oldProvider = oldCollection?.oauth2?.providers?.find?.((p) => p.name == name);
                const newProvider = newCollection?.oauth2?.providers?.find?.((p) => p.name == name);

                if (!oldProvider || !newProvider) {
                    continue;
                }

                const oldHost = new URL(oldProvider.authURL).host;
                const newHost = new URL(newProvider.authURL).host;
                if (oldHost == newHost) {
                    continue;
                }

                // check if there are existing externalAuths
                const haveExternalAuths = await app.pb.collection("_externalAuths").getFirstListItem(
                    app.pb.filter("collectionRef={:collectionId} && provider={:provider}", {
                        collectionId: newCollection?.id,
                        provider: name,
                    }),
                    {
                        requestKey: null,
                    },
                );
                if (haveExternalAuths) {
                    data.conflictingOIDCProviders.push({ name, oldHost, newHost });
                }
            }

            data.isLoadingConflictingOIDCProviders = false;
        } catch (err) {
            if (!err?.isAbort) {
                data.isLoadingConflictingOIDCProviders = false;
                app.checkApiError(err);
            }
        }
    }

    await detectConflictingOIDCProviders();

    if (!data.needConfirmation) {
        return yesCallback();
    }

    app.modals.confirm(
        t.div(
            { className: "dangerous-collection-changes-list" },
            t.h5({ className: "block txt-center m-b-base" }, i18n.t("collection_changes.confirm_save")),
            // general collection warning
            () => {
                if (!data.isCollectionRenamed && !data.deletedFields.length && !data.renamedFields.length) {
                    return;
                }

                return t.div(
                    { className: "alert warning m-b-base" },
                    t.p(
                        null,
                        i18n.t("collection_changes.manual_update_warning"),
                    ),
                    () => {
                        if (data.deletedFields.length) {
                            return t.p(
                                null,
                                i18n.t("collection_changes.deleted_data_warning"),
                            );
                        }
                    },
                );
            },
            // renamed collection
            () => {
                if (!data.isCollectionRenamed) {
                    return;
                }

                return t.ul(
                    { className: "collection-changes-list changes-renamed-collection" },
                    t.li(
                        { className: "list-item" },
                        () => i18n.t("collection_changes.renamed_collection") + " ",
                        t.strong({ className: "label warning" }, oldCollection?.name),
                        t.i({ className: "ri-arrow-right-line txt-sm", ariaHidden: true }),
                        t.strong({ className: "label success" }, newCollection?.name || "N/A"),
                    ),
                );
            },
            // renamed fields
            () => {
                if (!data.renamedFields.length) {
                    return;
                }

                return t.ul(
                    { className: "collection-changes-list changes-renamed-fields" },
                    () => {
                        return data.renamedFields.map((newField) => {
                            const oldField = oldCollection?.fields?.find?.((f) => f.id == newField.id);
                            return t.li(
                                { className: "list-item" },
                                () => i18n.t("collection_changes.renamed_field") + " ",
                                t.strong({ className: "label warning" }, oldField?.name),
                                t.i({ className: "ri-arrow-right-line txt-sm", ariaHidden: true }),
                                t.strong({ className: "label success" }, newField.name || "N/A"),
                            );
                        });
                    },
                );
            },
            // deleted fields
            () => {
                if (!data.deletedFields.length) {
                    return;
                }

                return t.ul(
                    { className: "collection-changes-list changes-deleted-fields" },
                    () => {
                        return data.deletedFields.map((field) => {
                            return t.li(
                                { className: "list-item" },
                                () => i18n.t("collection_changes.deleted_field") + " ",
                                t.strong({ className: "label danger" }, field.name || "N/A"),
                            );
                        });
                    },
                );
            },
            // multiple->single fields
            () => {
                if (!data.multipleToSingleFields.length) {
                    return;
                }

                return t.ul(
                    { className: "collection-changes-list changes-multiple-to-single-fields" },
                    () => {
                        return data.multipleToSingleFields.map((field) => {
                            return t.li(
                                { className: "list-item" },
                                () => i18n.t("collection_changes.multiple_to_single") + " ",
                                t.strong({ className: "label warning" }, field.name || field.id),
                                t.em(
                                    { className: "txt-sm" },
                                    () => " (" + i18n.t("collection_changes.keeps_last_item") + ")",
                                ),
                            );
                        });
                    },
                );
            },
            // API rule changes
            () => {
                if (!data.changedRules.length) {
                    return;
                }

                return t.ul(
                    { className: "collection-changes-list changes-api-rules" },
                    () => {
                        return data.changedRules.map((ruleChange) => {
                            return t.li(
                                { className: "list-item" },
                                t.div(
                                    { className: "content" },
                                    t.span(
                                        { className: "txt" },
                                        () => i18n.t("collection_changes.changed_api_rule_for") + " ",
                                    ),
                                    t.code(null, ruleChange.prop),
                                ),
                                t.small({ className: "txt-bold" }, i18n.t("collection_changes.old")),
                                t.div(
                                    { className: "rule-content old-rule" },
                                    ruleChange.oldRule === null
                                        ? i18n.t("collection_changes.null_superusers_only")
                                        : (ruleChange.oldRule || "\"\""),
                                ),
                                t.small({ className: "txt-bold" }, i18n.t("collection_changes.new")),
                                t.div(
                                    { className: "rule-content new-rule" },
                                    ruleChange.newRule === null
                                        ? i18n.t("collection_changes.null_superusers_only")
                                        : (ruleChange.newRule || "\"\""),
                                ),
                            );
                        });
                    },
                );
            },
            // Conflicting OIDC changes
            () => {
                if (!data.conflictingOIDCProviders.length) {
                    return;
                }

                return t.ul(
                    { className: "collection-changes-list changes-api-rules" },
                    () => {
                        return data.conflictingOIDCProviders.map((oidc) => {
                            return t.li(
                                { className: "list-item" },
                                () => i18n.t("collection_changes.changed_oidc") + " ",
                                oidc.name,
                                () => " " + i18n.t("collection_changes.host") + " ",
                                t.strong({ className: "label warning" }, oidc.oldHost),
                                t.i({ className: "ri-arrow-right-line txt-sm", ariaHidden: true }),
                                t.strong({ className: "label success" }, oidc.newHost),
                                t.br(),
                                t.span(
                                    { className: "txt-hint" },
                                    i18n.t("collection_changes.oidc_host_warning"),
                                ),
                                " ",
                                t.a({
                                    rel: "noopenener noreferrer",
                                    target: "_blank",
                                    href: () => {
                                        return `#/collections?collection=_externalAuths&filter=collectionRef%3D%22${newCollection?.id}%22+%26%26+provider%3D%22${oidc.name}%22`;
                                    },
                                    textContent: i18n.t("collection_changes.review_external_auths"),
                                }),
                            );
                        });
                    },
                );
            },
        ),
        yesCallback,
        noCallback,
        {
            className: "collection-changes-confirm-modal",
            yesButton: i18n.t("collection_changes.yes_save_changes"),
        },
    );
};
