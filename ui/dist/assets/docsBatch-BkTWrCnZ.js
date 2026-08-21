import{i as e}from"./index-D7rXdP5G.js";function n(n){let r=app.utils.getApiExampleURL(),i={collectionId:n.id,collectionName:n.name},a=[{title:200,value:JSON.stringify([{status:200,body:Object.assign(i,app.utils.getDummyFieldsData(n))},{status:200,body:Object.assign(i,app.utils.getDummyFieldsData(n))}],null,2)},{title:400,value:`
                {
                  "status": 400,
                  "message": "Batch transaction failed.",
                  "data": {
                    "requests": {
                      "1": {
                        "code": "batch_request_failed",
                        "message": "Batch request failed.",
                        "response": {
                          "status": 400,
                          "message": "Failed to create record.",
                          "data": {
                            "id": {
                              "code": "validation_min_text_constraint",
                              "message": "Must be at least 3 character(s).",
                              "params": { "min": 3 }
                            }
                          }
                        }
                      }
                    }
                  }
                }
            `},{title:403,value:`
                {
                  "status": 403,
                  "message": "Batch requests are not allowed.",
                  "data": {}
                }
            `}];return t.div({pbEvent:`apiPreviewBatch`,className:`content`},t.p(null,e.t(`api_preview.batch_desc`)),t.div({className:`alert warning`},t.p({className:`txt-bold`},e.t(`api_preview.batch_warning1`)+` `,t.a({href:`#/settings`,target:`_blank`,title:e.t(`api_preview.open_in_new_tab`),textContent:e.t(`api_preview.app_settings`)}),`.`),t.p(null,e.t(`api_preview.batch_warning2`))),app.components.codeBlockTabs({className:`sdk-examples m-t-sm`,historyKey:`pbLastSDK`,tabs:[{title:`JS SDK`,language:`js`,value:`
                        import PocketBase from 'pocketbase';

                        const pb = new PocketBase('${r}');

                        ...

                        const batch = pb.createBatch();

                        batch.collection('${n.name}').create({ ... });
                        batch.collection('${n.name}').update('RECORD_ID', { ... });
                        batch.collection('${n.name}').delete('RECORD_ID');
                        batch.collection('${n.name}').upsert({ ... });

                        const result = await batch.send();
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/js-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.js_sdk_docs`)}))},{title:`Dart SDK`,language:`dart`,value:`
                        import 'package:pocketbase/pocketbase.dart';

                        final pb = PocketBase('${r}');

                        ...

                        final batch = pb.createBatch();

                        batch.collection('${n.name}').create(body: { ... });
                        batch.collection('${n.name}').update('RECORD_ID', body: { ... });
                        batch.collection('${n.name}').delete('RECORD_ID');
                        batch.collection('${n.name}').upsert(body: { ... });

                        final result = await batch.send();
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/dart-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.dart_sdk_docs`)}))},{title:`curl`,language:`bash`,value:`
                        curl -X POST \\
                          -H 'Authorization:TOKEN' \\
                          -H 'Content-Type:application/json' \\
                          -d '{ "requests": [...] }' \\
                          '${r}/api/batch'
                    `}]}),t.div({className:`block m-t-sm`},t.strong(null,e.t(`api_preview.api_details`))),t.div({className:`alert success api-preview-alert`},t.span({className:`label method`},`POST`),t.span({className:`path`},`/api/batch`)),t.p(null,e.t(`api_preview.batch_request_accepts`)+` `,t.code(null,`requests: Array<Request>`),` `+e.t(`api_preview.batch_request_param_desc`)),t.p(null,e.t(`api_preview.batch_sdk_transparent`)),t.p(null,e.t(`api_preview.batch_supported_actions_intro`)),t.ul(null,t.li(null,`record create - `,t.code(null,`POST /api/collections/{collection}/records`)),t.li(null,`record update - `,t.code(null,`PATCH /api/collections/{collection}/records`)),t.li(null,`record upsert - `,t.code(null,`PUT /api/collections/{collection}/records`),t.br(),t.small({className:`txt-hint`},`(the body must have an "id" field)`)),t.li(null,`record delete - `,t.code(null,`DELETE /api/collections/{collection}/records/{id}`))),t.p(null,`Each batch `,t.em(null,`Request`),` element has the following properties:`),t.ul(null,t.li(null,t.code(null,`url`),t.em(null,` (could include query parameters)`)),t.li(null,t.code(null,`method`),t.em(null,` (GET, POST, PUT, PATCH, DELETE)`)),t.li(null,t.code(null,`headers`),t.br(),t.em(null,`(custom per-request Authorization header is not supported at the moment, aka. all batch requests have the same auth state)`)),t.li(null,t.code(null,`body`),t.br(),`When the batch request is send as `,t.code(null,`multipart/form-data`),`, the regular batch action fields are expected to be submitted as serialized json under the `,t.code(null,`@jsonPayload`),` field and file keys need to follow the pattern `,t.code(null,`requests.N.fileField`),` or `,t.code(null,`requests[N].fileField`),`.`,t.br(),`Again this is handled transparently by the official SDKs, but for example if you prefer to manually construct a JS `,t.code(null,`FormData`),` body, then it could look something like:`,app.components.codeBlock({className:`m-t-10`,value:`
                        const batchBody = new FormData();

                        batchBody.append("@jsonPayload", JSON.stringify({
                          requests: [
                            // create
                            {
                              url: "/api/collections/users/records?expand=someRelField",
                              method: "POST",
                              body: { someField: "test1" }
                            },
                            // update
                            {
                              url: "/api/collections/users/records/RECORD_ID",
                              method: "PATCH",
                              body: { someField: "test2" }
                            }
                          ]
                        }))

                        // bind file to the first request
                        batchBody.append("requests.0.someFileField", new File(...))

                        // bind file to the second request
                        batchBody.append("requests.1.someFileField", new File(...))
                    `}))),t.div({className:`block m-t-base m-b-sm`},t.strong(null,e.t(`api_preview.example_responses`))),app.components.codeBlockTabs({tabs:a}))}export{n as docsBatch};