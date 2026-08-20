import { i18n } from "../i18n.js";
import { expandInfo } from "./expandInfo";
import { fieldsInfo } from "./fieldsInfo";
import { filterSyntax } from "./filterSyntax";

export function docsCreate(collection) {
    const baseURL = app.utils.getApiExampleURL();

    const isSuperusersOnly = collection.createRule === null;

    const isAuth = collection.type === "auth";

    const excludedTableFields = isAuth ? ["password", "verified", "email", "emailVisibility"] : [];

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
                    "${isAuth ? "email" : tableFields.find((f) => !f.primaryKey)?.name || "someField"}": {
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

    return t.div(
        { pbEvent: "apiPreviewCreate", className: "content" },
        // description
        t.p(null, i18n.t("api_preview.create_desc", { name: collection.name })),
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

// example create body
const body = ${replaceDummyPayloadPlaceholder(JSON.stringify(fullDummyPayload(collection), null, 2))};

const record = await pb.collection('${collection.name}').create(body);
`+ (isAuth ? `
// (optional) send an email verification request
await pb.collection('${collection?.name}').requestVerification(record.email);
` : ""),
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

// example create body
final body = <String, dynamic>${JSON.stringify(primitivesDummyPayload(collection), null, 2)};

final record = await pb.collection('${collection.name}').create(body: body, files: []);
` + (isAuth ? `
// (optional) send an email verification request
await pb.collection('${collection?.name}').requestVerification(
    record.get<String>('email'),
);
` : ""),
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
curl -X POST \\
  -H 'Authorization:TOKEN' \\
  -H 'Content-Type:application/json' \\
  -d '{ ... }' \\
  '${baseURL}/api/collections/${collection.name}/records'
` + (isAuth
                        ? `
# (optional) send an email verification request
curl -X POST \\
  -H 'Content-Type:application/json' \\
  -d '{ "email":"test@example.com" }' \\
  '${baseURL}/api/collections/${collection.name}/request-verification'
`
                        : ""),
                },
            ],
        }),
        // api
        t.div({ className: "block m-t-base" }, t.strong(null, i18n.t("api_preview.api_details"))),
        t.div(
            { className: "alert success api-preview-alert" },
            t.span({ className: "label method" }, "POST"),
            t.span({ className: "path" }, `/api/collections/${collection.name}/records`),
            () => {
                if (isSuperusersOnly) {
                    return t.small({ className: "extra" }, i18n.t("api_preview.requires_superuser_auth"));
                }
            },
        ),
        t.table(
            { className: "api-preview-table body-params" },
            t.thead(
                null,
                t.tr(
                    null,
                    t.th({ className: "min-width txt-primary" }, i18n.t("api_preview.body_params")),
                    t.th({ className: "min-width" }, i18n.t("api_preview.type")),
                    t.th(null, i18n.t("api_preview.description")),
                ),
            ),
            t.tbody(
                null,
                () => {
                    if (!isAuth) {
                        return;
                    }

                    return [
                        t.tr(
                            null,
                            t.th(
                                { colSpan: 99 },
                                i18n.t("api_preview.auth_specific_fields"),
                            ),
                        ),
                        t.tr(
                            null,
                            t.td(
                                { className: "min-width" },
                                "email ",
                                () => {
                                    if (collection.fields?.find((f) => f.name == "email")?.required) {
                                        return t.em(null, "(" + i18n.t("api_preview.required") + ")");
                                    }
                                    return t.em(null, "(" + i18n.t("api_preview.optional") + ")");
                                },
                            ),
                            t.td(
                                { className: "min-width" },
                                t.span({ className: "label" }, i18n.t("api_preview.string")),
                            ),
                            t.td(null, i18n.t("api_preview.auth_email_desc")),
                        ),
                        t.tr(
                            null,
                            t.td(
                                { className: "min-width" },
                                "emailVisibility ",
                                () => {
                                    if (collection.fields?.find((f) => f.name == "emailVisibility")?.required) {
                                        return t.em(null, "(" + i18n.t("api_preview.required") + ")");
                                    }
                                    return t.em(null, "(" + i18n.t("api_preview.optional") + ")");
                                },
                            ),
                            t.td(
                                { className: "min-width" },
                                t.span({ className: "label" }, i18n.t("api_preview.boolean")),
                            ),
                            t.td(
                                null,
                                i18n.t("api_preview.email_visibility_desc1"),
                                t.br(),
                                i18n.t("api_preview.email_visibility_desc2"),
                            ),
                        ),
                        t.tr(
                            null,
                            t.td(
                                { className: "min-width" },
                                "password ",
                                t.em(null, "(" + i18n.t("api_preview.required") + ")"),
                            ),
                            t.td(
                                { className: "min-width" },
                                t.span({ className: "label" }, i18n.t("api_preview.string")),
                            ),
                            t.td(null, i18n.t("api_preview.auth_password_field_desc")),
                        ),
                        t.tr(
                            null,
                            t.td(
                                { className: "min-width" },
                                "passwordConfirm ",
                                t.em(null, "(" + i18n.t("api_preview.required") + ")"),
                            ),
                            t.td(
                                { className: "min-width" },
                                t.span({ className: "label" }, i18n.t("api_preview.string")),
                            ),
                            t.td(null, i18n.t("api_preview.auth_password_confirm_field_desc")),
                        ),
                        t.tr(
                            null,
                            t.td(
                                { className: "min-width" },
                                "verified ",
                                t.em(null, "(" + i18n.t("api_preview.optional") + ")"),
                            ),
                            t.td(
                                { className: "min-width" },
                                t.span({ className: "label" }, i18n.t("api_preview.string")),
                            ),
                            t.td(
                                null,
                                t.p(null, i18n.t("api_preview.verified_field_desc1")),
                                t.p(
                                    null,
                                    i18n.t("api_preview.verified_field_desc2"),
                                ),
                            ),
                        ),
                        t.tr(
                            null,
                            t.th(
                                { colSpan: 99 },
                                i18n.t("api_preview.other_fields"),
                            ),
                        ),
                    ];
                },
                () => {
                    return tableFields.map((f) => {
                        return t.tr(
                            null,
                            t.td(
                                { className: "min-width" },
                                f.name,
                                t.em(
                                    null,
                                    f.required && !f.autogeneratePattern
                                        ? ` (${i18n.t("api_preview.required")})`
                                        : ` (${i18n.t("api_preview.optional")})`,
                                ),
                            ),
                            t.td(
                                { className: "min-width" },
                                t.span(
                                    { className: "label" },
                                    () => {
                                        const dummyData = app.fieldTypes[f.type]?.dummyData(f, true);
                                        const dummyDataType = typeof dummyData;

                                        if (f.type == "file") return i18n.t("api_preview.file");
                                        if (dummyDataType === "string") return i18n.t("api_preview.string");
                                        if (dummyDataType == "number") return i18n.t("api_preview.number");
                                        if (dummyDataType == "bool") return i18n.t("api_preview.boolean");
                                        if (Array.isArray(dummyData)) return i18n.t("api_preview.array");
                                        if (app.utils.isObject(dummyData)) return i18n.t("api_preview.object");

                                        return i18n.t("api_preview.mixed");
                                    },
                                ),
                            ),
                            t.td(
                                null,
                                t.code(null, f.type),
                                " " + i18n.t("api_preview.field_type_value"),
                                t.br(),
                                t.small(
                                    { className: "txt-hint" },
                                    i18n.t("api_preview.for_more_details_check") + " ",
                                    t.a({
                                        href: import.meta.env.PB_FIELDS_DOCS,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        textContent: i18n.t("api_preview.fields_docs"),
                                    }),
                                    ".",
                                ),
                            ),
                        );
                    });
                },
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

export function replaceDummyPayloadPlaceholder(payloadStr) {
    return payloadStr.replaceAll(`"[[`, "").replaceAll(`]]"`, "");
}

export function fullDummyPayload(collection, forUpdate = false) {
    let payload = app.utils.getDummyFieldsData(collection, true);

    delete payload.id;
    if (collection.type == "auth") {
        if (forUpdate) {
            payload.oldPassword = "987654321";
            delete payload.email;
        }

        payload.password = "123456789";
        payload.passwordConfirm = "123456789";

        delete payload.verified;
    }

    return payload;
}

export function primitivesDummyPayload(collection, forUpdate = false) {
    const payload = fullDummyPayload(collection, forUpdate);

    for (const prop in payload) {
        const type = typeof payload[prop];
        if (
            // placeholder
            payload[prop]?.startsWith?.("[[")
            // not a primitive
            || (!["number", "string", "boolean"].includes(type) && !Array.isArray(payload[prop]))
        ) {
            delete payload[prop];
        }
    }

    return payload;
}
