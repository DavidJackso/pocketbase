import{i as e}from"./index-N8C3j6FQ.js";import{t as n}from"./expandInfo-CuGz608J.js";import{t as r}from"./fieldsInfo-CkTfl2P9.js";import{fullDummyPayload as i,primitivesDummyPayload as a,replaceDummyPayloadPlaceholder as o}from"./docsCreate-CqAJFDIn.js";function s(s){let c=app.utils.getApiExampleURL(),l=s.updateRule===null,u=s.type===`auth`?[`id`,`password`,`verified`,`email`,`emailVisibility`]:[`id`],d=s.fields?.filter(e=>!e.hidden&&e.type!=`autodate`&&!u.includes(e.name))||[],f={collectionId:s.id,collectionName:s.name},p=[{title:200,value:JSON.stringify(Object.assign(f,app.utils.getDummyFieldsData(s)),null,2)},{title:400,value:`
                {
                  "status": 400,
                  "message": "Failed to create record.",
                  "data": {
                    "${d.find(e=>!e.primaryKey)?.name||`someField`}": {
                      "code": "validation_required",
                      "message": "Missing required value."
                    }
                  }
                }
            `}];return l&&p.push({title:403,value:`
                {
                  "status": 403,
                  "message": "Only superusers can perform this action.",
                  "data": {}
                }
            `}),p.push({title:404,value:`
            {
              "status": 404,
              "message": "The requested resource wasn't found.",
              "data": {}
            }
        `}),t.div({pbEvent:`apiPreviewUpdate`,className:`content`},t.p(null,e.t(`api_preview.update_desc`,{name:s.name})),t.p(null,e.t(`api_preview.body_params_sent_as`)+` `,t.code(null,`application/json`),` `+e.t(`common.or`)+` `,t.code(null,`multipart/form-data`),`.`),t.p(null,e.t(`api_preview.file_upload_supported_via`)+` `,t.code(null,`multipart/form-data`),`. `+e.t(`api_preview.for_more_info_check`)+` `,t.a({href:`https://pocketbase.io/docs/files-handling`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.files_upload_docs`)}),`.`),t.p(null,t.em(null,e.t(`api_preview.password_change_note`))),app.components.codeBlockTabs({className:`sdk-examples m-t-sm`,historyKey:`pbLastSDK`,tabs:[{title:`JS SDK`,language:`js`,value:`
import PocketBase from 'pocketbase';

const pb = new PocketBase('${c}');

...

// example update body
const body = ${o(JSON.stringify(i(s,!0),null,2))};

const record = await pb.collection('${s.name}').update('RECORD_ID', body);
`,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/js-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.js_sdk_docs`)}))},{title:`Dart SDK`,language:`dart`,value:`
import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${c}');

...

// example update body
final body = <String, dynamic>${JSON.stringify(a(s,!0),null,2)};

final record = await pb.collection('${s.name}').update(
  'RECORD_ID',
  body: body,
  files: [],
);
`,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/dart-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.dart_sdk_docs`)}))},{title:`curl`,language:`bash`,value:`
                        curl -X PATCH \\
                          -H 'Authorization:TOKEN' \\
                          -H 'Content-Type:application/json' \\
                          -d '{ ... }' \\
                          '${c}/api/collections/${s.name}/records/RECORD_ID'
                    `}]}),t.div({className:`block m-t-base`},t.strong(null,e.t(`api_preview.api_details`))),t.div({className:`alert warning api-preview-alert`},t.span({className:`label method`},`PATCH`),t.span({className:`path`},`/api/collections/${s.name}/records/`,t.strong(null,`:id`)),()=>{if(l)return t.small({className:`extra`},e.t(`api_preview.requires_superuser_auth`))}),t.table({className:`api-preview-table path-params`},t.thead(null,t.tr(null,t.th({className:`min-width txt-primary`},e.t(`api_preview.path_params`)),t.th({className:`min-width`},e.t(`api_preview.type`)),t.th(null,e.t(`api_preview.description`)))),t.tbody(null,t.tr(null,t.td({className:`min-width`},`id`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,e.t(`api_preview.id_of_record_to_update`))))),t.table({className:`api-preview-table query-params`},t.thead(null,t.tr(null,t.th({className:`min-width txt-primary`},e.t(`api_preview.query_params`)),t.th({className:`min-width`},e.t(`api_preview.type`)),t.th(null,e.t(`api_preview.description`)))),t.tbody(null,t.tr(null,t.td({className:`min-width`},`expand`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,n())),t.tr(null,t.td({className:`min-width`},`fields`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,r())))),t.div({className:`block m-t-base m-b-sm`},t.strong(null,e.t(`api_preview.example_responses`))),app.components.codeBlockTabs({tabs:p}))}export{s as docsUpdate};