import { i18n } from "../i18n.js";
import { expandInfo } from "./expandInfo";
import { fieldsInfo } from "./fieldsInfo";

export function docsAuthWithPassword(collection) {
    const baseURL = app.utils.getApiExampleURL();

    const identityFields = collection.passwordAuth?.identityFields || [];

    const exampleIdentityLabel = identityFields.length == 0
        ? "NONE"
        : "YOUR_" + identityFields.join("_OR_").toUpperCase();

    const baseDummyRecord = {
        collectionId: collection.id,
        collectionName: collection.name,
    };

    const responses = [
        {
            title: 200,
            value: JSON.stringify(
                {
                    token: "...JWT...",
                    record: Object.assign(baseDummyRecord, app.utils.getDummyFieldsData(collection)),
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
                  "message": "Failed to authenticate.",
                  "data": {
                    "identity": {
                      "code": "validation_required",
                      "message": "Missing required value."
                    }
                  }
                }
            `,
        },
    ];

    return t.div(
        {
            pbEvent: "apiPreviewAuthWithPassword",
            className: "content",
        },
        // description
        t.p(
            null,
            i18n.t("api_preview.auth_password_desc") + " ",
            t.strong(null, identityFields.join("/")),
            " " + i18n.t("common.and") + " ",
            t.strong(null, i18n.t("record_upsert.password").toLowerCase()),
            ".",
        ),
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

                        const authData = await pb.collection('${collection.name}').authWithPassword(
                          '${exampleIdentityLabel}',
                          'YOUR_PASSWORD',
                        );

                        // after the above you can also access the auth data from the authStore
                        console.log(pb.authStore.isValid);
                        console.log(pb.authStore.token);
                        console.log(pb.authStore.record.id);

                        // "logout"
                        pb.authStore.clear();
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

                        final authData = await pb.collection('${collection.name}').authWithPassword(
                          '${exampleIdentityLabel}',
                          'YOUR_PASSWORD',
                        );

                        // after the above you can also access the auth data from the authStore
                        print(pb.authStore.isValid);
                        print(pb.authStore.token);
                        print(pb.authStore.record.id);

                        // "logout"
                        pb.authStore.clear();
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
                        curl -X POST \\
                          -H 'Content-Type:application/json' \\
                          -d '{ "identity":"${exampleIdentityLabel}", "password":"YOUR_PASSWORD" }' \\
                          '${baseURL}/api/collections/${collection.name}/auth-with-password'
                    `,
                },
            ],
        }),
        // api
        t.div({ className: "block m-t-base" }, t.strong(null, i18n.t("api_preview.api_details"))),
        t.div(
            { className: "alert success api-preview-alert" },
            t.span({ className: "label method" }, "POST"),
            t.span({ className: "path" }, `/api/collections/${collection.name}/auth-with-password`),
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
                t.tr(
                    null,
                    t.td(
                        { className: "min-width" },
                        "identity ",
                        t.em(null, "(" + i18n.t("api_preview.required") + ")"),
                    ),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.string"))),
                    t.td(
                        null,
                        app.utils.sentenize(identityFields.join(` ${i18n.t("common.or")} `), false),
                        " " + i18n.t("api_preview.of_record_to_authenticate"),
                    ),
                ),
                t.tr(
                    null,
                    t.td(
                        { className: "min-width" },
                        "identityField ",
                        t.em(null, "(" + i18n.t("api_preview.optional") + ")"),
                    ),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.string"))),
                    t.td(
                        null,
                        i18n.t("api_preview.identity_field_desc1"),
                        t.br(),
                        i18n.t("api_preview.identity_field_desc2"),
                    ),
                ),
                t.tr(
                    null,
                    t.td(
                        { className: "min-width" },
                        "password ",
                        t.em(null, "(" + i18n.t("api_preview.required") + ")"),
                    ),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.string"))),
                    t.td(null, i18n.t("api_preview.auth_record_password_desc")),
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
