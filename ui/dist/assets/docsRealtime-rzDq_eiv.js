import{i as e}from"./index-D7rXdP5G.js";function n(n){let r=app.utils.getApiExampleURL(),i=Object.assign({collectionId:n.id,collectionName:n.name},app.utils.getDummyFieldsData(n));return t.div({pbEvent:`apiPreviewRealtime`,className:`content`},t.p(null,e.t(`api_preview.realtime_desc1`)),t.p(null,e.t(`api_preview.realtime_desc2`)+` `,t.strong(null,e.t(`api_preview.tab_create`).toLowerCase()),`, `,t.strong(null,e.t(`api_preview.tab_update`).toLowerCase()),` `+e.t(`common.and`)+` `,t.strong(null,e.t(`api_preview.tab_delete`).toLowerCase()),` `+e.t(`api_preview.realtime_desc3`)),t.div({className:`alert info`},t.p({className:`txt-bold`},e.t(`api_preview.realtime_alert_intro`)),t.p(null,e.t(`api_preview.realtime_single_record_pre`)+` `,t.strong(null,e.t(`api_preview.realtime_single_record`)),`, `+e.t(`api_preview.realtime_view_rule_pre`)+` `,t.strong(null,e.t(`api_preview.realtime_view_rule`)),` `+e.t(`api_preview.realtime_rule_will_be_used`)),t.p(null,e.t(`api_preview.realtime_entire_collection_pre`)+` `,t.strong(null,e.t(`api_preview.realtime_entire_collection`)),`, `+e.t(`api_preview.realtime_view_rule_pre`)+` `,t.strong(null,e.t(`api_preview.realtime_list_search_rule`)),` `+e.t(`api_preview.realtime_rule_will_be_used`))),app.components.codeBlockTabs({className:`sdk-examples m-t-sm`,historyKey:`pbLastSDK`,tabs:[{title:`JS SDK`,language:`js`,value:`
                        import PocketBase from 'pocketbase';

                        const pb = new PocketBase('${r}');

                        ...

                        // (optionally) authenticate
                        await pb.collection('users').authWithPassword('test@example.com', '123456');

                        // subscribe to changes in any ${n.name} record
                        pb.collection('${n.name}').subscribe('*', function (e) {
                            console.log(e.action);
                            console.log(e.record);
                        }, { /* other options like: filter, expand, custom headers, etc. */ });

                        // subscribe to changes only in the specified record
                        pb.collection('${n.name}').subscribe('RECORD_ID', function (e) {
                            console.log(e.action);
                            console.log(e.record);
                        }, { /* other options like: filter, expand, custom headers, etc. */ });

                        ...

                        // unsubscribe - remove all 'RECORD_ID' subscriptions
                        pb.collection('${n.name}').unsubscribe('RECORD_ID');

                        // unsubscribe - remove all '*' topic subscriptions
                        pb.collection('${n.name}').unsubscribe('*');

                        // unsubscribe - remove all collection subscriptions
                        pb.collection('${n.name}').unsubscribe();
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/js-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.js_sdk_docs`)}))},{title:`Dart SDK`,language:`dart`,value:`
                        import 'package:pocketbase/pocketbase.dart';

                        final pb = PocketBase('${r}');

                        ...

                        // (optionally) authenticate
                        await pb.collection('users').authWithPassword('test@example.com', '123456');

                        // subscribe to changes in any ${n.name} record
                        pb.collection('${n.name}').subscribe('*', (e) {
                            print(e.action);
                            print(e.record);
                        }, /* other options like: filter, expand, custom headers, etc. */);

                        // subscribe to changes only in the specified record
                        pb.collection('${n.name}').subscribe('RECORD_ID', (e) {
                            print(e.action);
                            print(e.record);
                        }, /* other options like: filter, expand, custom headers, etc. */);

                        ...

                        // unsubscribe - remove all 'RECORD_ID' subscriptions
                        pb.collection('${n.name}').unsubscribe('RECORD_ID');

                        // unsubscribe - remove all '*' topic subscriptions
                        pb.collection('${n.name}').unsubscribe('*');

                        // unsubscribe - remove all collection subscriptions
                        pb.collection('${n.name}').unsubscribe();
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/dart-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.dart_sdk_docs`)}))},{title:`curl`,language:`bash`,value:`
                        # init an SSE connection and start listening for messages
                        # (the first message is always PB_CONNECT with the connection "clientId")
                        curl -N '${r}/api/realtime'

                        # open a new terminal and submit the subscription topic(s)
                        # with the "clientId" from the initial PB_CONNECT message
                        curl -X POST \\
                          -H 'Authorization:TOKEN' \\
                          -H 'Content-Type:application/json' \\
                          -d '{ "clientId": "YOUR_CLIENT_ID", "subscriptions": ["${n.name}/*"] }' \\
                          '${r}/api/realtime'

                        # create/update/delete a record in the ${n.name} collection and
                        # you should see the event message(s) in the first terminal
                        # (as long as your client satisfies the topic API rule)
                    `}]}),t.div({className:`block m-t-base`},t.strong(null,e.t(`api_preview.api_details`))),t.div({className:`alert api-preview-alert`},t.span({className:`label method`},`GET/POST`),t.span({className:`path`},`/api/realtime`),t.div({className:`extra`},t.a({href:`https://pocketbase.io/docs/api-realtime/`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.realtime_docs`)}))),t.div({className:`block m-t-base m-b-sm`},t.strong(null,e.t(`api_preview.event_data_format`))),app.components.codeBlock({value:JSON.stringify({action:`create`,record:i},null,2).replace(`"action": "create",`,`"action": "create", // create, update or delete`)}))}export{n as docsRealtime};