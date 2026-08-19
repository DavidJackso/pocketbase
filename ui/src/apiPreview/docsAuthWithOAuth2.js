import { expandInfo } from "./expandInfo";
import { fieldsInfo } from "./fieldsInfo";
import { i18n } from "../i18n.js";

export function docsAuthWithOAuth2(collection) {
    const baseURL = app.utils.getApiExampleURL();

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
                    meta: {
                        "id": "abc123",
                        "name": "John Doe",
                        "username": "john.doe",
                        "email": "test@example.com",
                        "avatarURL": "https://example.com/avatar.png",
                        "accessToken": "...",
                        "refreshToken": "...",
                        "expiry": "2022-01-01 10:00:00.123Z",
                        "isNew": false,
                        "rawUser": {},
                    },
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
                  "message": "An error occurred while submitting the form.",
                  "data": {
                    "provider": {
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
            pbEvent: "apiPreviewAuthWithOAuth2",
            className: "content",
        },
        // description
        t.p(null, i18n.t("api_preview.oauth2_desc1")),
        t.p(
            null,
            i18n.t("api_preview.oauth2_desc2") + " ",
            t.a({
                href: import.meta.env.PB_OAUTH2_DOCS,
                target: "_blank",
                rel: "noopener noreferrer",
                textContent: i18n.t("api_preview.oauth2_integration_docs"),
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
                    value: `
                        import PocketBase from 'pocketbase';

                        const pb = new PocketBase('${baseURL}');

                        ...

                        // OAuth2 authentication with a single realtime call.
                        //
                        // Make sure to register ${baseURL}/api/oauth2-redirect
                        // as redirect url in the OAuth2 app configuration.
                        const authData = await pb.collection('${collection.name}').authWithOAuth2({ provider: 'google' });

                        // OR authenticate with manual OAuth2 code exchange
                        // const authData = await pb.collection('${collection.name}').authWithOAuth2Code(...);

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
                        import 'package:url_launcher/url_launcher.dart';

                        final pb = PocketBase('${baseURL}');

                        ...

                        // OAuth2 authentication with a single realtime call.
                        //
                        // Make sure to register ${baseURL}/api/oauth2-redirect
                        // as redirect url in the OAuth2 app configuration.
                        final authData = await pb.collection('${collection.name}').authWithOAuth2('google', (url) async {
                          await launchUrl(url);
                        });

                        // OR authenticate with manual OAuth2 code exchange
                        // final authData = await pb.collection('${collection.name}').authWithOAuth2Code(...);

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
                        # authenticate with manual OAuth2 code exchange
                        curl -X POST \\
                          -H 'Content-Type:application/json' \\
                          -d '{ "provider":"google", "code":"OAUTH2_CODE", "codeVerifier":"...", "redirectURL":"..." }' \\
                          '${baseURL}/api/collections/${collection.name}/auth-with-oauth2'
                    `,
                },
            ],
        }),
        // api
        t.div({ className: "m-t-base" }, t.strong(null, i18n.t("api_preview.api_details"))),
        t.div(
            { className: "alert success api-preview-alert" },
            t.span({ className: "label method" }, "POST"),
            t.span({ className: "path" }, `/api/collections/${collection.name}/auth-with-oauth2`),
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
                    t.td({ className: "min-width" }, "provider ", t.em(null, "(" + i18n.t("api_preview.required") + ")")),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.string"))),
                    t.td(null, i18n.t("api_preview.oauth2_provider_name_desc")),
                ),
                t.tr(
                    null,
                    t.td({ className: "min-width" }, "code ", t.em(null, "(" + i18n.t("api_preview.required") + ")")),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.string"))),
                    t.td(null, i18n.t("api_preview.oauth2_code_desc")),
                ),
                t.tr(
                    null,
                    t.td({ className: "min-width" }, "codeVerifier ", t.em(null, "(" + i18n.t("api_preview.required") + ")")),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.string"))),
                    t.td(null, i18n.t("api_preview.oauth2_code_verifier_desc")),
                ),
                t.tr(
                    null,
                    t.td({ className: "min-width" }, "redirectURL ", t.em(null, "(" + i18n.t("api_preview.required") + ")")),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.string"))),
                    t.td(null, i18n.t("api_preview.oauth2_redirect_url_desc")),
                ),
                t.tr(
                    null,
                    t.td({ className: "min-width" }, "createData ", t.em(null, "(" + i18n.t("api_preview.optional") + ")")),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.string"))),
                    t.td(
                        null,
                        t.p(null, i18n.t("api_preview.oauth2_create_data_desc1")),
                        t.p(
                            null,
                            i18n.t("api_preview.oauth2_create_data_desc2"),
                        ),
                        t.p(
                            null,
                            i18n.t("api_preview.oauth2_create_data_desc3"),
                        ),
                    ),
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
        t.div({ className: "m-t-base m-b-sm" }, t.strong(null, i18n.t("api_preview.example_responses"))),
        app.components.codeBlockTabs({
            tabs: responses,
        }),
    );
}
