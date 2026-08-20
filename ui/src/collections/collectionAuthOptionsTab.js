import { emailTemplateAccordion } from "./emailTemplateAccordion";
import { mfaAccordion } from "./mfaAccordion";
import { oauth2Accordion } from "./oauth2Accordion";
import { otpAccordion } from "./otpAccordion";
import { passwordAuthAccordion } from "./passwordAuthAccordion";
import { tokenOptionsAccordion } from "./tokenOptionsAccordion";
import { i18n } from "../i18n.js";

export function collectionAuthOptionsTab(upsertData) {
    const uniqueId = "options_" + app.utils.randomString();

    return t.div(
        { className: "collection-tab-content collection-options-tab-content" },
        t.div(
            { className: "grid" },
            t.div(
                { className: "col-12" },
                t.div(
                    { className: "section-heading" },
                    t.strong(null, i18n.t("collection_auth.auth_methods")),
                    t.div({ className: "flex-fill" }),
                    t.div(
                        { className: "field" },
                        t.input({
                            id: uniqueId + ".authAlert",
                            name: "authAlert.enabled",
                            type: "checkbox",
                            className: "switch sm",
                            checked: () => !!upsertData.collection.authAlert?.enabled,
                            onchange: (e) => {
                                upsertData.collection.authAlert = upsertData.collection.authAlert || {};
                                upsertData.collection.authAlert.enabled = e.target.checked;
                            },
                        }),
                        t.label({ htmlFor: uniqueId + ".authAlert" }, i18n.t("collection_auth.send_alert_new_logins")),
                    ),
                ),
                passwordAuthAccordion(upsertData.collection),
                () => {
                    if (upsertData.originalCollection?.name == "_superusers") {
                        return;
                    }

                    return oauth2Accordion(upsertData.collection);
                },
                otpAccordion(upsertData.collection),
                mfaAccordion(upsertData.collection),
            ),
            t.div(
                { className: "col-12" },
                t.div(
                    { className: "section-heading" },
                    t.strong(null, i18n.t("collection_auth.mail_templates")),
                    t.button({
                        tabIndex: -1,
                        type: "buttton",
                        className: "m-l-auto label handle txt-bold",
                        textContent: i18n.t("collection_auth.send_test_email"),
                        onclick: () => app.modals.openMailTest(upsertData.collection?.name),
                    }),
                ),
                emailTemplateAccordion(upsertData.collection, "verificationTemplate", {
                    title: i18n.t("collection_auth.verification_template"),
                    placeholders: ["{APP_NAME}", "{APP_URL}", "{RECORD:*}", "{TOKEN}"],
                }),
                emailTemplateAccordion(upsertData.collection, "resetPasswordTemplate", {
                    title: i18n.t("collection_auth.password_reset_template"),
                    placeholders: ["{APP_NAME}", "{APP_URL}", "{RECORD:*}", "{TOKEN}"],
                }),
                emailTemplateAccordion(upsertData.collection, "confirmEmailChangeTemplate", {
                    title: i18n.t("collection_auth.confirm_email_change_template"),
                    placeholders: ["{APP_NAME}", "{APP_URL}", "{RECORD:*}", "{TOKEN}"],
                }),
                emailTemplateAccordion(upsertData.collection, "otp.emailTemplate", {
                    title: i18n.t("collection_auth.otp_template"),
                    placeholders: ["{APP_NAME}", "{APP_URL}", "{RECORD:*}", "{OTP}", "{OTP_ID}"],
                }),
                emailTemplateAccordion(upsertData.collection, "authAlert.emailTemplate", {
                    title: i18n.t("collection_auth.login_alert_template"),
                    placeholders: ["{APP_NAME}", "{APP_URL}", "{RECORD:*}", "{ALERT_INFO}"],
                }),
            ),
            t.div(
                { className: "col-12" },
                t.div({ className: "section-heading" }, t.strong(null, i18n.t("collection_auth.other"))),
                tokenOptionsAccordion(upsertData.collection),
            ),
        ),
    );
}
