import { i18n } from "../i18n.js";
import { expandInfo } from "./expandInfo";
import { fieldsInfo } from "./fieldsInfo";

export function docsView(collection) {
    const baseURL = app.utils.getApiExampleURL();

    const isSuperusersOnly = collection.viewRule === null;

    const baseDummyRecord = {
        collectionId: collection.id,
        collectionName: collection.name,
    };

    const responses = [
        {
            title: 200,
            value: JSON.stringify(
                Object.assign(baseDummyRecord, app.utils.getDummyFieldsData(collection)),
                null,
                2,
            ),
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
    responses.push({
        title: 404,
        value: `
            {
              "status": 404,
              "message": "The requested resource wasn't found.",
              "data": {}
            }
        `,
    });

    return t.div(
        { pbEvent: "apiPreviewView", className: "content" },
        // description
        t.p(null, i18n.t("api_preview.fetch_single_record", { name: collection.name })),
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

                        const record = await pb.collection('${collection.name}').getOne('RECORD_ID', {
                            expand: 'relField1,relField2.subRelField',
                        });
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

                        final record = await pb.collection('${collection.name}').getOne('RECORD_ID',
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
                          '${baseURL}/api/collections/${collection.name}/records/RECORD_ID'
                    `,
                },
            ],
        }),
        // api
        t.div({ className: "block m-t-base" }, t.strong(null, i18n.t("api_preview.api_details"))),
        t.div(
            { className: "alert info api-preview-alert" },
            t.span({ className: "label method" }, "GET"),
            t.span({ className: "path" }, `/api/collections/${collection.name}/records/`, t.strong(null, ":id")),
            () => {
                if (isSuperusersOnly) {
                    return t.small({ className: "extra" }, i18n.t("api_preview.requires_superuser_auth"));
                }
            },
        ),
        t.table(
            { className: "api-preview-table path-params" },
            t.thead(
                null,
                t.tr(
                    null,
                    t.th({ className: "min-width txt-primary" }, i18n.t("api_preview.path_params")),
                    t.th({ className: "min-width" }, i18n.t("api_preview.type")),
                    t.th(null, i18n.t("api_preview.description")),
                ),
            ),
            t.tbody(
                null,
                t.tr(
                    null,
                    t.td({ className: "min-width" }, "id"),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.string"))),
                    t.td(null, i18n.t("api_preview.id_of_record_to_view")),
                ),
            ),
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
            ),
        ),
        // responses
        t.div({ className: "block m-t-base m-b-sm" }, t.strong(null, i18n.t("api_preview.example_responses"))),
        app.components.codeBlockTabs({
            tabs: responses,
        }),
    );
}
