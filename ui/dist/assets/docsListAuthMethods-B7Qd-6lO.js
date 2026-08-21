import{i as e}from"./index-C66B-mZu.js";import{t as n}from"./fieldsInfo-Bb3XRIh7.js";function r(r){let i=app.utils.getApiExampleURL(),a=store({isLoading:!1,authMethods:[],get responses(){return[{title:200,value:a.isLoading?`...`:JSON.stringify(a.authMethods,null,2)},{title:404,value:`
                        {
                          "status": 404,
                          "message": "Missing collection context.",
                          "data": {}
                        }
                    `}]}});async function o(){a.isLoading=!0;try{a.authMethods=await app.pb.collection(r.name).listAuthMethods(),a.isLoading=!1}catch(e){e?.isAbort||(app.checkApiError(e),a.isLoading=!1)}}return t.div({pbEvent:`apiPreviewListAuthMethods`,className:`content`,onmount:()=>{o()}},t.p(null,e.t(`api_preview.list_auth_methods_desc`,{name:r.name})),app.components.codeBlockTabs({className:`sdk-examples m-t-sm`,historyKey:`pbLastSDK`,tabs:[{title:`JS SDK`,language:`js`,value:`
                        import PocketBase from 'pocketbase';

                        const pb = new PocketBase('${i}');

                        ...

                        const result = await pb.collection('${r.name}').listAuthMethods();
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/js-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.js_sdk_docs`)}))},{title:`Dart SDK`,language:`dart`,value:`
                        import 'package:pocketbase/pocketbase.dart';

                        final pb = PocketBase('${i}');

                        ...

                        final result = await pb.collection('${r.name}').listAuthMethods();
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/dart-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.dart_sdk_docs`)}))},{title:`curl`,language:`bash`,value:`
                        curl '${i}/api/collections/${r.name}/auth-methods'
                    `}]}),t.div({className:`block m-t-base`},t.strong(null,e.t(`api_preview.api_details`))),t.div({className:`alert info api-preview-alert`},t.span({className:`label method`},`GET`),t.span({className:`path`},`/api/collections/${r.name}/auth-methods`)),t.table({className:`api-preview-table query-params`},t.thead(null,t.tr(null,t.th({className:`min-width txt-primary`},e.t(`api_preview.query_params`)),t.th({className:`min-width`},e.t(`api_preview.type`)),t.th(null,e.t(`api_preview.description`)))),t.tbody(null,t.tr(null,t.td({className:`min-width`},`fields`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,n())))),t.div({className:`block m-t-base m-b-sm`},t.strong(null,e.t(`api_preview.example_responses`))),app.components.codeBlockTabs({tabs:()=>a.responses}))}export{r as docsListAuthMethods};