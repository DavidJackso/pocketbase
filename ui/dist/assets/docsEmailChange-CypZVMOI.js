import{i as e}from"./index-N8C3j6FQ.js";function n(n){let a=app.utils.getApiExampleURL(),o=[{title:()=>e.t(`api_preview.request_email_change`),content:r},{title:()=>e.t(`auth.confirm_email_change`),content:i}],s=store({activeActionIndex:0});return t.div({pbEvent:`apiPreviewEmailChange`,className:`content`},t.p(null,e.t(`api_preview.email_change_desc1`,{name:n.name})),t.p(null,e.t(`api_preview.email_change_desc2`)),app.components.codeBlockTabs({className:`sdk-examples m-t-sm`,historyKey:`pbLastSDK`,tabs:[{title:`JS SDK`,language:`js`,value:`
                        import PocketBase from 'pocketbase';

                        const pb = new PocketBase('${a}');

                        ...

                        await pb.collection('${n.name}').authWithPassword(
                          'test@example.com',
                          '1234567890'
                        );

                        await pb.collection('${n.name}').requestEmailChange('new@example.com');

                        // ---
                        // (optional) in your custom confirmation page:
                        // ---

                        // note: all previous user auth tokens will be invalidated
                        // (and the user will be marked as verified if not already)
                        await pb.collection('${n.name}').confirmEmailChange(
                            'EMAIL_CHANGE_TOKEN',
                            'YOUR_PASSWORD',
                        );
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/js-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.js_sdk_docs`)}))},{title:`Dart SDK`,language:`dart`,value:`
                        import 'package:pocketbase/pocketbase.dart';

                        final pb = PocketBase('${a}');

                        ...

                        await pb.collection('${n.name}').authWithPassword(
                          'test@example.com',
                          '1234567890'
                        );

                        await pb.collection('${n.name}').requestEmailChange('new@example.com');

                        // ---
                        // (optional) in your custom confirmation page:
                        // ---

                        // note: all previous user auth tokens will be invalidated
                        // (and the user will be marked as verified if not already)
                        await pb.collection('${n.name}').confirmEmailChange(
                          'EMAIL_CHANGE_TOKEN',
                          'YOUR_PASSWORD',
                        );
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/dart-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.dart_sdk_docs`)}))},{title:`curl`,language:`bash`,value:`
                        # Request email change
                        curl -X POST \\
                          -H 'Authorization:TOKEN' \\
                          -H 'Content-Type:application/json' \\
                          -d '{ "newEmail":"..." }' \\
                          '${a}/api/collections/${n.name}/request-email-change'

                        # Confirm email change
                        #
                        # note: all previous user auth tokens will be invalidated
                        # (and the user will be marked as verified if not already)
                        curl -X POST \\
                          -H 'Content-Type:application/json' \\
                          -d '{ "token":"...", "password":"" }' \\
                          '${a}/api/collections/${n.name}/confirm-email-change'
                    `}]}),t.nav({className:`btns m-t-base m-b-sm`},()=>o.map((e,n)=>t.button({type:`button`,className:()=>`btn sm expanded ${s.activeActionIndex==n?`active`:`secondary`}`,textContent:()=>e.title(),onclick:()=>s.activeActionIndex=n}))),()=>o[s.activeActionIndex]?.content?.(n))}function r(n){return[t.div({className:`block`},t.strong(null,e.t(`api_preview.api_details`))),t.div({className:`alert success api-preview-alert`},t.span({className:`label method`},`POST`),t.span({className:`path`},`/api/collections/${n.name}/request-email-change`),t.small({className:`extra`},e.t(`api_preview.requires`),t.br(),`Authorization:TOKEN header`)),t.table({className:`api-preview-table body-params`},t.thead(null,t.tr(null,t.th({className:`min-width txt-primary`},e.t(`api_preview.body_params`)),t.th({className:`min-width`},e.t(`api_preview.type`)),t.th(null,e.t(`api_preview.description`)))),t.tbody(null,t.tr(null,t.td({className:`min-width`},`newEmail `,t.em(null,`(`+e.t(`api_preview.required`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,e.t(`api_preview.new_email_send_request_desc`))))),t.div({className:`block m-t-base m-b-sm`},t.strong(null,e.t(`api_preview.example_responses`))),app.components.codeBlockTabs({tabs:[{title:204,value:`null`},{title:400,value:`
                {
                  "status": 400,
                  "message": "An error occurred while validating the submitted data.",
                  "data": {
                    "newEmail": {
                      "code": "validation_required",
                      "message": "Missing required value."
                    }
                  }
                }
            `},{title:401,value:`
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
            `}]})]}function i(n){return[t.div({className:`block`},t.strong(null,e.t(`api_preview.api_details`))),t.div({className:`alert success api-preview-alert`},t.span({className:`label method`},`POST`),t.span({className:`path`},`/api/collections/${n.name}/confirm-email-change`)),t.table({className:`api-preview-table body-params`},t.thead(null,t.tr(null,t.th({className:`min-width txt-primary`},e.t(`api_preview.body_params`)),t.th({className:`min-width`},e.t(`api_preview.type`)),t.th(null,e.t(`api_preview.description`)))),t.tbody(null,t.tr(null,t.td({className:`min-width`},`token `,t.em(null,`(`+e.t(`api_preview.required`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,e.t(`api_preview.token_from_email_change_email`))),t.tr(null,t.td({className:`min-width`},`password `,t.em(null,`(`+e.t(`api_preview.required`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,e.t(`api_preview.account_password_confirm_email_change`))))),t.div({className:`block m-t-base m-b-sm`},t.strong(null,e.t(`api_preview.example_responses`))),app.components.codeBlockTabs({tabs:[{title:204,value:`null`},{title:400,value:`
                {
                  "status": 400,
                  "message": "An error occurred while validating the submitted data.",
                  "data": {
                    "token": {
                      "code": "validation_required",
                      "message": "Missing required value."
                    }
                  }
                }
            `}]})]}export{n as docsEmailChange};