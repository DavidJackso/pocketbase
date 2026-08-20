import{i as e}from"./index-N8C3j6FQ.js";import{t as n}from"./expandInfo-CuGz608J.js";import{t as r}from"./fieldsInfo-CkTfl2P9.js";import{t as i}from"./filterSyntax-CUI1tXr3.js";function a(a){let o=app.utils.getApiExampleURL(),s=a.listRule===null,c={collectionId:a.id,collectionName:a.name},l=[{title:200,value:JSON.stringify({page:1,perPage:30,totalPages:1,totalItems:2,items:[Object.assign(c,app.utils.getDummyFieldsData(a)),Object.assign(c,app.utils.getDummyFieldsData(a))]},null,2)},{title:400,value:`
                {
                  "status": 400,
                  "message": "Something went wrong while processing your request.",
                  "data": {}
                }
            `}];return s&&l.push({title:403,value:`
                {
                  "status": 403,
                  "message": "Only superusers can access this action.",
                  "data": {}
                }
            `}),t.div({pbEvent:`apiPreviewList`,className:`content`},t.p(null,e.t(`api_preview.fetch_paginated_records_list`,{name:a.name})),app.components.codeBlockTabs({className:`sdk-examples m-t-sm`,historyKey:`pbLastSDK`,tabs:[{title:`JS SDK`,language:`js`,value:`
                        import PocketBase from 'pocketbase';

                        const pb = new PocketBase('${o}');

                        ...

                        // fetch a paginated records list
                        const resultList = await pb.collection('${a.name}').getList(1, 50, {
                          filter: 'someField1 != someField2',
                        });

                        // you can also fetch all records at once via getFullList
                        const records = await pb.collection('${a.name}').getFullList({
                          sort: '-someField',
                        });

                        // or fetch only the first record that matches the specified filter
                        const record = await pb.collection('${a.name}').getFirstListItem(
                          'someField="test"',
                          { expand: 'relField1,relField2.subRelField' },
                        );
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/js-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.js_sdk_docs`)}))},{title:`Dart SDK`,language:`dart`,value:`
                        import 'package:pocketbase/pocketbase.dart';

                        final pb = PocketBase('${o}');

                        ...

                        // fetch a paginated records list
                        final resultList = await pb.collection('${a.name}').getList(
                          page: 1,
                          perPage: 50,
                          filter: 'someField1 != someField2',
                        );

                        // you can also fetch all records at once via getFullList
                        final records = await pb.collection('${a.name}').getFullList(
                          sort: '-someField',
                        );

                        // or fetch only the first record that matches the specified filter
                        final record = await pb.collection('${a.name}').getFirstListItem(
                          'someField="test"',
                          expand: 'relField1,relField2.subRelField',
                        );
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/dart-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.dart_sdk_docs`)}))},{title:`curl`,language:`bash`,value:`
                        curl \\
                          -H 'Authorization:TOKEN' \\
                          '${o}/api/collections/${a.name}/records?perPage=50'
                    `}]}),t.div({className:`block m-t-base`},t.strong(null,e.t(`api_preview.api_details`))),t.div({className:`alert info api-preview-alert`},t.span({className:`label method`},`GET`),t.span({className:`path`},`/api/collections/${a.name}/records`),()=>{if(s)return t.small({className:`extra`},e.t(`api_preview.requires_superuser_auth`))}),t.table({className:`api-preview-table query-params`},t.thead(null,t.tr(null,t.th({className:`min-width txt-primary`},e.t(`api_preview.query_params`)),t.th({className:`min-width`},e.t(`api_preview.type`)),t.th(null,e.t(`api_preview.description`)))),t.tbody(null,t.tr(null,t.td({className:`min-width`},`page`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.number`))),t.td(null,e.t(`api_preview.page_param_desc`))),t.tr(null,t.td({className:`min-width`},`perPage`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.number`))),t.td(null,e.t(`api_preview.per_page_param_desc`))),t.tr(null,t.td({className:`min-width`},`sort`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,t.p(null,e.t(`api_preview.sort_param_desc1`),t.br(),e.t(`api_preview.sort_param_desc2`)),t.p(null,e.t(`api_preview.for_example`)+`:`,app.components.codeBlock({value:`// DESC by created and ASC by id
?sort=-created,id`})),t.p(null,e.t(`api_preview.sort_param_desc3`)+` `,t.code(null,`@random`),` `,t.code({hidden:()=>a.type==`view`},`@rowid`),`.`))),t.tr(null,t.td({className:`min-width`},`filter`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,t.p(null,e.t(`api_preview.filter_param_desc`)),app.components.codeBlock({value:`?filter=(id='abc' && created>'2022-01-01')`,footnote:e.t(`api_preview.url_encoded_footnote`)}),i())),t.tr(null,t.td({className:`min-width`},`expand`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,n())),t.tr(null,t.td({className:`min-width`},`fields`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,r())),t.tr(null,t.td({className:`min-width`},`skipTotal`),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.boolean`))),t.td(null,t.p(null,e.t(`api_preview.skip_total_desc1_pre`)+` `,t.code(null,`1/true`),` `+e.t(`api_preview.skip_total_desc1_mid`)+` `,t.code(null,`totalItems`),` `+e.t(`common.and`)+` `,t.code(null,`totalPages`),` `+e.t(`api_preview.skip_total_desc1_post`)),t.p(null,e.t(`api_preview.skip_total_desc2`),` `+e.t(`api_preview.skip_total_desc2b`)+` `,t.code(null,`getFirstListItem()`),` `+e.t(`common.and`)+` `,t.code(null,`getFullList()`),` `+e.t(`api_preview.skip_total_desc2c`)))))),t.div({className:`block m-t-base m-b-sm`},t.strong(null,e.t(`api_preview.example_responses`))),app.components.codeBlockTabs({tabs:l}))}export{a as docsList};