import{i as e}from"./index-D7rXdP5G.js";import{t as n}from"./expandInfo-Cj268jQJ.js";import{t as r}from"./fieldsInfo-B0cvYWwC.js";function i(i){let a=app.utils.getApiExampleURL(),o=i.passwordAuth?.identityFields||[],s=o.length==0?`NONE`:`YOUR_`+o.join(`_OR_`).toUpperCase(),c={collectionId:i.id,collectionName:i.name},l=[{title:200,value:JSON.stringify({token:`...JWT...`,record:Object.assign(c,app.utils.getDummyFieldsData(i))},null,2)},{title:400,value:`
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
            `}];return t.div({pbEvent:`apiPreviewAuthWithPassword`,className:`content`},t.p(null,e.t(`api_preview.auth_password_desc`)+` `,t.strong(null,o.join(`/`)),` `+e.t(`common.and`)+` `,t.strong(null,e.t(`record_upsert.password`).toLowerCase()),`.`),app.components.codeBlockTabs({className:`sdk-examples m-t-sm`,historyKey:`pbLastSDK`,tabs:[{title:`JS SDK`,language:`js`,value:`
                        import PocketBase from 'pocketbase';

                        const pb = new PocketBase('${a}');

                        ...

                        const authData = await pb.collection('${i.name}').authWithPassword(
                          '${s}',
                          'YOUR_PASSWORD',
                        );

                        // after the above you can also access the auth data from the authStore
                        console.log(pb.authStore.isValid);
                        console.log(pb.authStore.token);
                        console.log(pb.authStore.record.id);

                        // "logout"
                        pb.authStore.clear();
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/js-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.js_sdk_docs`)}))},{title:`Dart SDK`,language:`dart`,value:`
                        import 'package:pocketbase/pocketbase.dart';

                        final pb = PocketBase('${a}');

                        ...

                        final authData = await pb.collection('${i.name}').authWithPassword(
                          '${s}',
                          'YOUR_PASSWORD',
                        );

                        // after the above you can also access the auth data from the authStore
                        print(pb.authStore.isValid);
                        print(pb.authStore.token);
                        print(pb.authStore.record.id);

                        // "logout"
                        pb.authStore.clear();
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/dart-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.dart_sdk_docs`)}))},{title:`curl`,language:`bash`,value:`
                        curl -X POST \\
                          -H 'Content-Type:application/json' \\
                          -d '{ "identity":"${s}", "password":"YOUR_PASSWORD" }' \\
                          '${a}/api/collections/${i.name}/auth-with-password'
                    `}]}),t.div({className:`block m-t-base`},t.strong(null,e.t(`api_preview.api_details`))),t.div({className:`alert success api-preview-alert`},t.span({className:`label method`},`POST`),t.span({className:`path`},`/api/collections/${i.name}/auth-with-password`)),t.table({className:`api-preview-table body-params`},t.thead(null,t.tr(null,t.th({className:`min-width txt-primary`},e.t(`api_preview.body_params`)),t.th({className:`min-width`},e.t(`api_preview.type`)),t.th(null,e.t(`api_preview.description`)))),t.tbody(null,t.tr(null,t.td({className:`min-width`},`identity `,t.em(null,`(`+e.t(`api_preview.required`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,app.utils.sentenize(o.join(` ${e.t(`common.or`)} `),!1),` `+e.t(`api_preview.of_record_to_authenticate`))),t.tr(null,t.td({className:`min-width`},`identityField `,t.em(null,`(`+e.t(`api_preview.optional`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,e.t(`api_preview.identity_field_desc1`),t.br(),e.t(`api_preview.identity_field_desc2`))),t.tr(null,t.td({className:`min-width`},`password `,t.em(null,`(`+e.t(`api_preview.required`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,e.t(`api_preview.auth_record_password_desc`))))),t.table({className:`api-preview-table query-params`},t.thead(null,t.tr(null,t.th({className:`min-width txt-primary`},e.t(`api_preview.query_params`)),t.th({className:`min-width`},e.t(`api_preview.type`)),t.th(null,e.t(`api_preview.description`)))),t.tbody(null,t.tr(null,t.td({className:`min-width`},`expand`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,n())),t.tr(null,t.td({className:`min-width`},`fields`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,r())))),t.div({className:`block m-t-base m-b-sm`},t.strong(null,e.t(`api_preview.example_responses`))),app.components.codeBlockTabs({tabs:l}))}export{i as docsAuthWithPassword};