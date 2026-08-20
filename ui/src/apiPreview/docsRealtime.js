import { i18n } from "../i18n.js";

export function docsRealtime(collection) {
    const baseURL = app.utils.getApiExampleURL();

    const dummyRecord = Object.assign({
        collectionId: collection.id,
        collectionName: collection.name,
    }, app.utils.getDummyFieldsData(collection));

    return t.div(
        { pbEvent: "apiPreviewRealtime", className: "content" },
        // description
        t.p(null, i18n.t("api_preview.realtime_desc1")),
        t.p(
            null,
            i18n.t("api_preview.realtime_desc2") + " ",
            t.strong(null, i18n.t("api_preview.tab_create").toLowerCase()),
            ", ",
            t.strong(null, i18n.t("api_preview.tab_update").toLowerCase()),
            " " + i18n.t("common.and") + " ",
            t.strong(null, i18n.t("api_preview.tab_delete").toLowerCase()),
            " " + i18n.t("api_preview.realtime_desc3"),
        ),
        t.div(
            { className: "alert info" },
            t.p({ className: "txt-bold" }, i18n.t("api_preview.realtime_alert_intro")),
            t.p(
                null,
                i18n.t("api_preview.realtime_single_record_pre") + " ",
                t.strong(null, i18n.t("api_preview.realtime_single_record")),
                ", " + i18n.t("api_preview.realtime_view_rule_pre") + " ",
                t.strong(null, i18n.t("api_preview.realtime_view_rule")),
                " " + i18n.t("api_preview.realtime_rule_will_be_used"),
            ),
            t.p(
                null,
                i18n.t("api_preview.realtime_entire_collection_pre") + " ",
                t.strong(null, i18n.t("api_preview.realtime_entire_collection")),
                ", " + i18n.t("api_preview.realtime_view_rule_pre") + " ",
                t.strong(null, i18n.t("api_preview.realtime_list_search_rule")),
                " " + i18n.t("api_preview.realtime_rule_will_be_used"),
            ),
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

                        // (optionally) authenticate
                        await pb.collection('users').authWithPassword('test@example.com', '123456');

                        // subscribe to changes in any ${collection.name} record
                        pb.collection('${collection.name}').subscribe('*', function (e) {
                            console.log(e.action);
                            console.log(e.record);
                        }, { /* other options like: filter, expand, custom headers, etc. */ });

                        // subscribe to changes only in the specified record
                        pb.collection('${collection.name}').subscribe('RECORD_ID', function (e) {
                            console.log(e.action);
                            console.log(e.record);
                        }, { /* other options like: filter, expand, custom headers, etc. */ });

                        ...

                        // unsubscribe - remove all 'RECORD_ID' subscriptions
                        pb.collection('${collection.name}').unsubscribe('RECORD_ID');

                        // unsubscribe - remove all '*' topic subscriptions
                        pb.collection('${collection.name}').unsubscribe('*');

                        // unsubscribe - remove all collection subscriptions
                        pb.collection('${collection.name}').unsubscribe();
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

                        // (optionally) authenticate
                        await pb.collection('users').authWithPassword('test@example.com', '123456');

                        // subscribe to changes in any ${collection.name} record
                        pb.collection('${collection.name}').subscribe('*', (e) {
                            print(e.action);
                            print(e.record);
                        }, /* other options like: filter, expand, custom headers, etc. */);

                        // subscribe to changes only in the specified record
                        pb.collection('${collection.name}').subscribe('RECORD_ID', (e) {
                            print(e.action);
                            print(e.record);
                        }, /* other options like: filter, expand, custom headers, etc. */);

                        ...

                        // unsubscribe - remove all 'RECORD_ID' subscriptions
                        pb.collection('${collection.name}').unsubscribe('RECORD_ID');

                        // unsubscribe - remove all '*' topic subscriptions
                        pb.collection('${collection.name}').unsubscribe('*');

                        // unsubscribe - remove all collection subscriptions
                        pb.collection('${collection.name}').unsubscribe();
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
                        # init an SSE connection and start listening for messages
                        # (the first message is always PB_CONNECT with the connection "clientId")
                        curl -N '${baseURL}/api/realtime'

                        # open a new terminal and submit the subscription topic(s)
                        # with the "clientId" from the initial PB_CONNECT message
                        curl -X POST \\
                          -H 'Authorization:TOKEN' \\
                          -H 'Content-Type:application/json' \\
                          -d '{ "clientId": "YOUR_CLIENT_ID", "subscriptions": ["${collection.name}/*"] }' \\
                          '${baseURL}/api/realtime'

                        # create/update/delete a record in the ${collection.name} collection and
                        # you should see the event message(s) in the first terminal
                        # (as long as your client satisfies the topic API rule)
                    `,
                },
            ],
        }),
        // api
        t.div({ className: "block m-t-base" }, t.strong(null, i18n.t("api_preview.api_details"))),
        t.div(
            { className: "alert api-preview-alert" },
            t.span({ className: "label method" }, "GET/POST"),
            t.span({ className: "path" }, "/api/realtime"),
            t.div(
                { className: "extra" },
                t.a({
                    href: import.meta.env.PB_REALTIME_DOCS,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    textContent: i18n.t("api_preview.realtime_docs"),
                }),
            ),
        ),
        t.div({ className: "block m-t-base m-b-sm" }, t.strong(null, i18n.t("api_preview.event_data_format"))),
        app.components.codeBlock({
            value: JSON.stringify(
                {
                    "action": "create",
                    "record": dummyRecord,
                },
                null,
                2,
            ).replace(`"action": "create",`, "\"action\": \"create\", // create, update or delete"),
        }),
    );
}
