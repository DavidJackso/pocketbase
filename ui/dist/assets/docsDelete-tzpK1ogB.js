import{i as e}from"./index-C66B-mZu.js";function n(n){let r=app.utils.getApiExampleURL(),i=n.deleteRule===null,a=[{title:204,value:`null`},{title:400,value:`
                {
                  "status": 400,
                  "message": "Failed to delete record. Make sure that the record is not part of a required relation reference.",
                  "data": {}
                }
            `}];return i&&a.push({title:403,value:`
                {
                  "status": 403,
                  "message": "Only superusers can access this action.",
                  "data": {}
                }
            `}),a.push({title:404,value:`
            {
              "status": 404,
              "message": "The requested resource wasn't found.",
              "data": {}
            }
        `}),t.div({pbEvent:`apiPreviewDelete`,className:`content`},t.p(null,e.t(`api_preview.delete_single_record`,{name:n.name})),app.components.codeBlockTabs({className:`sdk-examples m-t-sm`,historyKey:`pbLastSDK`,tabs:[{title:`JS SDK`,language:`js`,value:`
                        import PocketBase from 'pocketbase';

                        const pb = new PocketBase('${r}');

                        ...

                        await pb.collection('${n.name}').delete('RECORD_ID');
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/js-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.js_sdk_docs`)}))},{title:`Dart SDK`,language:`dart`,value:`
                        import 'package:pocketbase/pocketbase.dart';

                        final pb = PocketBase('${r}');

                        ...

                        await pb.collection('${n.name}').delete('RECORD_ID');
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/dart-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.dart_sdk_docs`)}))},{title:`curl`,language:`bash`,value:`
                        curl -X DELETE \\
                          -H 'Authorization:TOKEN' \\
                          '${r}/api/collections/${n.name}/records/RECORD_ID'
                    `}]}),t.div({className:`block m-t-base`},t.strong(null,e.t(`api_preview.api_details`))),t.div({className:`alert danger api-preview-alert`},t.span({className:`label method`},`DELETE`),t.span({className:`path`},`/api/collections/${n.name}/records/`,t.strong(null,`:id`)),()=>{if(i)return t.small({className:`extra`},e.t(`api_preview.requires_superuser_auth`))}),t.table({className:`api-preview-table path-params`},t.thead(null,t.tr(null,t.th({className:`min-width txt-primary`},e.t(`api_preview.path_params`)),t.th({className:`min-width`},e.t(`api_preview.type`)),t.th(null,e.t(`api_preview.description`)))),t.tbody(null,t.tr(null,t.td({className:`min-width`},`id`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,e.t(`api_preview.id_of_record_to_delete`))))),t.div({className:`block m-t-base m-b-sm`},t.strong(null,e.t(`api_preview.example_responses`))),app.components.codeBlockTabs({tabs:a}))}export{n as docsDelete};