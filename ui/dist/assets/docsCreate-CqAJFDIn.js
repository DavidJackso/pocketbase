import{i as e}from"./index-N8C3j6FQ.js";import{t as n}from"./expandInfo-CuGz608J.js";import{t as r}from"./fieldsInfo-CkTfl2P9.js";import"./filterSyntax-CUI1tXr3.js";function i(i){let c=app.utils.getApiExampleURL(),l=i.createRule===null,u=i.type===`auth`,d=u?[`password`,`verified`,`email`,`emailVisibility`]:[],f=i.fields?.filter(e=>!e.hidden&&e.type!=`autodate`&&!d.includes(e.name))||[],p={collectionId:i.id,collectionName:i.name},m=[{title:200,value:JSON.stringify(Object.assign(p,app.utils.getDummyFieldsData(i)),null,2)},{title:400,value:`
                {
                  "status": 400,
                  "message": "Failed to create record.",
                  "data": {
                    "${u?`email`:f.find(e=>!e.primaryKey)?.name||`someField`}": {
                      "code": "validation_required",
                      "message": "Missing required value."
                    }
                  }
                }
            `}];return l&&m.push({title:403,value:`
                {
                  "status": 403,
                  "message": "Only superusers can perform this action.",
                  "data": {}
                }
            `}),t.div({pbEvent:`apiPreviewCreate`,className:`content`},t.p(null,e.t(`api_preview.create_desc`,{name:i.name})),t.p(null,e.t(`api_preview.body_params_sent_as`)+` `,t.code(null,`application/json`),` `+e.t(`common.or`)+` `,t.code(null,`multipart/form-data`),`.`),t.p(null,e.t(`api_preview.file_upload_supported_via`)+` `,t.code(null,`multipart/form-data`),`. `+e.t(`api_preview.for_more_info_check`)+` `,t.a({href:`https://pocketbase.io/docs/files-handling`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.files_upload_docs`)}),`.`),app.components.codeBlockTabs({className:`sdk-examples m-t-sm`,historyKey:`pbLastSDK`,tabs:[{title:`JS SDK`,language:`js`,value:`
import PocketBase from 'pocketbase';

const pb = new PocketBase('${c}');

...

// example create body
const body = ${a(JSON.stringify(o(i),null,2))};

const record = await pb.collection('${i.name}').create(body);
`+(u?`
// (optional) send an email verification request
await pb.collection('${i?.name}').requestVerification(record.email);
`:``),footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/js-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.js_sdk_docs`)}))},{title:`Dart SDK`,language:`dart`,value:`
import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${c}');

...

// example create body
final body = <String, dynamic>${JSON.stringify(s(i),null,2)};

final record = await pb.collection('${i.name}').create(body: body, files: []);
`+(u?`
// (optional) send an email verification request
await pb.collection('${i?.name}').requestVerification(
    record.get<String>('email'),
);
`:``),footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/dart-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.dart_sdk_docs`)}))},{title:`curl`,language:`bash`,value:`
curl -X POST \\
  -H 'Authorization:TOKEN' \\
  -H 'Content-Type:application/json' \\
  -d '{ ... }' \\
  '${c}/api/collections/${i.name}/records'
`+(u?`
# (optional) send an email verification request
curl -X POST \\
  -H 'Content-Type:application/json' \\
  -d '{ "email":"test@example.com" }' \\
  '${c}/api/collections/${i.name}/request-verification'
`:``)}]}),t.div({className:`block m-t-base`},t.strong(null,e.t(`api_preview.api_details`))),t.div({className:`alert success api-preview-alert`},t.span({className:`label method`},`POST`),t.span({className:`path`},`/api/collections/${i.name}/records`),()=>{if(l)return t.small({className:`extra`},e.t(`api_preview.requires_superuser_auth`))}),t.table({className:`api-preview-table body-params`},t.thead(null,t.tr(null,t.th({className:`min-width txt-primary`},e.t(`api_preview.body_params`)),t.th({className:`min-width`},e.t(`api_preview.type`)),t.th(null,e.t(`api_preview.description`)))),t.tbody(null,()=>{if(u)return[t.tr(null,t.th({colSpan:99},e.t(`api_preview.auth_specific_fields`))),t.tr(null,t.td({className:`min-width`},`email `,()=>i.fields?.find(e=>e.name==`email`)?.required?t.em(null,`(`+e.t(`api_preview.required`)+`)`):t.em(null,`(`+e.t(`api_preview.optional`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,e.t(`api_preview.auth_email_desc`))),t.tr(null,t.td({className:`min-width`},`emailVisibility `,()=>i.fields?.find(e=>e.name==`emailVisibility`)?.required?t.em(null,`(`+e.t(`api_preview.required`)+`)`):t.em(null,`(`+e.t(`api_preview.optional`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.boolean`))),t.td(null,e.t(`api_preview.email_visibility_desc1`),t.br(),e.t(`api_preview.email_visibility_desc2`))),t.tr(null,t.td({className:`min-width`},`password `,t.em(null,`(`+e.t(`api_preview.required`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,e.t(`api_preview.auth_password_field_desc`))),t.tr(null,t.td({className:`min-width`},`passwordConfirm `,t.em(null,`(`+e.t(`api_preview.required`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,e.t(`api_preview.auth_password_confirm_field_desc`))),t.tr(null,t.td({className:`min-width`},`verified `,t.em(null,`(`+e.t(`api_preview.optional`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,t.p(null,e.t(`api_preview.verified_field_desc1`)),t.p(null,e.t(`api_preview.verified_field_desc2`)))),t.tr(null,t.th({colSpan:99},e.t(`api_preview.other_fields`)))]},()=>f.map(n=>t.tr(null,t.td({className:`min-width`},n.name,t.em(null,n.required&&!n.autogeneratePattern?` (${e.t(`api_preview.required`)})`:` (${e.t(`api_preview.optional`)})`)),t.td({className:`min-width`},t.span({className:`label`},()=>{let r=app.fieldTypes[n.type]?.dummyData(n,!0),i=typeof r;return n.type==`file`?e.t(`api_preview.file`):i===`string`?e.t(`api_preview.string`):i==`number`?e.t(`api_preview.number`):i==`bool`?e.t(`api_preview.boolean`):Array.isArray(r)?e.t(`api_preview.array`):app.utils.isObject(r)?e.t(`api_preview.object`):e.t(`api_preview.mixed`)})),t.td(null,t.code(null,n.type),` `+e.t(`api_preview.field_type_value`),t.br(),t.small({className:`txt-hint`},e.t(`api_preview.for_more_details_check`)+` `,t.a({href:`https://pocketbase.io/docs/collections/#fields`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.fields_docs`)}),`.`)))))),t.table({className:`api-preview-table query-params`},t.thead(null,t.tr(null,t.th({className:`min-width txt-primary`},e.t(`api_preview.query_params`)),t.th({className:`min-width`},e.t(`api_preview.type`)),t.th(null,e.t(`api_preview.description`)))),t.tbody(null,t.tr(null,t.td({className:`min-width`},`expand`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,n())),t.tr(null,t.td({className:`min-width`},`fields`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,r())))),t.div({className:`block m-t-base m-b-sm`},t.strong(null,e.t(`api_preview.example_responses`))),app.components.codeBlockTabs({tabs:m}))}function a(e){return e.replaceAll(`"[[`,``).replaceAll(`]]"`,``)}function o(e,n=!1){let r=app.utils.getDummyFieldsData(e,!0);return delete r.id,e.type==`auth`&&(n&&(r.oldPassword=`987654321`,delete r.email),r.password=`123456789`,r.passwordConfirm=`123456789`,delete r.verified),r}function s(e,n=!1){let r=o(e,n);for(let e in r){let n=typeof r[e];(r[e]?.startsWith?.(`[[`)||![`number`,`string`,`boolean`].includes(n)&&!Array.isArray(r[e]))&&delete r[e]}return r}export{i as docsCreate,o as fullDummyPayload,s as primitivesDummyPayload,a as replaceDummyPayloadPlaceholder};