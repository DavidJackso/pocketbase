import { i18n } from "../i18n.js";
import { fieldsInfo } from "./fieldsInfo";

export function docsListAuthMethods(collection) {
    const baseURL = app.utils.getApiExampleURL();

    const data = store({
        isLoading: false,
        authMethods: [],
        get responses() {
            return [
                {
                    title: 200,
                    value: data.isLoading ? "..." : JSON.stringify(data.authMethods, null, 2),
                },
                {
                    title: 404,
                    value: `
                        {
                          "status": 404,
                          "message": "Missing collection context.",
                          "data": {}
                        }
                    `,
                },
            ];
        },
    });

    async function listAuthMethods() {
        data.isLoading = true;

        try {
            data.authMethods = await app.pb.collection(collection.name).listAuthMethods();
            data.isLoading = false;
        } catch (err) {
            if (!err?.isAbort) {
                app.checkApiError(err);
                data.isLoading = false;
            }
        }
    }

    return t.div(
        {
            pbEvent: "apiPreviewListAuthMethods",
            className: "content",
            onmount: () => {
                listAuthMethods();
            },
        },
        // description
        t.p(null, i18n.t("api_preview.list_auth_methods_desc", { name: collection.name })),
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

                        const result = await pb.collection('${collection.name}').listAuthMethods();
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

                        final result = await pb.collection('${collection.name}').listAuthMethods();
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
                        curl '${baseURL}/api/collections/${collection.name}/auth-methods'
                    `,
                },
            ],
        }),
        // api
        t.div({ className: "block m-t-base" }, t.strong(null, i18n.t("api_preview.api_details"))),
        t.div(
            { className: "alert info api-preview-alert" },
            t.span({ className: "label method" }, "GET"),
            t.span({ className: "path" }, `/api/collections/${collection.name}/auth-methods`),
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
                    t.td({ className: "min-width" }, "fields"),
                    t.td({ className: "min-width" }, t.span({ className: "label" }, i18n.t("api_preview.string"))),
                    t.td(null, fieldsInfo()),
                ),
            ),
        ),
        // responses
        t.div({ className: "block m-t-base m-b-sm" }, t.strong(null, i18n.t("api_preview.example_responses"))),
        app.components.codeBlockTabs({
            tabs: () => data.responses,
        }),
    );
}
