import{i as e}from"./index-D7rXdP5G.js";import{t as n}from"./expandInfo-Cj268jQJ.js";import{t as r}from"./fieldsInfo-B0cvYWwC.js";function i(i){let a=app.utils.getApiExampleURL(),o={collectionId:i.id,collectionName:i.name},s=[{title:200,value:JSON.stringify({token:`...JWT...`,record:Object.assign(o,app.utils.getDummyFieldsData(i))},null,2)},{title:401,value:`
                {
                  "status": 401,
                  "message": "The request requires valid record authorization token to be set.",
                  "data": {}
                }
            `},{title:403,value:`
                {
                  "status": 403,
                  "message": "The authorized record model is not allowed to perform this action.",
                  "data": {}
                }
            `},{title:404,value:`
                {
                  "status": 404,
                  "message": "Missing auth record context.",
                  "data": {}
                }
            `}];return t.div({pbEvent:`apiPreviewAuthRefresh`,className:`content`},t.p(null,e.t(`api_preview.auth_refresh_desc1`)),t.p(null,e.t(`api_preview.auth_refresh_desc2`)+` `,t.code(null,`pb.authStore`),` `+e.t(`api_preview.auth_refresh_desc3`)),app.components.codeBlockTabs({className:`sdk-examples m-t-sm`,historyKey:`pbLastSDK`,tabs:[{title:`JS SDK`,language:`js`,value:`
                        import PocketBase from 'pocketbase';

                        const pb = new PocketBase('${a}');

                        ...

                        const authData = await pb.collection('${i.name}').authRefresh();

                        // after the above you can also access the refreshed auth data from the authStore
                        console.log(pb.authStore.isValid);
                        console.log(pb.authStore.token);
                        console.log(pb.authStore.record.id);
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/js-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.js_sdk_docs`)}))},{title:`Dart SDK`,language:`dart`,value:`
                        import 'package:pocketbase/pocketbase.dart';

                        final pb = PocketBase('${a}');

                        ...

                        final authData = await pb.collection('${i.name}').authRefresh();

                        // after the above you can also access the refreshed auth data from the authStore
                        print(pb.authStore.isValid);
                        print(pb.authStore.token);
                        print(pb.authStore.record.id);
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/dart-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.dart_sdk_docs`)}))},{title:`curl`,language:`bash`,value:`
                        curl -X POST \\
                          -H 'Authorization:TOKEN' \\
                          '${a}/api/collections/${i.name}/auth-refresh'
                    `}]}),t.div({className:`m-t-base`},t.strong(null,e.t(`api_preview.api_details`))),t.div({className:`alert success api-preview-alert`},t.span({className:`label method`},`POST`),t.span({className:`path`},`/api/collections/${i.name}/auth-refresh`),t.small({className:`extra`},e.t(`api_preview.requires`),t.br(),`Authorization:TOKEN header`)),t.table({className:`api-preview-table query-params`},t.thead(null,t.tr(null,t.th({className:`min-width txt-primary`},e.t(`api_preview.query_params`)),t.th({className:`min-width`},e.t(`api_preview.type`)),t.th(null,e.t(`api_preview.description`)))),t.tbody(null,t.tr(null,t.td({className:`min-width`},`expand`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,n())),t.tr(null,t.td({className:`min-width`},`fields`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,r())))),t.div({className:`m-t-base m-b-sm`},t.strong(null,e.t(`api_preview.example_responses`))),app.components.codeBlockTabs({tabs:s}))}export{i as docsAuthRefresh};