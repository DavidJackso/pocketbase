import { i18n } from "../i18n.js";

const TEST_REQUEST_KEY = "test_view_query";

export function collectionViewQueryTab(upsertData) {
    const uniqueId = "query_" + app.utils.randomString();

    // dprint-ignore
    const autocomplete = [
        "SELECT", "FROM", "WHERE", "LEFT JOIN", "INNER JOIN", "ON",
        "AS", "GROUP BY", "HAVING", "ORDER BY", "ASC", "DESC", "LIMIT",
        "OFFSET", "WITH", "NOT", "IN", "AND", "OR", "EXISTS", "LIKE",
        "CAST", "REAL", "DECIMAL", "NUMERIC", "INT", "TEXT", "BOOL",
    ];

    const local = store({
        testRecords: [],
        testError: "",
        isTesting: false,
    });

    async function dryRunViewQuery(query) {
        local.isTesting = true;

        local.testRecords = [];

        // reset form errors related to the query
        if (app.store.errors?.viewQuery || app.store.errors?.fields) {
            delete app.store.errors.viewQuery;
            delete app.store.errors.fields;
        }

        if (!query) {
            local.testError = "";
            local.isTesting = false;
            return;
        }

        try {
            const result = await app.pb.collections.dryRunViewQuery(query, {
                requestKey: TEST_REQUEST_KEY,
            });

            if (upsertData.collection?.id) {
                // replace the collection meta fields
                local.testRecords = result.sample.map((r) => {
                    r.collectionId = upsertData.collection?.id;
                    r.collectionName = upsertData.collection?.name;
                    return r;
                });
            } else {
                local.testRecords = result.sample;
            }

            local.testError = "";
            local.isTesting = false;
        } catch (err) {
            if (!err.isAbort) {
                local.testError = err.message || i18n.t("collection_view_query.invalid_query");
                local.isTesting = false;
            }
        }
    }

    let testDebounceId;

    const watchers = [
        watch(() => upsertData.collection?.viewQuery, (newQuery) => {
            clearTimeout(testDebounceId);
            testDebounceId = setTimeout(() => dryRunViewQuery(newQuery), 200);
        }),
    ];

    return t.div(
        {
            pbEvent: "collectionViewQueryTabContent",
            className: "collection-tab-content collection-view-query-tab-content",
            onunmount: () => {
                clearTimeout(testDebounceId);
                app.pb.cancelRequest(TEST_REQUEST_KEY);
                watchers.forEach((w) => w?.unwatch());
            },
        },
        t.div(
            { className: "grid" },
            t.div(
                { className: "col-12" },
                t.div(
                    { className: "txt-right txt-sm m-b-10" },
                    t.button(
                        {
                            type: "button",
                            className: "txt-bold link-hint",
                            "html-popovertarget": uniqueId + "caveats_dropdown",
                        },
                        () => i18n.t("collection_view_query.caveats_title"),
                    ),
                ),
                t.div(
                    {
                        id: uniqueId + "caveats_dropdown",
                        className: "dropdown sm query-caveats-dropdown",
                        popover: "auto",
                    },
                    t.ul(
                        null,
                        t.li(null, i18n.t("collection_view_query.caveat_wildcard")),
                        t.li(
                            null,
                            () => i18n.t("collection_view_query.caveat_unique_id_a") + " ",
                            t.code(null, "id"),
                            " " + i18n.t("collection_view_query.caveat_unique_id_b") + ".",
                            t.br(),
                            () => i18n.t("collection_view_query.caveat_unique_id_c") + " ",
                            t.code(null, "(ROW_NUMBER() OVER()) as id"),
                            ".",
                        ),
                        t.li(
                            null,
                            () => i18n.t("collection_view_query.caveat_alias") + " ",
                            t.code(null, "MAX(balance) as maxBalance"),
                            ".",
                        ),
                        t.li(
                            null,
                            () => i18n.t("collection_view_query.caveat_parenthesis") + " ",
                            t.code(null, "(MAX(balance) + 1) as maxBalance"),
                            ".",
                        ),
                        t.li(
                            null,
                            i18n.t("collection_view_query.caveat_union"),
                        ),
                    ),
                ),
                t.div(
                    { className: "field" },
                    t.label(
                        { htmlFor: uniqueId + ".viewQuery" },
                        t.span({ className: "txt" }, i18n.t("collection_view_query.select_query")),
                        t.span(
                            {
                                hidden: () => !local.testError,
                                className: "query-state",
                                ariaDescription: app.attrs.tooltip(i18n.t("collection_view_query.invalid_query_short"), "left"),
                            },
                            t.i({ className: "ri-error-warning-fill txt-danger", ariaHidden: true }),
                        ),
                        t.span(
                            {
                                hidden: () => !!local.testError,
                                className: "query-state",
                                ariaDescription: app.attrs.tooltip(i18n.t("collection_view_query.valid_query"), "left"),
                            },
                            t.i({ className: "ri-checkbox-circle-fill txt-success", ariaHidden: true }),
                        ),
                    ),
                    app.components.codeEditor({
                        id: uniqueId + ".viewQuery",
                        name: "viewQuery",
                        language: "sql",
                        required: true,
                        autocomplete: autocomplete,
                        className: "inline-error",
                        value: () => upsertData.collection.viewQuery || "",
                        oninput: (newVal) => {
                            upsertData.collection.viewQuery = newVal;
                        },
                    }),
                ),
            ),
            t.div(
                { className: "col-12" },
                t.p(
                    { className: "txt-sm txt-bold" },
                    i18n.t("collection_view_query.sample_output"),
                ),
                t.div(
                    { className: "view-query-sample-wrapper" },
                    t.span({ hidden: () => !local.isTesting, className: "loader sm" }),
                    app.components.codeBlock({
                        language: () => local.testError ? "plain" : "js",
                        className: () => `view-query-sample ${local.testError ? "txt-danger" : ""}`,
                        value: () => {
                            if (local.testRecords?.length) {
                                return JSON.stringify(local.testRecords, null, 2);
                            }

                            return local.testError || "N/A";
                        },
                    }),
                ),
            ),
        ),
    );
}
