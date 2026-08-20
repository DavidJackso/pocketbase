import{i as e}from"./index-N8C3j6FQ.js";function n(n){let a=app.utils.getApiExampleURL(),o=[{title:()=>e.t(`api_preview.request_password_reset`),content:r},{title:()=>e.t(`api_preview.confirm_password_reset_title`),content:i}],s=store({activeActionIndex:0});return t.div({pbEvent:`apiPreviewPasswordReset`,className:`content`},t.p(null,e.t(`api_preview.password_reset_desc1`,{name:n.name})),t.p(null,e.t(`api_preview.password_reset_desc2`)),app.components.codeBlockTabs({className:`sdk-examples m-t-sm`,historyKey:`pbLastSDK`,tabs:[{title:`JS SDK`,language:`js`,value:`
                        import PocketBase from 'pocketbase';

                        const pb = new PocketBase('${a}');

                        ...

                        await pb.collection('${n.name}').requestPasswordReset('test@example.com');

                        // ---
                        // (optional) in your custom confirmation page:
                        // ---

                        // note: all previous user auth tokens will be invalidated
                        // (and the user will be marked as verified if not already)
                        await pb.collection('${n.name}').confirmPasswordReset(
                            'RESET_TOKEN',
                            'NEW_PASSWORD',
                            'NEW_PASSWORD_CONFIRM',
                        );
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/js-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.js_sdk_docs`)}))},{title:`Dart SDK`,language:`dart`,value:`
                        import 'package:pocketbase/pocketbase.dart';

                        final pb = PocketBase('${a}');

                        ...

                        await pb.collection('${n.name}').requestPasswordReset('test@example.com');

                        // ---
                        // (optional) in your custom confirmation page:
                        // ---

                        // note: all previous user auth tokens will be invalidated
                        // (and the user will be marked as verified if not already)
                        await pb.collection('${n.name}').confirmPasswordReset(
                          'RESET_TOKEN',
                          'NEW_PASSWORD',
                          'NEW_PASSWORD_CONFIRM',
                        );
                    `,footnote:t.div({className:`txt-right`},t.a({href:`https://github.com/pocketbase/dart-sdk`,target:`_blank`,rel:`noopener noreferrer`,textContent:e.t(`api_preview.dart_sdk_docs`)}))},{title:`curl`,language:`bash`,value:`
                        # Request password reset
                        curl -X POST \\
                          -H 'Content-Type:application/json' \\
                          -d '{ "email":"..." }' \\
                          '${a}/api/collections/${n.name}/request-password-reset'

                        # Confirm password reset
                        #
                        # note: all previous user auth tokens will be invalidated
                        # (and the user will be marked as verified if not already)
                        curl -X POST \\
                          -H 'Content-Type:application/json' \\
                          -d '{ "token":"...", "password":"", "passwordConfirm":"" }' \\
                          '${a}/api/collections/${n.name}/confirm-password-reset'
                    `}]}),t.nav({className:`btns m-t-base m-b-sm`},()=>o.map((e,n)=>t.button({type:`button`,className:()=>`btn sm expanded ${s.activeActionIndex==n?`active`:`secondary`}`,textContent:()=>e.title(),onclick:()=>s.activeActionIndex=n}))),()=>o[s.activeActionIndex]?.content?.(n))}function r(n){return[t.div({className:`block`},t.strong(null,e.t(`api_preview.api_details`))),t.div({className:`alert success api-preview-alert`},t.span({className:`label method`},`POST`),t.span({className:`path`},`/api/collections/${n.name}/request-password-reset`)),t.table({className:`api-preview-table body-params`},t.thead(null,t.tr(null,t.th({className:`min-width txt-primary`},e.t(`api_preview.body_params`)),t.th({className:`min-width`},e.t(`api_preview.type`)),t.th(null,e.t(`api_preview.description`)))),t.tbody(null,t.tr(null,t.td({className:`min-width`},`email `,t.em(null,`(`+e.t(`api_preview.required`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,e.t(`api_preview.email_send_password_reset_desc`))))),t.div({className:`block m-t-base m-b-sm`},t.strong(null,e.t(`api_preview.example_responses`))),app.components.codeBlockTabs({tabs:[{title:204,value:`null`},{title:400,value:`
                {
                  "status": 400,
                  "message": "An error occurred while validating the submitted data.",
                  "data": {
                    "email": {
                      "code": "validation_required",
                      "message": "Missing required value."
                    }
                  }
                }
            `}]})]}function i(n){return[t.div({className:`block`},t.strong(null,e.t(`api_preview.api_details`))),t.div({className:`alert success api-preview-alert`},t.span({className:`label method`},`POST`),t.span({className:`path`},`/api/collections/${n.name}/confirm-password-reset`)),t.table({className:`api-preview-table body-params`},t.thead(null,t.tr(null,t.th({className:`min-width txt-primary`},e.t(`api_preview.body_params`)),t.th({className:`min-width`},e.t(`api_preview.type`)),t.th(null,e.t(`api_preview.description`)))),t.tbody(null,t.tr(null,t.td({className:`min-width`},`token `,t.em(null,`(`+e.t(`api_preview.required`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,e.t(`api_preview.token_from_password_reset_email`))),t.tr(null,t.td({className:`min-width`},`password `,t.em(null,`(`+e.t(`api_preview.required`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,e.t(`api_preview.new_password_to_set`))),t.tr(null,t.td({className:`min-width`},`passwordConfirm `,t.em(null,`(`+e.t(`api_preview.required`)+`)`)),t.td({className:`min-width`},t.span({className:`label`},e.t(`api_preview.string`))),t.td(null,e.t(`api_preview.confirmation_of_new_password`))))),t.div({className:`block m-t-base m-b-sm`},t.strong(null,e.t(`api_preview.example_responses`))),app.components.codeBlockTabs({tabs:[{title:204,value:`null`},{title:400,value:`
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
            `}]})]}export{n as docsPasswordReset};