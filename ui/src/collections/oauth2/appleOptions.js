import { i18n } from "../../i18n.js";

window.app = window.app || {};
window.app.oauth2 = window.app.oauth2 || {};

// note: data is the providerSettingsModal form store
window.app.oauth2.apple = function(providerInfo, namePrefix, data) {
    const uniqueId = "apple_" + app.utils.randomString();

    return t.div(
        { pbEvent: "oauth2AppleOptions", className: "oauth2-apple-options" },
        t.button(
            {
                type: "button",
                className: "btn sm secondary",
                onclick: () => {
                    app.modals.openAppleSecretGenerator({
                        ongenerate: (secret) => {
                            data.config.clientSecret = secret;
                        },
                    });
                },
            },
            t.i({ className: "ri-key-line", ariaHidden: true }),
            t.span({ className: "txt" }, i18n.t("oauth2.generate_secret")),
        ),
    );
};

window.app.modals = window.app.modals || {};

window.app.modals.openAppleSecretGenerator = function(modalSettings = {
    onbeforeopen: null,
    onafteropen: null,
    onbeforeclose: null,
    onafterclose: null,
    ongenerate: null, // (secret) => {}
}) {
    const modal = appleSecretGeneratorModal(modalSettings);
    if (!modal) {
        return;
    }

    document.body.appendChild(modal);

    app.modals.open(modal);
};

function appleSecretGeneratorModal(modalSettings = {}) {
    let modal;

    const uniqueId = "secret_generator_" + app.utils.randomString();

    const maxDuration = 15777000; // 6 months

    const data = store({
        clientId: "",
        teamId: "",
        keyId: "",
        privateKey: "",
        duration: maxDuration,
        isSubmitting: false,
    });

    async function submit() {
        data.isSubmitting = true;

        try {
            const result = await app.pb.settings.generateAppleClientSecret(
                data.clientId,
                data.teamId,
                data.keyId,
                data.privateKey.trim(),
                data.duration,
            );

            data.isSubmitting = false;

            app.toasts.success(i18n.t("oauth2.secret_generated"));

            modalSettings.ongenerate?.(result.secret);

            app.modals.close(modal);
        } catch (err) {
            if (!err.isAbort) {
                app.checkApiError(err);
                data.isSubmitting = false;
            }
        }
    }

    modal = t.div(
        {
            pbEvent: "appleSecretGeneratorModal",
            className: "modal popup apple-secret-generator-modal",
            onbeforeopen: (el) => {
                return modalSettings.onbeforeopen?.(el);
            },
            onafteropen: (el) => {
                modalSettings.onafteropen?.(el);
            },
            onbeforeclose: (el) => {
                return modalSettings.onbeforeclose?.(el);
            },
            onafterclose: (el) => {
                modalSettings.onafterclose?.(el);
                el?.remove();
            },
        },
        t.header(
            { className: "modal-header" },
            t.h5({ className: "m-auto" }, i18n.t("oauth2.generate_apple_secret")),
        ),
        t.form(
            {
                id: uniqueId + "_form",
                className: "modal-content",
                onsubmit: (e) => {
                    e.preventDefault();
                    submit();
                },
            },
            t.div(
                { className: "grid" },
                t.div(
                    { className: "col-sm-6" },
                    t.div(
                        { className: "field" },
                        t.label({ htmlFor: uniqueId + ".clientId" }, i18n.t("provider_settings.client_id")),
                        t.input({
                            id: uniqueId + ".clientId",
                            name: "clientId",
                            type: "text",
                            required: true,
                            value: () => data.clientId || "",
                            oninput: (e) => data.clientId = e.target.value,
                        }),
                    ),
                ),
                t.div(
                    { className: "col-sm-6" },
                    t.div(
                        { className: "field" },
                        t.label({ htmlFor: uniqueId + ".teamId" }, i18n.t("oauth2.team_id")),
                        t.input({
                            id: uniqueId + ".teamId",
                            name: "teamId",
                            type: "text",
                            required: true,
                            value: () => data.teamId || "",
                            oninput: (e) => data.teamId = e.target.value,
                        }),
                    ),
                ),
                t.div(
                    { className: "col-sm-6" },
                    t.div(
                        { className: "field" },
                        t.label({ htmlFor: uniqueId + ".keyId" }, i18n.t("oauth2.key_id")),
                        t.input({
                            id: uniqueId + ".keyId",
                            name: "keyId",
                            type: "text",
                            required: true,
                            value: () => data.keyId || "",
                            oninput: (e) => data.keyId = e.target.value,
                        }),
                    ),
                ),
                t.div(
                    { className: "col-sm-6" },
                    t.div(
                        { className: "field" },
                        t.label({ htmlFor: uniqueId + ".duration" }, i18n.t("common.duration_seconds")),
                        t.input({
                            id: uniqueId + ".duration",
                            name: "duration",
                            type: "number",
                            min: 0,
                            step: 1,
                            max: maxDuration,
                            required: true,
                            value: () => data.duration || 0,
                            oninput: (e) => data.duration = parseInt(e.target.value, 10),
                        }),
                    ),
                    t.div(
                        { className: "field-help" },
                        i18n.t("oauth2.max_duration_help", {
                            seconds: maxDuration,
                            months: (maxDuration / (60 * 60 * 24 * 30)) << 0,
                        }),
                    ),
                ),
                t.div(
                    { className: "col-sm-12" },
                    t.div(
                        { className: "field" },
                        t.label({ htmlFor: uniqueId + ".privateKey" }, i18n.t("oauth2.private_key")),
                        t.textarea({
                            id: uniqueId + ".privateKey",
                            name: "privateKey",
                            type: "text",
                            required: true,
                            rows: 8,
                            placeholder: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----",
                            value: () => data.privateKey || "",
                            oninput: (e) => data.privateKey = e.target.value,
                        }),
                    ),
                    t.div(
                        { className: "field-help" },
                        i18n.t("oauth2.private_key_help"),
                    ),
                ),
            ),
        ),
        t.footer(
            { className: "modal-footer" },
            t.button(
                {
                    type: "button",
                    className: "btn transparent m-r-auto",
                    onclick: () => app.modals.close(modal),
                },
                t.span({ className: "txt" }, i18n.t("common.close")),
            ),
            t.button(
                {
                    "html-form": uniqueId + "_form",
                    type: "submit",
                    className: "btn expanded",
                },
                t.i({ className: "ri-key-line", ariaHidden: true }),
                t.span({ className: "txt" }, i18n.t("oauth2.generate_secret")),
            ),
        ),
    );

    return modal;
}
