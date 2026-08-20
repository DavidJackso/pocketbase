import { i18n } from "../i18n.js";
import { fullDummyPayload, primitivesDummyPayload, replaceDummyPayloadPlaceholder } from "./docsCreate";
import { expandInfo } from "./expandInfo";
import { fieldsInfo } from "./fieldsInfo";

export function docsUpdate(collection) {
    const baseURL = app.utils.getApiExampleURL();

    const isSuperusersOnly = collection.updateRule === null;

    const isAuth = collection.type === "auth";

    const excludedTableFields = isAuth ? ["id", "password", "verified", "email", "emailVisibility"] : ["id"];

    const tableFields =
        collection.fields?.filter((f) => !f.hidden && f.type != "autodate" && !excludedTableFields.includes(f.name))
        || [];

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
        {
            title: 400,
            value: `
                {
                  "status": 400,
                  "message": "Failed to create record.",
                  "data": {
                    "${tableFields.find((f) => !f.primaryKey)?.name || "someField"}": {
                      "code": "validation_required",
                      "message": "Missing required value."
                    }
                  }
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
                  "message": "Only superusers can perform this action.",
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
        { pbEvent: "apiPreviewUpdate", className: "content" },
        // description
        t.p(null, i18n.t("api_preview.update_desc", { name: collection.name })),
        t.p(
            null,
            i18n.t("api_preview.body_params_sent_as") + " ",
            t.code(null, "application/json"),
            " " + i18n.t("common.or") + " ",
            t.code(null, "multipart/form-data"),
            ".",
        ),
        t.p(
            null,
            i18n.t("api_preview.file_upload_supported_via") + " ",
            t.code(null, "multipart/form-data"),
            ". " + i18n.t("api_preview.for_more_info_check") + " ",
            t.a({
                href: import.meta.env.PB_FILE_UPLOAD_DOCS,
                target: "_blank",
                rel: "noopener noreferrer",
                textContent: i18n.t("api_preview.files_upload_docs"),
            }),
            ".",
        ),
        t.p(
            null,
            t.em(
                null,
                i18n.t("api_preview.password_change_note"),
            ),
        ),
        app.components.codeBlockTabs({
            className: "sdk-examples m-t-sm",
            historyKey: "pbLastSDK",
            tabs: [
                {
                    title: "JS SDK",
                    language: "js",
                    // dprint-ignore
                    value: `
import PocketBase from 'pocketbase';

const pb = new PocketBase('${baseURL}');

...

// example update body
const body = ${replaceDummyPayloadPlaceholder(JSON.stringify(fullDummyPayload(collection, true), null, 2))};

const record = await pb.collection('${collection.name}').update('RECORD_ID', body);
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
                    // dprint-ignore
                    value: `
import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${baseURL}');

...

// example update body
final body = <String, dynamic>${JSON.stringify(primitivesDummyPayload(collection, true), null, 2)};

final record = await pb.collection('${collection.name}').update(
  'RECORD_ID',
  body: body,
  files: [],
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
                        curl -X PATCH \\
                          -H 'Authorization:TOKEN' \\
                          -H 'Content-Type:application/json' \\
                          -d '{ ... }' \\
                          '${baseURL}/api/collections/${collection.name}/records/RECORD_ID'
                    `,
                },
            ],
        }),
        // api
        t.div({ className: "block m-t-base" }, t.strong(null, i18n.t("api_preview.api_details"))),
        t.div(
            { className: "alert warning api-preview-alert" },
            t.span({ className: "label method" }, "PATCH"),
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
                    t.td(null, i18n.t("api_preview.id_of_record_to_update")),
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
