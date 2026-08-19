import { expandInfo } from "./expandInfo";
import { fieldsInfo } from "./fieldsInfo";
import { filterSyntax } from "./filterSyntax";
import { i18n } from "../i18n.js";

export function docsList(collection) {
    const baseURL = app.utils.getApiExampleURL();

    const isSuperusersOnly = collection.listRule === null;

    const baseDummyRecord = {
        collectionId: collection.id,
        collectionName: collection.name,
    };

    const responses = [
        {
            title: 200,
            value: JSON.stringify(
                {
                    page: 1,
                    perPage: 30,
                    totalPages: 1,
                    totalItems: 2,
                    items: [
                        Object.assign(baseDummyRecord, app.utils.getDummyFieldsData(collection)),
                        Object.assign(baseDummyRecord, app.utils.getDummyFieldsData(collection)),
                    ],
                },
                null,
                2,
            ),
        },
        {
            title: 400,
            value: `
                {
                  "status": 400,
                  "message": "Something went wrong while processing your request.",
                  "data": {}
                }
            `,
        },
    ];
    if (isSuperusersOnly) {
        responses.push({
            title: 403,
            value: `
                {
                  "status": 403,
                  "message": "Only superusers can access this action.",
                  "data": {}
                }
            `,
        });
    }

    return t.div(
        { pbEvent: "apiPreviewList", className: "content" },
        // description
        t.p(null, i18n.t("api_preview.fetch_paginated_records_list", { name: collection.name })),
        app.components.codeBlockTabs({
            className: "sdk-examples m-t-sm",
            historyKey: "pbLastSDK",
            tabs: [
                {
                    title: "JS SDK",
                    language: "js",
                    value: `
                        import PocketBase from 'pocketbase';

                        const pb = new PocketBase('${baseURL}');

                        ...

                        // fetch a paginated records list
                        const resultList = await pb.collection('${collection.name}').getList(1, 50, {
                          filter: 'someField1 != someField2',
                        });

                        // you can also fetch all records at once via getFullList
                        const records = await pb.collection('${collection.name}').getFullList({
                          sort: '-someField',
                        });

                        // or fetch only the first record that matches the specified filter
                        const record = await pb.collection('${collection.name}').getFirstListItem(
                          'someField="test"',
                          { expand: 'relField1,relField2.subRelField' },
                        );
                    `,
                    footnote: t.div(
                        { className: "txt-right" },
                        t.a({
                            href: import.meta.env.PB_JS_SDK_URL,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            textContent: i18n.t("api_preview.js_sdk_docs"),
                        }),
                    ),
                },
                {
                    title: "Dart SDK",
                    language: "dart",
                    value: `
                        import 'package:pocketbase/pocketbase.dart';

                        final pb = PocketBase('${baseURL}');

                        ...

                        // fetch a paginated records list
                        final resultList = await pb.collection('${collection.name}').getList(
                          page: 1,
                          perPage: 50,
                          filter: 'someField1 != someField2',
                        );

                        // you can also fetch all records at once via getFullList
                        final records = await pb.collection('${collection.name}').getFullList(
                          sort: '-someField',
                        );

                        // or fetch only the first record that matches the specified filter
                        final record = await pb.collection('${collection.name}').getFirstListItem(
                          'someField="test"',
                          expand: 'relField1,relField2.subRelField',
                        );
                    `,
                    footnote: t.div(
                        { className: "txt-right" },
                        t.a({
                            href: import.meta.env.PB_DART_SDK_URL,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            textContent: i18n.t("api_preview.dart_sdk_docs"),
                        }),
                    ),
                },
                {
                    title: "curl",
                    language: "bash",
                    value: `
                        curl \\
                          -H 'Authorization:TOKEN' \\
                          '${baseURL}/api/collections/${collection.name}/records?perPage=50'
                    `,
                },
            ],
        }),
        // api
        t.div({ className: "block m-t-base" }, t.strong(null, i18n.t("api_preview.api_details"))),
        t.div(
            { className: "alert info api-preview-alert" },
            t.span({ className: "label method" }, "GET"),
            t.span({ className: "path" }, `/api/collections/${collection.name}/records`),
            () => {
                if (isSuperusersOnly) {
                    return t.small({ className: "extra" }, i18n.t("api_preview.requires_superuser_auth"));
                }
            },
        ),
        t.table(
            { className: "api-preview-table query-params" },
            t.thead(
                null,
                t.tr(
                    null,
                    t.th({ className: "min-width txt-primary" }, i18n.t("api_preview.query_params")),
                    t.th({ className: "min-width" }, i18n.t("api_preview.type")),
                    t.th(null, i18n.t("api_preview.description")),
                ),
            ),
            t.tbody(
                null,
                t.tr(
                    null,
                    t.td({ className: "min-width" }, "page"),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.number"))),
                    t.td(null, i18n.t("api_preview.page_param_desc")),
                ),
                t.tr(
                    null,
                    t.td({ className: "min-width" }, "perPage"),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.number"))),
                    t.td(null, i18n.t("api_preview.per_page_param_desc")),
                ),
                t.tr(
                    null,
                    t.td({ className: "min-width" }, "sort"),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.string"))),
                    t.td(
                        null,
                        t.p(
                            null,
                            i18n.t("api_preview.sort_param_desc1"),
                            t.br(),
                            i18n.t("api_preview.sort_param_desc2"),
                        ),
                        t.p(
                            null,
                            i18n.t("api_preview.for_example") + ":",
                            app.components.codeBlock({
                                value: `// DESC by created and ASC by id\n?sort=-created,id`,
                            }),
                        ),
                        t.p(
                            null,
                            i18n.t("api_preview.sort_param_desc3") + " ",
                            t.code(null, "@random"),
                            " ",
                            t.code({ hidden: () => collection.type == "view" }, "@rowid"),
                            ".",
                        ),
                    ),
                ),
                t.tr(
                    null,
                    t.td({ className: "min-width" }, "filter"),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.string"))),
                    t.td(
                        null,
                        t.p(null, i18n.t("api_preview.filter_param_desc")),
                        app.components.codeBlock({
                            value: `?filter=(id='abc' && created>'2022-01-01')`,
                            footnote: i18n.t("api_preview.url_encoded_footnote"),
                        }),
                        filterSyntax(),
                    ),
                ),
                t.tr(
                    null,
                    t.td({ className: "min-width" }, "expand"),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.string"))),
                    t.td(null, expandInfo()),
                ),
                t.tr(
                    null,
                    t.td({ className: "min-width" }, "fields"),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.string"))),
                    t.td(null, fieldsInfo()),
                ),
                t.tr(
                    null,
                    t.td({ className: "min-width" }, "skipTotal"),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.boolean"))),
                    t.td(
                        null,
                        t.p(
                            null,
                            i18n.t("api_preview.skip_total_desc1_pre") + " ",
                            t.code(null, "1/true"),
                            " " + i18n.t("api_preview.skip_total_desc1_mid") + " ",
                            t.code(null, "totalItems"),
                            " " + i18n.t("common.and") + " ",
                            t.code(null, "totalPages"),
                            " " + i18n.t("api_preview.skip_total_desc1_post"),
                        ),
                        t.p(
                            null,
                            i18n.t("api_preview.skip_total_desc2"),
                            " " + i18n.t("api_preview.skip_total_desc2b") + " ",
                            t.code(null, "getFirstListItem()"),
                            " " + i18n.t("common.and") + " ",
                            t.code(null, "getFullList()"),
                            " " + i18n.t("api_preview.skip_total_desc2c"),
                        ),
                    ),
                ),
            ),
        ),
        // responses
        t.div({ className: "block m-t-base m-b-sm" }, t.strong(null, i18n.t("api_preview.example_responses"))),
        app.components.codeBlockTabs({
            tabs: responses,
        }),
    );
}
